import { db } from "@/db"
import { shows } from "@/db/schema"

export async function getShows() {
    const showsData = await db.select()
        .from(shows)

    return showsData
}
