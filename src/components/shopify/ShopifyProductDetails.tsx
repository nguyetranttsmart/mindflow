"use client";
import React, { FC } from "react";

type Props = {
  product: any;
};
export const ShopifyProductDetails: FC<Props> = ({ product }) => {
  return (
    <div className="mt-20  border-3 border-black">
      <div className="border-3 border-black flex flex-col items-center gap-5  text-black py-5">
        <p className="text-5xl"> {product.title}</p>
        <p className="text-3xl">
          ${product.variants.edges[0]?.node.price.amount}
        </p>
        <p className="text-2xl text-center">{product.description}</p>
      </div>
    </div>
  );
};
