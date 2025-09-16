import { shopifyFetch } from "@/lib/shopifyFetch";

export async function getProductDetails(handle: string) {
  const query = `
    query ProductByHandle($handle: String!) {
    product(handle: $handle) {
        id
        title
        description
        category{
        name
        }
        images(first: 5){
        edges {
            node {
              id
              url
            }
          }
        }
        createdAt
        featuredImage{
        url
        }
        variants(first: 5) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
            }
          }
        }
    }
    }

  `;

  const data = await shopifyFetch(query, { handle });
  return data.product;
}
