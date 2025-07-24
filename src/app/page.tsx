import HomePage from "@/components/home/HomePage";
import { createClient } from "@/prismicio";
import { Metadata } from "next";
import * as prismic from "@prismicio/client";

export const revalidate = 100;

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const homepage = await client.getSingle("homepage");
  const metadata = {
    title: homepage.data.metatitle,
    description: homepage.data.metadescription,
    openGraph: homepage?.data?.opengraph.reduce((prev, item) => {
      return {
        ...prev,
        [item.label as string]: item.value,
      };
    }, {}),
  };
  console.log("metadata", metadata);
  return metadata;
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const client = createClient();
  const filters = searchParams?.query
    ? [prismic.filter.fulltext("my.blog.title", searchParams?.query)]
    : [];
  const blogs = await client.getAllByType("blog", { filters });

  const homepage = await client.getSingle("homepage");
  const categories = await client.getAllByType("categories", {});
  return (
    <HomePage
      blogs={blogs}
      homepage={homepage}
      categories={categories}
      query={searchParams?.query || ""}
    />
  );
}
