import React from 'react'
import Link from "next/link"

export default async function Cart() {
  return (
    <div className="flex-1 grid place-items-center">
        <div>        
            <p className="py-4 text-2xl text-bold">Your cart is currently empty.</p>
            <Link className="flex justify-center" href="/">Continue Shopping &#8594;</Link>
        </div>
    </div>
  )
}