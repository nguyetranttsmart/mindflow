import FilteredBlogs from "@/components/blog/FilteredBlogs";
import { createClient } from "@/prismicio";
import * as prismic from "@prismicio/client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const client = createClient();
  const author = await client.getByUID("author", slug);
  return {
    title: author.data.name,
    description: `All blog of ${author.data.name} `,
  };
}
export default async function Author({ params }: Props) {
  const { slug } = await params;
  const client = createClient();
  const author = await client.getByUID("author", slug);
  const blogs = await client.getAllByType("blog", {
    filters: [prismic.filter.at("my.blog.authors", author.id)],
  });
  return (
    <div>
      <FilteredBlogs blogs={blogs} label={author.data.name} />
    </div>
  );
}
