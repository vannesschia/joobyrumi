'use client'

import React from 'react'
import ButtonToCart from './buttonToCart';
import { formatPrice, storefront, splitDescription } from '@/utils';

export default async function Handle({ params }) {
  
  const SingleProductQuery = `
      query SingleProduct($handle: String!) {
          productByHandle(handle: $handle) {
          title
          description
          totalInventory
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
  console.log(data);
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
                    {product.totalInventory === 0 ? 
                      <p className="text-lg font-normal opacity-60 tracking-widest flex w-full justify-center mt-10 my-5">SOLD OUT</p> 
                      : <ButtonToCart productID={productID}/>}
                  </div>
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