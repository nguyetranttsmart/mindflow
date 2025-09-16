const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN!;

export async function shopifyFetch(query: string, variables: any = {}) {
  console.log(domain);
  console.log(token);

  const res = await fetch(`https://${domain}/api/2025-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Shopify Storefront API error");
  }
  return json.data;
}
