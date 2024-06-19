import { building, dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { POSTGRES_CONNECTION_STRING } from '$env/static/private';
import type { DB } from '$lib/db';
import { type Handle } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { ADMIN_LOGIN } from "$env/static/private";


let db: DB;
if (!building) {
    const client = postgres(POSTGRES_CONNECTION_STRING);
    db = drizzle(client, { logger: env.LOG_DB_QUERIES === "true" });
}

export const handle: Handle = async ({ event, resolve }) => {

    const url = new URL(event.request.url);
    if (url.pathname.startsWith("/insights") && !dev) {
        const auth = event.request.headers.get("Authorization");

        if (auth !== `Basic ${btoa(ADMIN_LOGIN)}`) {
            return new Response("Not authorized", {
                status: 401,
                headers: {
                    "WWW-Authenticate":
                        'Basic realm="User Visible Realm", charset="UTF-8"',
                },
            });
        }
    }

    event.locals.db = db;
    return resolve(event);
}