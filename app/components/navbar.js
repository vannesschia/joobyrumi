import Link from "next/link";
import CartIcon from "./CartIcon";

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
                <CartIcon/>
            </div>
                {/* <hr className="my-4 h-px border-0 bg-neutral-400" /> */}
        </div>
    )
}

export default Navbar;