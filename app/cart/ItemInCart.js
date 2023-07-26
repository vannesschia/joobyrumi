'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { storefront, formatPrice, splitCookie } from '@/utils'
import { getCookies, hasCookie } from 'cookies-next';

function ItemInCart({currItem, changeUpdate, totalInv}) {
    const item = currItem;
    // console.log(item.node);
    // console.log(totalInv);
    const [currQuantity, setCurrQuantity] = useState(item.node.quantity);

    async function addOneMore(nodeId, itemQuantity, productId){

        const updateAddOne = `
        mutation updateLessOne($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart {
              id
            }
          }
        }
        `
        const { CART } = getCookies('CART');
        const cartId = splitCookie(CART);
        const { data } = await storefront(updateAddOne, {
          cartId: "gid://shopify/Cart/c1-" + cartId,
          lines: [{
            id: nodeId,
            quantity: (itemQuantity+1),
            merchandiseId: productId,
          }]
        });
        if (currQuantity < totalInv){
            setCurrQuantity(currQuantity+1);
        }
        // setUpdate(!update);
        changeUpdate();
    }

    async function minusOneLess(nodeId, itemQuantity, productId){
        const updateLessOne = `
        mutation updateLessOne($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
            cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart {
                id
            }
            }
        }
        `
        const { CART } = getCookies('CART');
        const cartId = splitCookie(CART);
        const { data } = await storefront(updateLessOne, {
            cartId: "gid://shopify/Cart/c1-" + cartId,
            lines: [{
            id: nodeId,
            quantity: (itemQuantity-1),
            merchandiseId: productId,
            }]
        });
        if (currQuantity === 0){
            removeCartLine(item.node.id);
        } else {
            setCurrQuantity(currQuantity-1);
        }
        // setUpdate(!update);
        changeUpdate();
    }

    async function removeCartLine(item) {
        const removeLine = `
        mutation removeCartLines($cartId: ID!, $lineIds: [ID!]!){
          cartLinesRemove(cartId: $cartId, lineIds: $lineIds){
            cart{
              id
            }
          }
        }
        `
        const { CART } = getCookies('CART');
        const cartId = splitCookie(CART);
        const { data } = await storefront(removeLine, {
          cartId: "gid://shopify/Cart/c1-" + cartId,
          lineIds: item,
        });
        console.log(data);
        // setUpdate(!update);
        changeUpdate();
    }

    const product = item.node.merchandise;
    return (
        <div className="w-1/2">
            <div className="py-4 flex">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img className="h-full w-full object-cover object-center" src={product.image.url}/>
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                    <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <Link href={`/${product.product.handle}`}>{product.product.title}</Link>
                            <p className="ml-4">{formatPrice(product.price.amount)}</p>
                        </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                        {/* <p className="text-gray-500">Qty {item.node.quantity}</p> */}
                        <div className="border-pink-500 border-2 mb-1 flex flex-row h-8 w-28 rounded-full relative bg-transparent">
                            <button onClick={()=>minusOneLess(item.node.id, item.node.quantity, product.id)} data-action="decrement" className=" h-full w-20 rounded-l-full cursor-pointer">
                                <span className="m-auto text-xl font-thin">−</span>
                            </button>

                            <input type="" className="border-transparent text-center w-full font-base text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700" name="custom-input-number" value={currQuantity} readOnly></input>

                            <button onClick={()=>addOneMore(item.node.id, item.node.quantity, product.id)} className="h-full w-20 rounded-r-full cursor-pointer">
                                <span className="m-auto text-xl font-thin">+</span>
                            </button>
                        </div>
                        <div className="flex">
                            <button onClick={() => {removeCartLine(item.node.id)}} type="button" className="font-medium text-pink-400 hover:text-pink-600">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ItemInCart