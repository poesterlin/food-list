import { foodsTable } from "$lib/db";
import { z } from "zod";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const db = locals.db;

    const categories = await db
        .select({
            category: foodsTable.category,
        })
        .from(foodsTable)
        .groupBy(foodsTable.category)

    return { categories };
};

export const actions: Actions = {
    add: async ({ locals, request }) => {
        const form = await request.formData();
        const category = z.string().parse(form.get('category'));
        const name = z.string().parse(form.get('name'));
        const allowed = z.string().transform(value => value !== 'on').parse(form.get('allowed') ?? 'off');

        const db = locals.db;
        await db.insert(foodsTable).values({ category, name, allowed });
    }
};