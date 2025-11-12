import { building } from "$app/environment";
import { POSTGRES_CONNECTION_STRING } from "$env/static/private";
import { SQL } from "bun";
import { drizzle } from "drizzle-orm/postgres-js";
import type { DB } from "./db";

export let db: DB;

if (!building) {
    const client = new SQL(POSTGRES_CONNECTION_STRING) as any;

    client.options = {
        parsers: {},
        serializers: {}
    };

    db = drizzle(client, { logger: false });
}
