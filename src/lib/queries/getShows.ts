import { db } from "@/db"
import { shows } from "@/db/schema"

export async function getShows() {
    const customers = await db.select()
        .from(shows)

    return customers
}
