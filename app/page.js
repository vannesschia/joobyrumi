'use client'

import { formatPrice, storefront } from '@/utils'
import { useState, useEffect } from 'react';
import Image from 'next/image'

export default function Home() {
  const [inv, setInv] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const productsQuery = `
      query Products {
        products(first:100){
          edges{
            node{
              title
              handle
              priceRange{
                minVariantPrice{
                  amount
                }
              }
              description
              images(first:2){
                edges{
                  node{
                    url
                    altText
                  }
                }
              }
              totalInventory
            }
          }
        }
      }
    `
    async function fetchData(){
      const data = await storefront(productsQuery);
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
  return (
    <>
    {/* <div className="flex-1 grid place-items-center">
      <p className="text-center text-2xl">✧.* COMING SOON *.✧</p>
    </div> */}
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-10 sm:mt-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      
      {inv.products.edges.map((item) => {

        const product = item.node
        const image = product.images.edges[0].node

        return (
          <div className="group relative" key={product.handle}>
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img 
                src={image.url} 
                alt={image.altText}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href={`/${product.handle}`}>
                    <span aria-hidden="true" className="absolute inset-0"></span>
                    {product.title}
                  </a>
                </h3>
              </div>
              <p className="text-sm font-medium text-gray-900">{formatPrice(product.priceRange.minVariantPrice.amount)}</p>
            </div>
          </div>
      )})}
    </div>
  </div>
    </>
  )
}

// Home.getInitialProps = async() => {
//   const data = await storefront(productsQuery)
//   return {
//     props: {
//       products: data,
//     }
//   }
// }

// const gql = String.raw

// const productsQuery = gql`
//   query getProductsList {
//     products(first:100){
//       edges{
//         node{
//           title
//           handle
//           priceRangeV2{
//             minVariantPrice{
//               amount
//             }
//           }
//           description
//           images(first:2){
//             edges{
//               node{
//                 url
//                 altText
//               }
//             }
//           }
//           totalInventory
//         }
//       }
//     }
//   }
// `