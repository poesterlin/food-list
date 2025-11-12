import { desc, eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { foodsTable, ingredientsTable } from '$lib/db';
import { db } from '$lib/db-instance';

export const load: PageServerLoad = async () => {
	const favorites = await db
		.select({
			count: sql`count(*) - 1`.as(`count`),
			name: foodsTable.name
		})
		.from(ingredientsTable)
		.rightJoin(foodsTable, eq(ingredientsTable.food_id, foodsTable.id))
		.groupBy(foodsTable.id)
		.orderBy(desc(sql`count`), foodsTable.name);

	return { favorites };
};
