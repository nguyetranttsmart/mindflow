import FilteredBlogs from "@/components/blog/FilteredBlogs";
import { createClient } from "@/prismicio";
import * as prismic from "@prismicio/client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const client = createClient();
  const { slug } = await params;
  const category = await client.getByUID("categories", slug);
  return {
    title: category.data.name,
    description: category.data.description,
  };
}

export default async function Category({ params }: Props) {
  const { slug } = await params;
  const client = createClient();
  const category = await client.getByUID("categories", slug);
  const blogs = await client.getAllByType("blog", {
    filters: [prismic.filter.at("my.blog.category", category.id)],
  });
  return (
    <div>
      <FilteredBlogs blogs={blogs} label={category.data.name} />
    </div>
  );
}
