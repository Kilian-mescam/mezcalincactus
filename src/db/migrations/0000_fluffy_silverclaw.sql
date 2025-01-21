CREATE TABLE "shows" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"place" varchar NOT NULL,
	"address" varchar NOT NULL,
	"city" varchar NOT NULL,
	"image_url" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
