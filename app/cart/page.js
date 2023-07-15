import React from 'react'
import Link from "next/link"
import { storefront, formatPrice } from '@/utils'
import { getCardID } from '../components';

export default async function Cart() {
  const cartId = getCardID();

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

    const { data } = await storefront(removeLine, {
      cartId: cartId,
      lineIds: item,
    });
    console.log(data);
  }

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
  const { data } = await storefront(getCart, {
      id: cartId,
  });
  console.log(data);
  console.log(data.cart.lines.edges.length);

  
  return (
    <>
      {(getCardID() && (data.cart.lines.edges.length > 0)) ? 
      <div className="flex grid place-items-center divide-y mt-12">
        {
          data.cart.lines.edges.map((item)=>{
            const product = item.node.merchandise

            return(
              <div className="w-1/2">
                <div className="py-4 flex">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img className="h-full w-full object-cover object-center" src={product.image.url}/>
                  </div>
                  {/* <p className="text-center">{product.product.title}</p> */}
                  <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>
                              <a href={`/${product.product.handle}`}>{product.product.title}</a>
                            </p>
                            <p className="ml-4">{formatPrice(product.price.amount)}</p>
                          </div>
                          {/* <p class="mt-1 text-sm text-gray-500">Salmon</p> */}
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">Qty {item.node.quantity}</p>

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
              <p>{formatPrice(data.cart.cost.subtotalAmount.amount)}</p>
            </div>
            <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div class="mt-6 flex justify-center">
              <a href={data.cart.checkoutUrl} class="w-3/4 flex items-center justify-center rounded-md border border-transparent bg-pink-400 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-pink-600">Checkout</a>
            </div>
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