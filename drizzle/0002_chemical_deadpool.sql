CREATE TABLE IF NOT EXISTS "insights" (
	"title" text NOT NULL,
	"date" date DEFAULT now() NOT NULL,
	"icon" text NOT NULL,
	"suspected_ingredients" integer[] NOT NULL,
	"severity" integer NOT NULL
);
