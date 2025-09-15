import { ShopifyProductDetails } from "@/components/shopify/ShopifyProductDetails";
import { getProductDetails } from "@/shopify/productDetailsQuerry";
import React from "react";

type Props = {
  params: Promise<{ slug: string }>;
};
export default async function Product({ params }: Props) {
  const { slug } = await params;
  const product = await getProductDetails(slug);
  return (
    <div className="bg-orange-300 ">
      <ShopifyProductDetails product={product} />
    </div>
  );
}
