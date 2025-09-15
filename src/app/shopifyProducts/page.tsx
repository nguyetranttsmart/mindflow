import { ShopifyProducts } from "@/components/shopify/ShopifyProducts";
import { getProducts } from "@/shopify/productsQuery";
import React from "react";

export default async function shopifyProducts() {
  const products = await getProducts();
  return (
    <div className="p-2 bg-orange-300">
      <ShopifyProducts products={products} />
    </div>
  );
}
