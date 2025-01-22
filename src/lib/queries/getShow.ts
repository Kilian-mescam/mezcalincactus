import { db } from "@/db"
import { shows } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getShow(id: number) {
    const show = await db.select()
        .from(shows)
        .where(eq(shows.id, id))

    return show[0]
}
