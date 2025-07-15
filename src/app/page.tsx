import HomePage from "@/components/home/HomePage";
import { createClient } from "@/prismicio";
import { Metadata } from "next";

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

export default async function Page() {
  const client = createClient();
  const blogs = await client.getAllByType("blog", {});

  return <HomePage blogs={blogs} />;
}
