import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core"

export const shows = pgTable("shows", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    placeName: varchar("placeName").notNull(),
    address: varchar("address").notNull(),
    city: varchar("city").notNull(),
    imageUrl: varchar("image_url").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
})