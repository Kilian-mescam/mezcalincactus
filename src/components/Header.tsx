import Link from 'next/link'
import Image from 'next/image'


export function Header() {
    return (
        <header className='bg-background fixed w-full h-20 p-2 border-b top-0 z-20 flex justify-between items-center'>
                <Link href="/"title="home">
                    <Image 
                        className="rounded-xl"
                        src="/images/logo-mezcal.png"
                        width={200}
                        height={200}
                        sizes="200px"
                        alt="Page not found"
                        priority={true}
                        title="Page Not Found"
                    />
                </Link>

                <div className='flex items-center'>
                    <ul className="flex gap-10 mr-10">
                        <li>Tour</li>
                        <li>Merch</li>
                        <li>Audio / Video</li>
                        <li>Biographie</li>
                    </ul>
                </div>
        </header>
    ) 
}