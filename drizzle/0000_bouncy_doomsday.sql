CREATE TABLE IF NOT EXISTS "foods" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" text NOT NULL,
	"name" text NOT NULL,
	"allowed" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ingredients" (
	"recipe_id" integer NOT NULL,
	"food_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"date" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_food_id_foods_id_fk" FOREIGN KEY ("food_id") REFERENCES "public"."foods"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
