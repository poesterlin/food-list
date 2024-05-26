import { desc, eq, sql } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { foodsTable, ingredientsTable } from "$lib/db";

export const load: PageServerLoad = async ({ locals }) => {
    const db = locals.db;

    const favorites = await db
        .select({
            count: sql`count(*)`,
            name: foodsTable.name
        })
        .from(ingredientsTable)
        .fullJoin(foodsTable, eq(ingredientsTable.food_id, foodsTable.id))
        .groupBy(foodsTable.id)
        .orderBy(desc(sql`count`));

    return { favorites };
};