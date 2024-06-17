import { iconsTable, insightsTable, type Icon } from "$lib/db";
import { desc, eq, sql } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { fail, type Actions } from "@sveltejs/kit";
import { z } from "zod";

export const load: PageServerLoad = async ({ locals }) => {
    const db = locals.db;
    const entries = await db
        .select()
        .from(insightsTable)
        .orderBy(desc(insightsTable.date))

    const icons = await db
        .select({
            category: iconsTable.category,
            list: sql<Icon[]>`json_agg(icons order by ${iconsTable.name})`.as('list')
        })
        .from(iconsTable)
        .groupBy(iconsTable.category);

    return { entries, icons };
};

export const actions: Actions = {
    create: async ({ request, locals }) => {
        const form = await request.formData();
        const parsedDate = z.coerce.date().default(new Date()).safeParse(form.get('date'));

        const entries = Array.from(form.entries());

        const iconsIds: number[] = entries
            .filter(([key, value]) => key.startsWith('icon_') && value === 'on')
            .map(([key]) => parseInt(key.replace('icon_', '')));

        const uniqueIcons = Array.from(new Set(iconsIds).values());

        if (!parsedDate.success) {
            return fail(400, { error: 'Invalid date', date: '', uniqueIcons });
        }
        const date = parsedDate.data;

        const [entry] = await locals.db
            .select()
            .from(insightsTable)
            .where(eq(insightsTable.date, date.toISOString()));

        if (entry) {
            const uniqueIcons = Array.from(new Set([...entry.symptoms, ...iconsIds]).values());
            await locals.db
                .update(insightsTable)
                .set({ symptoms: uniqueIcons })
                .where(eq(insightsTable.date, date.toISOString()));
            return;
        }

        await locals.db
            .insert(insightsTable)
            .values({
                date: date.toISOString(),
                symptoms: uniqueIcons,
            })
    },

    del: async ({ request, locals }) => {
        const form = await request.formData();
        const id = z.coerce.number().parse(form.get('id'));

        await locals.db
            .delete(insightsTable)
            .where(eq(insightsTable.id, id));
    }
};