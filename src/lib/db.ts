import type { ExtractTablesWithRelations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { date, pgTable, text, type PgDatabase } from "drizzle-orm/pg-core";
import type { PostgresJsQueryResultHKT } from "drizzle-orm/postgres-js";

export type DB = PgDatabase<PostgresJsQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>;

export const foodsTable = pgTable('foods', {
    id: text('id').primaryKey().notNull(),
    category: text('category').notNull(),
    name: text('name').notNull(),
});

export const recipesTable = pgTable('recipes', {
    id: text('id').primaryKey().notNull(),
    name: text('name').notNull(),
    date: date('date').notNull().default(sql`now()`),
});

export const ingredientsTable = pgTable('ingredients', {
    recipe_id: text('recipe_id').notNull().references(() => recipesTable.id),
    food_id: text('food_id').notNull().references(() => foodsTable.id),
});