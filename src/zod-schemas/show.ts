import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { shows } from "@/db/schema";

export const insertShowSchema = createInsertSchema(shows, {
    name: (schema) => schema.name.min(1, "Title is required"),
    placeName: (schema) => schema.placeName.min(1, "Place name is required"), // Assuming this is the correct column
    address: (schema) => schema.address.min(1, "Address is required"), // Assuming address is correct
    city: (schema) => schema.city.min(1, "City is required"), // Assuming city is correct
    imageUrl: (schema) => schema.imageUrl.min(1, "Image URL is required"), // Removed the duplicate entry
});

export const selectShowSchema = createSelectSchema(shows);

export type insertShowSchemaType = typeof insertShowSchema._type;
export type selectShowSchemaType = typeof selectShowSchema._type;