import { building } from '$app/environment';
import { env } from '$env/dynamic/private';
import { POSTGRES_CONNECTION_STRING } from '$env/static/private';
import type { DB } from '$lib/db';
import { type Handle } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

let db: DB;
if (!building) {
    const client = postgres(POSTGRES_CONNECTION_STRING);
    db = drizzle(client, { logger: env.LOG_DB_QUERIES === "true" });
}

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.db = db;

    return resolve(event);
}