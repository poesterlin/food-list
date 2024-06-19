import { iconsTable, insightsTable, type Icon } from "$lib/db";
import { mod } from '$lib/math';
import { fail, type Actions } from "@sveltejs/kit";
import { isToday } from 'date-fns';
import { desc, eq, sql } from "drizzle-orm";
import { z } from "zod";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
    const { month, year } = z.object({
        month: z.coerce.number().int().min(1).max(12),
        year: z.coerce.number().int().min(2020)
    }).parse(params);

    const db = locals.db;
    const icons = await db
        .select({
            category: iconsTable.category,
            list: sql<Icon[]>`json_agg(icons order by ${iconsTable.name} desc)`.as('list')
        })
        .from(iconsTable)
        .groupBy(iconsTable.category);

    const entries = await db
        .select()
        .from(insightsTable)
        .orderBy(desc(insightsTable.date))

    const map = new Map(entries.map((e) => [new Date(e.date).toDateString(), e]));
    const nrDays = new Date(year, month, 0).getDate();
    const days = new Array(nrDays)
        .fill(undefined)
        .map((_, day) => new Date(year, month - 1, day + 1))
        .map((d, i) => {
            const key = d.toDateString();
            const result = map.get(key);
            return {
                date: i + 1,
                symptoms: result?.symptoms ?? [],
                id: result?.id,
                today: isToday(d) ? true : undefined
            };
        });

    const firstDay = new Date(year, month - 1, 1).getDay();

    return {
        icons,
        days,
        offset: mod(firstDay - 1, 7)
    };
};

export const actions: Actions = {
    create: async ({ request, locals }) => {
        const form = await request.formData();
        const parsedDate = z.coerce.date().default(new Date()).safeParse(form.get('date'));

        const entries = Array.from(form.entries());

        const iconsIds: number[] = entries
            .filter(([key, value]) => key.startsWith('icon_') && value === 'on')
            .map(([key]) => parseInt(key.replace('icon_', '')));

        if (!parsedDate.success) {
            return fail(400, { error: 'Invalid date', date: '', iconsIds });
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
                symptoms: iconsIds
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