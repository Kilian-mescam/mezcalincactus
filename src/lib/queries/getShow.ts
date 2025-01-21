import { db } from "@/db"
import { shows } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getShow(id: number) {
    const customer = await db.select()
        .from(shows)
        .where(eq(shows.id, id))

    return customer[0]
}
