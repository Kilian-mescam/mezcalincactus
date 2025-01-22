"use server"

import { eq } from "drizzle-orm"
import { flattenValidationErrors } from 'next-safe-action'
import { redirect } from 'next/navigation'

import { db } from '@/db'
import { shows } from "@/db/schema"
import { insertShowSchema, type insertShowSchemaType } from "@/zod-schemas/show"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { actionClient } from "@/lib/safe-action"

export const saveShowAction = actionClient
    .metadata({ actionName: 'saveShowAction'})
    .schema(insertShowSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
    })
    .action(async ({ 
        parsedInput: show
    }: { parsedInput: insertShowSchemaType }) => {

        // const { isAuthenticated } = getKindeServerSession()

        // const isAuth = await isAuthenticated()

        // if (!isAuth) redirect('/login')

        if (show.id === 0) {
            const result = await db.insert(shows).values({
                name: show.name,
                place: show.place,
                address: show.address,
                city: show.city,
                imageUrl: show.imageUrl ?? ""
            }).returning({ insertedId: shows.id })

            return { message: `Show ID #${result[0].insertedId} created successfully`}
        }

        // Existing customer
        const result = await db.update(shows)
            .set({
                name: show.name,
                place: show.place,
                address: show.address,
                city: show.city,
                imageUrl: show.imageUrl
            })
            .where(eq(shows.id, show.id!))
            .returning({ updatedId: shows.id })

        return { message: `Show ID #${result[0].updatedId} updated successfully`}
    })