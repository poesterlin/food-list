import type { ExtractTablesWithRelations } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import {
	serial,
	boolean,
	date,
	pgTable,
	text,
	type PgDatabase,
	integer
} from 'drizzle-orm/pg-core';
import type { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js';

export type DB = PgDatabase<
	PostgresJsQueryResultHKT,
	Record<string, never>,
	ExtractTablesWithRelations<Record<string, never>>
>;

export const foodsTable = pgTable('foods', {
	id: serial('id').primaryKey().notNull(),
	category: text('category').notNull(),
	name: text('name').notNull(),
	allowed: boolean('allowed').notNull().default(true)
});

export const recipesTable = pgTable('recipes', {
	id: serial('id').primaryKey().notNull(),
	name: text('name').notNull(),
	date: date('date')
		.notNull()
		.default(sql`now()`),
	imgId: text('s3_id')
});

export const ingredientsTable = pgTable('ingredients', {
	recipe_id: integer('recipe_id')
		.notNull()
		.references(() => recipesTable.id),
	food_id: integer('food_id')
		.notNull()
		.references(() => foodsTable.id)
});

export type Recipe = typeof recipesTable.$inferSelect;
