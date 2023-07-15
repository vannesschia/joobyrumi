'use client'

import React from 'react'
import { useState } from 'react';
import { cookies } from 'next/headers';
import { formatPrice, storefront, splitDescription } from '@/utils';

export default async function Handle({ params }) {
  const [isLoading, setIsLoading] = useState(false);
  async function addToCart(){
    setIsLoading(!isLoading);
      const noCartMutation = `
      mutation createCart($cartInput: CartInput) {
          cartCreate(input: $cartInput) {
            cart {
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
                      }
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
        }
      `
      const cartMutation = `
      mutation addCartLines($lines: [CartLineInput!]!, $cartId: ID!,) {
          cartLinesAdd(lines: $lines, cartId: $cartId, ) {
            cart {
            id
                lines(first: 10){
                    edges
                    {
                        node{
                            quantity
                            merchandise{
                                ... on ProductVariant {   						
                                    id
                                }
                            }
                        }
                    }
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
        
        
            userErrors {
              field
              message
            }
          }
        }
      `
      if (!window.localStorage.getItem('CartID')){
          const { data } = await storefront(noCartMutation, {
              cartInput: {
                lines: {
                  merchandiseId: productID,
                  quantity: 1
                  }
              }
          })
          window.localStorage.setItem('CartID', data.cartCreate.cart.id);
          console.log( data );
      } else {
          const cartId = window.localStorage.getItem('CartID');
          const { data } = await storefront(cartMutation,
            {
                  cartId: cartId,
                  lines: [
                      {
                          quantity: 1,
                          merchandiseId: productID
                      }
                  ]
              })
          console.log( data );
      }
    }

    // console.log(params.handle);
    const SingleProductQuery = `
        query SingleProduct($handle: String!) {
            productByHandle(handle: $handle) {
            title
            description
            priceRange {
                minVariantPrice {
                amount
                }
            }
            images(first: 2) {
                edges {
                node {
                    url
                    altText
                }
                }
            }
            variants(first: 1){
                edges{
                node{
                    id
                }
                }
            }
            }
        }
    `
    const { data } = await storefront(SingleProductQuery, { handle: params.handle });
    // console.log(data);
    const productID = data.productByHandle.variants.edges[0].node.id;
    // console.log(data.productByHandle.variants.edges[0].node.id)

    const product = data.productByHandle

    return (
    <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-row">
            <div className="w-full px-4">
                <div className="flex-wrap">
                    {product.images.edges.map((item) => {
                        return(
                            <img alt={item.node.altText} className="w-full object-cover object-center rounded-lg border border-gray-200" src={item.node.url}/>
                        )
                    })}
                </div>
            </div>
            <div className="w-full px-4 h-screen sticky top-0">
                <div className="">
                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>
                    <div className="flex">
                        <span className="title-font text-2xl text-gray-900">{formatPrice(product.priceRange.minVariantPrice.amount)}</span>
                    </div>
                    <div className="flex">
                        <button onClick={() => {addToCart()}} className="flex w-full justify-center text-white bg-pink-400 border-0 py-2 mt-10 my-5 focus:outline-none hover:bg-pink-600 rounded-full">
                          {isLoading && (
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                          )}
                          Add To Cart
                        </button>
                    </div>
                    {/* <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                    <div className="flex">
                        <span className="mr-3">Color</span>
                        <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                        <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                    </div>
                    <div className="flex ml-6 items-center">
                        <span className="mr-3">Size</span>
                        <div className="relative">
                        <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                            <option>SM</option>
                            <option>M</option>
                            <option>L</option>
                            <option>XL</option>
                        </select>
                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                            <path d="M6 9l6 6 6-6"></path>
                            </svg>
                        </span>
                        </div>
                    </div>
                    </div> */}
                    {/* <p className="leading-relaxed text-light">{product.description}</p> */}
                    {splitDescription(product.description).map((parts)=>{
                        return(
                            <div>
                                <p className="text text-light">{parts}</p><br></br>
                            </div>
                        )
                    })}
                </div>
                </div>
            </div>
    </div>
    )
    }