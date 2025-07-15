import React from "react";
import { blogs } from "@/data/blogs";
import { notFound } from "next/navigation";
import BlogInfomation from "@/components/blog/BlogInfomation";
import { createClient } from "@/prismicio";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Blog({ params }: Props) {
  const { slug } = await params;
  const client = createClient();
  const blog = await client.getByUID("blog", slug);
  return <BlogInfomation blog={blog} />;
}
