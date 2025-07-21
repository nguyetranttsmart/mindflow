import { createClient } from "@/prismicio";
import { Metadata } from "next";
import React from "react";
import * as prismic from "@prismicio/client";
import BlogList from "@/components/blog/BlogList";

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
  console.log("blogs" + blogs);
  return (
    <div>
      <BlogList blogs={blogs} />
    </div>
  );
}
