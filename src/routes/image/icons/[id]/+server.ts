import { iconsTable } from "$lib/db";
import { getImageResponseStream } from "$lib/s3";
import { eq } from "drizzle-orm";
import { z } from "zod";
import type { RequestHandler } from './$types';


export const GET: RequestHandler = async ({ params, locals }) => {
    const id = z.coerce.number().parse(params.id);

    const db = locals.db;
    const [icon] = await db
        .select()
        .from(iconsTable)
        .where(eq(iconsTable.id, id))
        .limit(1);

    return getImageResponseStream(icon.url);
}
