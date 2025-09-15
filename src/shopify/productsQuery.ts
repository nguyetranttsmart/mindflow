// lib/shopify.ts

import { shopifyFetch } from "@/app/api/shopify/route";

export async function getProducts(limit = 10) {
  const query = `
query getProducts($first: Int!) {
  products(first: $first) {
    edges {
      node {
        id
        title
        handle
        description
        availableForSale
        createdAt
        priceRange {
          minVariantPrice { amount }
          maxVariantPrice { amount }
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
        featuredImage {
          url
          altText
        }
        collections(first: 5) {
          edges {
            node {
              title
            }
          }
        }
      }
    }
  }
}

  `;

  const data = await shopifyFetch(query, { first: limit });
  return data.products.edges.map((edge: any) => edge.node);
}
