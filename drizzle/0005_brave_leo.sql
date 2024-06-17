ALTER TABLE "insights" DROP CONSTRAINT "insights_icon_id_icons_id_fk";
--> statement-breakpoint
ALTER TABLE "insights" ADD COLUMN "symptoms" integer[] NOT NULL;--> statement-breakpoint
ALTER TABLE "icons" DROP COLUMN IF EXISTS "alt";--> statement-breakpoint
ALTER TABLE "insights" DROP COLUMN IF EXISTS "title";--> statement-breakpoint
ALTER TABLE "insights" DROP COLUMN IF EXISTS "icon_id";--> statement-breakpoint
ALTER TABLE "insights" DROP COLUMN IF EXISTS "icon_color";--> statement-breakpoint
ALTER TABLE "insights" DROP COLUMN IF EXISTS "suspected_ingredients";--> statement-breakpoint
ALTER TABLE "insights" DROP COLUMN IF EXISTS "severity";