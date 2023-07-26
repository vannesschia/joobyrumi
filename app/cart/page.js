'use client'

import React from 'react'
import Link from "next/link"
import { useState, useEffect } from 'react'
import { storefront, formatPrice, splitCookie } from '@/utils'
import { deleteCookie, getCookies, hasCookie } from 'cookies-next';
import ItemInCart from './ItemInCart'

export default function Cart() {
  const [list, setList] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const [update, setUpdate] = useState(false);
  console.log(hasCookie('CART'));
  const changeUpdate = () => {
    setUpdate(!update);
    console.log(update);
  }

  useEffect(() => {
    const getCart = `
    query getCart($id: ID!){
        cart(
          id: $id,
        ) {
          id
          createdAt
          updatedAt
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    product{
                      handle
                      title
                      totalInventory
                    }
                    price{
                      amount
                    }
                    image{
                      url
                    }
                  }
                }
                attributes {
                  key
                  value
                }
              }
            }
          }
          attributes {
            key
            value
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
            totalDutyAmount {
              amount
              currencyCode
            }
          }
        }
      }
    `
    if (hasCookie('CART')){
      const { CART } = getCookies('CART');
      //console.log(CART);
      const cartId = splitCookie(CART);
      const fetchCart = async() => {
        const { data } = await storefront(getCart, {
          id: "gid://shopify/Cart/c1-" + cartId,
        });
        console.log(data);
        setList(data);
        setIsFetched(true);
      }
      fetchCart();
    }
    // if (isFetched && (list.cart.lines.edges.length === 0)){
    //   deleteCookie('CART');
    // }
  }, [update])

  if(!isFetched) {return (
    <div className="flex-1 grid place-items-center">
    </div>
  )}
  // if (isFetched && hasCookie('CART') && list.cart.lines.edges.length === 0){
  //   deleteCookie('CART');
  // } 
  
  return (
    <>
      {(hasCookie('CART') && (list.cart.lines.edges.length > 0)) ? 
      <div className="flex grid place-items-center divide-y mt-12">
        {
          list.cart.lines.edges.map((item)=>{
            const product = item.node.merchandise

            return(
              <ItemInCart key={product.product.handle} currItem={item} changeUpdate={changeUpdate} totalInv={product.product.totalInventory}/>
            )
          })
        }
        <div className="w-1/2 border-t border-gray-200 py-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{formatPrice(list.cart.cost.subtotalAmount.amount)}</p>
            </div>
            <div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            </div>
            <form action={list.cart.checkoutUrl}>
              <div className="flex items-center">
                  <input required id="link-checkbox" type="checkbox" value="yes" className="w-4 h-4 text-pink-500 bg-white-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-white-700 dark:border-gray-600" />
                  <label htmlFor="link-checkbox" className="ml-2 text-sm text-gray-500">I agree with the <a href="/policies/terms-and-conditions" className="text-pink-600 dark:text-pink-500 hover:underline">terms and conditions</a>.</label>
              </div>
              <div className="mt-6 flex justify-center">
                <input type="submit" name ="Checkout" value="Checkout" className="w-3/4 flex items-center justify-center rounded-md border border-transparent bg-pink-400 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-pink-600"/>
              </div>
            </form>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                or&nbsp; <Link className="text-pink-400 hover:text-pink-600" href="/">Continue Shopping &#8594;</Link>
            </div>
        </div>
      </div>
      
      : 
      <div className="flex-1 grid place-items-center">
        <div>        
          <p className="py-4 text-2xl text-bold">Your cart is currently empty.</p>
          <Link className="flex justify-center hover:text-pink-500" href="/">Continue Shopping &#8594;</Link>
        </div>
      </div>}
    </>
  )
}