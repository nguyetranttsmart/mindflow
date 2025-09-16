"use client";
import React, { FC } from "react";

type Props = {
  product: any;
};
export const ShopifyProductDetails: FC<Props> = ({ product }) => {
  return (
    <div className="mt-20 border-4  border-black ">
      <div className="border-4  text-center border-black flex flex-col items-center gap-5  text-black p-10 bg-[#A6C7BF]">
        <p className="text-5xl"> {product.title}</p>
        <p className="text-3xl text-red-800">
          ${product.variants.edges[0]?.node.price.amount}
        </p>
        <p className="text-2xl ">{product.description}</p>
      </div>
      <div>
        <img
          src={product.images.edges[0].node.url}
          className="border-4 border-black pt-5"
        />
        <div className="grid grid-cols-3 border-4 border-black">
          {product.images.edges.slice(1).map((img: any) => (
            <img key={img.node.id} src={img.node.url} />
          ))}
        </div>
      </div>
    </div>
  );
};
