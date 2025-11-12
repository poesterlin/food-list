import { iconsTable } from "$lib/db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import type { RequestHandler } from './$types';
import { read } from '$app/server';
import { db } from "$lib/db-instance";

const icons = import.meta.glob('./icons/*.png', { query: '?url', import: "default", eager: true });

export const GET: RequestHandler = async ({ params }) => {
    const id = z.coerce.number().parse(params.id);

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
