import Link from "next/link";

const Footer = () => {
    return (
        <>
            <div className="divide-y divide-blue-200 container pb-10 px-5">
                
                <Link href="https://www.julianbattaglino.com.ar" target="_blank" rel="noopener noreferrer">
                    <span> Desarrollado por Julian Battaglino</span>
                </Link>

            </div>

        </>
    )
}

export default Footer;