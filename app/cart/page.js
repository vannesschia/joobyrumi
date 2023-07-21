'use client'

import React from 'react'
import Link from "next/link"
import { useState, useEffect } from 'react'
import { storefront, formatPrice, splitCookie } from '@/utils'
import { getCookies, hasCookie } from 'cookies-next';

export default function Cart() {
  const [list, setList] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  async function addOneMore(nodeId, currQuantity, productId){
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
        quantity: (currQuantity+1),
        merchandiseId: productId,
      }]
    });
    window.location.reload()
  }
  async function minusOneLess(nodeId, currQuantity, productId){
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
        quantity: (currQuantity-1),
        merchandiseId: productId,
      }]
    });
    window.location.reload()
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
    window.location.reload()
    //router.refresh();
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
  }, [])

  if(!isFetched) return (
    <div className="flex-1 grid place-items-center">
      <p className="text-center text-2xl"></p>
    </div>
  );
  
  return (
    <>
      {(hasCookie('CART') && (list.cart.lines.edges.length > 0)) ? 
      <div className="flex grid place-items-center divide-y mt-12">
        {
          list.cart.lines.edges.map((item)=>{
            const product = item.node.merchandise

            return(
              <div className="w-1/2">
                <div className="py-4 flex">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img className="h-full w-full object-cover object-center" src={product.image.url}/>
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>
                              <a href={`/${product.product.handle}`}>{product.product.title}</a>
                            </p>
                            <p className="ml-4">{formatPrice(product.price.amount)}</p>
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          {/* <p className="text-gray-500">Qty {item.node.quantity}</p> */}
                          <div class="border-pink-500 border-2 mb-1 flex flex-row h-8 w-28 rounded-full relative bg-transparent">
                            <button onClick={()=>minusOneLess(item.node.id, item.node.quantity, product.id)} data-action="decrement" class=" h-full w-20 rounded-l-full cursor-pointer">
                              <span class="m-auto text-xl font-thin">−</span>
                            </button>
                            <input type="" class="border-transparent text-center w-full font-base text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700" name="custom-input-number" value={item.node.quantity}readOnly></input>
                            <button onClick={()=>addOneMore(item.node.id, item.node.quantity, product.id)} class="h-full w-20 rounded-r-full cursor-pointer">
                              <span class="m-auto text-xl font-thin">+</span>
                            </button>
                          </div>
                          <div className="flex">
                            <button onClick={() => {removeCartLine(item.node.id)}} type="button" class="font-medium text-pink-400 hover:text-pink-600">Remove</button>
                          </div>
                        </div>
                    </div>
                  </div>
              </div>
            )
          })
        }
        <div class="w-1/2 border-t border-gray-200 py-6">
            <div class="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{formatPrice(list.cart.cost.subtotalAmount.amount)}</p>
            </div>
            <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <form action={list.cart.checkoutUrl}>
              <div class="flex items-center">
                  <input required id="link-checkbox" type="checkbox" value="yes" class="w-4 h-4 text-pink-500 bg-white-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-white-700 dark:border-gray-600" />
                  <label for="link-checkbox" class="ml-2 text-sm text-gray-500">I agree with the <a href="/policies/terms-and-conditions" class="text-pink-600 dark:text-pink-500 hover:underline">terms and conditions</a>.</label>
              </div>
              <div class="mt-6 flex justify-center">
                <input type="submit" name ="Checkout" value="Checkout" class="w-3/4 flex items-center justify-center rounded-md border border-transparent bg-pink-400 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-pink-600"/>
              </div>
            </form>
            <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                or&nbsp; <Link className="text-pink-400 hover:text-pink-600" href="/">Continue Shopping &#8594;</Link>
            </div>
        </div>
      </div>
      
      : 
      <div className="flex-1 grid place-items-center">
        <div>        
          <p className="py-4 text-2xl text-bold">Your cart is currently empty.</p>
          <Link className="flex justify-center" href="/">Continue Shopping &#8594;</Link>
        </div>
      </div>}
    </>
  )
}