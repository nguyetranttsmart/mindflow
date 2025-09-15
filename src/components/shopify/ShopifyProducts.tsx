import Link from "next/link";
import { FC } from "react";

type Props = {
  products: any;
};
export const ShopifyProducts: FC<Props> = ({ products }) => {
  return (
    <div className="mt-20 grid grid-cols-1 border-3 border-black">
      {products.map((p: any) => (
        <Link
          href={`/shopifyProducts/${p.handle}`}
          key={p.id}
          className="relative border-3 border-black"
        >
          <img
            className="w-full"
            src={p.featuredImage?.url}
            alt={p.featuredImage?.altText || p.title}
          />
          <div className="absolute flex flex-col bottom-0 left-0 right-0 bg-black/50 text-white p-2">
            <p className="text-2xl"> {p.title}</p>
            <p className="text-xl">${p.variants.edges[0]?.node.price.amount}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
