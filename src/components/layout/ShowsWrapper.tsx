import { getShows } from "@/lib/queries/getShows";
import Show from "./Show";

export async function ShowsWrapper() {
    const showData = await getShows()
    return (
        <div id="shows" className="flex flex-col gap-32">
                {showData.map((show, index) => (
                    <Show
                        key={index}
                        show={show}                    
                    />
                ))}
            </div>
    ) 
}