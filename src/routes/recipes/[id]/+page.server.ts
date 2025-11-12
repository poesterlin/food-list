import { foodsTable, ingredientsTable, recipesTable } from "$lib/db";
import { error, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { z } from "zod";
import type { Actions, PageServerLoad } from "./$types";
import { deleteImage, uploadImage } from '$lib/s3';

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

    const allIngredients = await db
        .select()
        .from(foodsTable)
        .orderBy(foodsTable.name);

    return { recipe, ingredients, allIngredients };
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
            await db.insert(ingredientsTable).values(newIngredients);
        });
    },

    delete: async ({ params, locals }) => {
        const id = z.coerce.number().parse(params.id);

        const db = locals.db;
        await db.transaction(async (db) => {
            await db.delete(ingredientsTable).where(eq(ingredientsTable.recipe_id, id));
            await db.delete(recipesTable).where(eq(recipesTable.id, id));
        });

    },
    add: async ({ params, locals, request }) => {
        const id = z.coerce.number().parse(params.id);
        const form = await request.formData();

        const db = locals.db;
        const foodId = z.coerce.number().parse(form.get('food_id'));

        await db.insert(ingredientsTable).values({ recipe_id: id, food_id: foodId });
        redirect(303, `/recipes/${id}`);
    },
    uploadImage: async ({ params, locals, request }) => {
        const id = z.coerce.number().parse(params.id);
        const form = await request.formData();
        const img = form.get('image');

        if (!img || !(img instanceof File)) {
            error(400, "Bad request");
        }

        const db = locals.db;
        await db.transaction(async (trx) => {
            const imgId = await uploadImage(img);
            await trx.update(recipesTable).set({ imgId }).where(eq(recipesTable.id, id));
        })
    },
    deleteImage: async ({ params, locals }) => {
        const id = z.coerce.number().parse(params.id);

        const db = locals.db;
        const [recipe] = await db.select().from(recipesTable).where(eq(recipesTable.id, id)).limit(1);

        if (!recipe) {
            error(404, 'Recipe not found');
        }

        if (!recipe.imgId) {
            error(400, 'No image to delete');
        }

        await deleteImage(recipe.imgId);
        await db.update(recipesTable).set({ imgId: null }).where(eq(recipesTable.id, id));
    },
};

