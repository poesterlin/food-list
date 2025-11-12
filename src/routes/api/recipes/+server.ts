import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { z } from 'zod';
import { foodsTable, ingredientsTable, recipesTable } from '$lib/db';
import { desc, eq, sql } from 'drizzle-orm';

export const GET: RequestHandler = async ({ locals, url }) => {
	const params = url.searchParams as URLSearchParams;

	const db = locals.db;

	const recipes = await db
		.select({
			id: recipesTable.id,
			name: recipesTable.name,
			date: recipesTable.date,
			imgId: recipesTable.imgId,
			ingredients: sql<
				{ id: number; name: string, allowed: boolean }[]
			>`json_agg(json_build_object('id', ${ingredientsTable.food_id}, 'name', ${foodsTable.name}, 'allowed', ${foodsTable.allowed}))`.as(
				'ingredients'
			)
		})
		.from(ingredientsTable)
		.leftJoin(recipesTable, eq(ingredientsTable.recipe_id, recipesTable.id))
		.leftJoin(foodsTable, eq(ingredientsTable.food_id, foodsTable.id))
		.groupBy(recipesTable.id, recipesTable.name)
		.orderBy(desc(recipesTable.date));

	const result = {
		recipes: recipes,
		next: null
	};

	return json(result);
};
