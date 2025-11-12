import { z } from "zod";
import { recipesTable } from "$lib/db";
import { eq } from "drizzle-orm";
import { getImageResponseStream } from "$lib/s3";
import type { RequestHandler } from './$types';
import { redirect } from "@sveltejs/kit";
import { db } from "$lib/db-instance";

export const GET: RequestHandler = async ({ params }) => {
    const id = z.coerce.number().parse(params.id);

    const [recipe] = await db
        .select()
        .from(recipesTable)
        .where(eq(recipesTable.id, id))
        .limit(1);

    const imgId = recipe.imgId;

    if (!imgId) {
        redirect(302, "/placeholder.svg");
    }

    return getImageResponseStream(imgId);
}
