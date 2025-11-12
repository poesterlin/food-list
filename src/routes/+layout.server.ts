import { db } from '$lib/db-instance';
import { recipesTable } from '../lib/db';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const [result] = await db.select().from(recipesTable).orderBy(recipesTable.id).limit(1);
	const date = new Date(result.date);
	const daysSince = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

	const session = await event.locals.auth();
	
	return {
		daysSince,
		session
	};
};
