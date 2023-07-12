import Link from "next/link";

function Navbar() {
    return(
        <div className="grid grid-cols-3">
            <div>
            </div>
            <div className="">
                <div className="mt-10 h-22 flex justify-center">
                        <Link className="" href="/"><img className="h-20" src="./test_logo2.png" alt="test_logo"/></Link>
                </div>
                <div className="mt-4 font-sans">
                    <ul className="flex justify-center">
                        <li className="text-sm mr-6 hover:text-pink-300">
                            <Link href="/">Catalog</Link>
                        </li>
                        <li className="text-sm mr-6 hover:text-pink-300">
                            <Link href="/about">About</Link>
                        </li>
                        <li className="text-sm hover:text-pink-300">
                            <Link href="/commissions">Commission</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex justify-end self-center mr-12">
                <Link href="/cart">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="file: mt-4 h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                </Link>
            </div>
                {/* <hr className="my-4 h-px border-0 bg-neutral-400" /> */}
        </div>
    )
}

export default Navbar;