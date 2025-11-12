import { iconsTable } from "$lib/db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import type { RequestHandler } from './$types';
import { read } from '$app/server';

const icons = import.meta.glob('./icons/*.png', { query: '?url', import: "default", eager: true });

export const GET: RequestHandler = async ({ params, locals }) => {
    const id = z.coerce.number().parse(params.id);

    const db = locals.db;
    const [icon] = await db
        .select()
        .from(iconsTable)
        .where(eq(iconsTable.id, id))
        .limit(1);

    if (!icon) {
        return new Response(null, { status: 404 });
    }

    const url = icons['./' + icon.url];
    return read(url as string);
}
