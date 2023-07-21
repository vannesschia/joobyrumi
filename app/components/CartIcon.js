'use client'

import { storefront, splitCookie } from '@/utils';
import { hasCookie, getCookie } from 'cookies-next';
import React from 'react'
import Link from 'next/link';
import { useState, useEffect } from 'react'

function CartIcon() {
    const [totalItems, setTotalItems] = useState(0);
    const [isFetched, setIsFetched] = useState(false);
    
    useEffect(() => {
        if(hasCookie('CART')){
            const CART = getCookie('CART');
            //console.log(CART);
            //console.log(getCookie('CART'));
            const cartId = splitCookie(CART);
            const getCartTotalItemsFunc = async() => {
                const getCartTotalItems = `
                query getCartTotalItems($id: ID!) {
                    cart(id: $id) {
                      totalQuantity
                    }
                  }
                `
                const { data } = await storefront(getCartTotalItems, {id: "gid://shopify/Cart/c1-" + cartId});
                setTotalItems(data.cart.totalQuantity);
                setIsFetched(true);
            }
            getCartTotalItemsFunc();
            console.log(totalItems);
        }
    }, [])
    if(!isFetched){
        return (
            <div className="relative scale-75">
            <Link href="/cart">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="h-8 w-8 text-black-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
            </Link>
        </div>
        );
    }
    return (
        <div className="relative scale-75">
            <Link href="/cart">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="h-8 w-8 text-black-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                {(totalItems !== 0) &&
                    <span class="absolute -top-2 left-4 rounded-full bg-pink-500 p-0.5 px-2 text-sm text-red-50">{totalItems}</span>
                }
            </Link>
        </div>
    )
}

export default CartIcon