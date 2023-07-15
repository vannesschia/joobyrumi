export async function storefront(query, variables = {}){
    try {
        const res = await fetch(
            process.env.NEXT_PUBLIC_SHOPIFY_API_ENDPOINT,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Storefront-Access-Token':
                    process.env.NEXT_PUBLIC_API_TOKEN,
                },
                body: JSON.stringify({ query, variables }),
            }
        )
        // .then((res) => res.json());

        // if (response.errors) {
        //   console.log({ errors: response.errors });
        // } else if (!response || !response.data) {
        // //   console.log({ response });
        //   return 'No results found.';
        // }
        // console.log(inv);

        // const {data} = await res.json();
        // return data;
        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        }
        return res.json()
    } catch (error) {
        console.log(error);
    }
}

export function formatPrice(number){
    return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(number)
}

export function splitDescription(str){
    // console.log(str);
    var fields = str.split('~');
    // console.log(fields);
    return fields;
}