import React from 'react'
import { getCookies, setCookie, hasCookie } from 'cookies-next';
import { splitCookie, storefront } from '@/utils';
import { useState } from 'react';

export default function ButtonToCart({productID}) {
    const [loading, setLoading] = useState(false);

    async function addToCart(){
        setLoading(true);
        setTimeout(function () {
            setLoading(false);
        }, 1500);
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
        if (!hasCookie('CART')){
            const { data } = await storefront(noCartMutation, {
                cartInput: {
                  lines: {
                    merchandiseId: productID,
                    quantity: 1
                    }
                }
            })
            setCookie('CART', data.cartCreate.cart.id);
            console.log( data );
        } else {
            const { CART } = getCookies('CART');
            console.log(getCookies('CART'));
            const cartId = splitCookie(CART);
            const { data } = await storefront(cartMutation, {
                cartId: "gid://shopify/Cart/c1-" + cartId,
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

    return (
        <>
            <button 
            onClick={() => {
                addToCart();
            }} 
            className="flex w-full justify-center text-white bg-pink-400 border-0 py-2 mt-10 my-5 focus:outline-none hover:bg-pink-600 rounded-full">
                {loading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : <p>Add To Cart</p>}
            </button>
        </>
    )
}
