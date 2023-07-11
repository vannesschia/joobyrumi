'use client'

import React from 'react'
import { formatPrice, storefront, splitDescription } from '@/utils';
import { useState, useEffect } from 'react';

export default function Handle({ params }) {
    const [inv, setInv] = useState({});
    const [isFetched, setIsFetched] = useState(false);
    console.log(params.handle);

    useEffect(() => {
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
                }
            }
        `
        async function fetchData(){
          const data = await storefront(SingleProductQuery, {handle: params.handle });
          //console.log(data);
          setInv(data);
          setIsFetched(true);
      }
      fetchData();
      },[])
      console.log(inv);
    
      if(!isFetched) return (
        <div className="flex-1 grid place-items-center">
          <p className="text-center text-2xl"></p>
        </div>
        
      );

      const product = inv.productByHandle

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
                    <span className="title-font text-2xl text-gray-900">{formatPrice(product.priceRange.minVariantPrice.amount)}.00</span>
                </div>
                <div className="flex">
                    <button className="flex w-full justify-center text-white bg-pink-400 border-0 py-2 mt-10 my-5 focus:outline-none hover:bg-pink-300 rounded-full">Add To Cart</button>
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

const SingleProductQuery = `
query SingleProduct($handle: String!){
    productByHandle(handle: $handle){
      title
      description
      priceRange{
        minVariantPrice{
          amount
        }
      }
      images(first: 2){
        edges{
          node{
            url
            altText
          }
        }
      }
    }
  }
`