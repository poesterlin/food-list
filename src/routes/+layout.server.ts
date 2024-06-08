import { recipesTable } from '../lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const db = locals.db;

	const [result] = await db.select().from(recipesTable).orderBy(recipesTable.id).limit(1);
	const date = new Date(result.date);
	const daysSince = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

	return { daysSince };
};
