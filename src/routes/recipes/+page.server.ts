import { foodsTable, ingredientsTable, recipesTable } from "$lib/db";
import { eq, sql } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const db = locals.db;

    const recipes = await db
        .select({
            id: recipesTable.id,
            name: recipesTable.name,
            date: recipesTable.date,
            ingredients: sql<{ id: number, name: string }[]>`json_agg(json_build_object('id', ${ingredientsTable.food_id}, 'name', ${foodsTable.name}))`.as('ingredients')
        })
        .from(ingredientsTable)
        .fullJoin(recipesTable, eq(ingredientsTable.recipe_id, recipesTable.id))
        .fullJoin(foodsTable, eq(ingredientsTable.food_id, foodsTable.id))
        .groupBy(recipesTable.id, recipesTable.name)
        .orderBy(recipesTable.date);

    return {
        recipes: recipes.filter(r => r.name && r.ingredients.filter(i => i.name).length > 0)
    };
};


