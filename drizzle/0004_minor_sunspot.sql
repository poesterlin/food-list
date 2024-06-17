ALTER TABLE "icons" ADD COLUMN "url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "icons" ADD COLUMN "alt" text NOT NULL;--> statement-breakpoint
ALTER TABLE "icons" ADD COLUMN "category" text NOT NULL;--> statement-breakpoint
ALTER TABLE "insights" ADD COLUMN "icon_color" text;