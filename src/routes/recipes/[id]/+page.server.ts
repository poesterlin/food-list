import { foodsTable, ingredientsTable, recipesTable } from "$lib/db";
import { error, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { z } from "zod";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params }) => {
    const id = z.coerce.number().parse(params.id);

    const db = locals.db;

    const [recipe] = await db
        .select()
        .from(recipesTable)
        .where(eq(recipesTable.id, id))
        .limit(1);

    if (!recipe) {
        error(404, 'Recipe not found');
    }

    const ingredients = await db
        .select({
            name: foodsTable.name,
        })
        .from(ingredientsTable)
        .where(eq(ingredientsTable.recipe_id, id))
        .leftJoin(foodsTable, eq(ingredientsTable.food_id, foodsTable.id))
        .orderBy(foodsTable.name);

    return { recipe, ingredients };
};

export const actions: Actions = {
    duplicate: async ({ params, locals }) => {
        // duplicate recipe
        const id = z.coerce.number().parse(params.id);

        const db = locals.db;

        const [recipe] = await db
            .select()
            .from(recipesTable)
            .where(eq(recipesTable.id, id))
            .limit(1);

        if (!recipe) {
            error(404, 'Recipe not found');
        }

        await db.transaction(async (db) => {
            const [newRecipe] = await db.insert(recipesTable).values({ name: recipe.name }).returning();
            const newRecipeId = newRecipe.id;

            const ingredients = await db
                .select()
                .from(ingredientsTable)
                .where(eq(ingredientsTable.recipe_id, id));

            const newIngredients = ingredients.map(i => ({ recipe_id: newRecipeId, food_id: i.food_id }));
            await db.insert(ingredientsTable).values(newIngredients).execute();
        });

        redirect(303, `/recipes/${id}`);
    },

    delete: async ({ params, locals }) => {
        const id = z.coerce.number().parse(params.id);

        const db = locals.db;

        await db.transaction(async (db) => {
            await db.delete(ingredientsTable).where(eq(ingredientsTable.recipe_id, id)).execute();
            await db.delete(recipesTable).where(eq(recipesTable.id, id)).execute();
        });

        redirect(303, '/recipes');
    }
};

