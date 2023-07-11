const { storefront } = require("@/utils")

async function getStaticProps(){
    const data = await storefront(productsQuery)
    return {
        props: {
            products: data.products,
        }
    }
}

const productsQuery = `
  query Products {
    products(first:100){
      edges{
        node{
          title
          handle
          priceRangeV2{
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