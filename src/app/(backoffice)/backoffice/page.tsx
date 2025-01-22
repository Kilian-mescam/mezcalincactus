import { BackButton } from "@/components/BackButton";
import { getShow } from "@/lib/queries/getShow";
import ShowForm from "@/app/(backoffice)/backoffice/ShowForm";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const { showId } = await searchParams

    if (!showId) return { title: "New Show" }

    return { title: `Edit Show #${showId}`}
}

export default async function ShowFormPage({
    searchParams, 
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    try {
        const { showId } = await searchParams

        // Edit a customer from
        if (showId) {
            const show = await getShow(parseInt(showId))

            if (!show) {
                return (
                    <>
                        <h2 className="text-2xl mb-2">Show ID #{showId} not found</h2>
                        <BackButton title="Go Back" variant="default" />
                    </>
                )
            }
            console.log(show)
            // put customer form component 
            return <ShowForm show={show} />
        } else {
            // new customer form component 
            return <ShowForm />
        }
    } catch (e) {
        if (e instanceof Error) {
            throw e
        }
    }
}