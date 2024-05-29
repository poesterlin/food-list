import { foodsTable, ingredientsTable, recipesTable } from "$lib/db";
import { desc, eq, sql } from "drizzle-orm";
import type { Actions, PageServerLoad } from "./$types";
import { z } from "zod";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
    const db = locals.db;

    const categories = await db
        .select({
            name: foodsTable.category,
            list: sql<typeof foodsTable.$inferSelect[]>`json_agg(foods order by ${foodsTable.name})`.as('list')
        })
        .from(foodsTable)
        .groupBy(foodsTable.category)
        .orderBy(foodsTable.category);

    const favorites = await db
        .select({
            count: sql`count(*)`,
            id: foodsTable.id,
            name: foodsTable.name,
        })
        .from(ingredientsTable)
        .rightJoin(foodsTable, eq(ingredientsTable.food_id, foodsTable.id))
        .groupBy(foodsTable.id)
        .orderBy(desc(sql`count`))
        .limit(8);

    return { categories, favorites };
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const form = await request.formData();
        const result = z.string().trim().min(1).safeParse(form.get('name'));

        if (!result.success) {
            error(400, 'Invalid name');
        }

        const name = result.data;

        const recipe_id = await locals.db.transaction(async (db) => {
            const [recipe] = await locals.db.insert(recipesTable).values({ name }).returning();
            const recipe_id = recipe.id;

            const entries = Array.from(form.entries());

            const foodIndices: number[] = entries
                .filter(([key, value]) => key.startsWith('food_') && value === 'on')
                .map(([key]) => parseInt(key.replace('food_', '')));

            const uniqueIngredients = new Set(foodIndices);
            const ingredients = Array.from(uniqueIngredients.values()).map(food_id => ({ food_id, recipe_id }));

            if (ingredients.length === 0) {
                error(400, 'No ingredients selected');
            }

            await db.insert(ingredientsTable).values(ingredients).execute();
            return recipe_id;
        });

        redirect(303, `/recipes/${recipe_id}`);
    }
};