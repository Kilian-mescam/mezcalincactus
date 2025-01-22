import { selectShowSchemaType } from "@/zod-schemas/show";

type Props = {
    show?: selectShowSchemaType,
}

export default function Show({ show }: Props) {
    if (!show) return null; // In case show data is missing

    return (
        <div className="relative py-3  text-black bg-white rounded-xl p-20 gap-10 w-1/3 ">
                <div className="pr-10 flex flex-col gap-5">
                    <h1 className='text-5xl font-white'>{show.name}</h1>
                    <p className="text-base">{show.place}</p>
                </div>
        </div>
    );
};
