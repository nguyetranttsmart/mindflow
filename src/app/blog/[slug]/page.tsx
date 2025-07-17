import BlogInfomation from "@/components/blog/BlogInfomation";
import { createClient } from "@/prismicio";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};
export const revalidate = 100;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const client = createClient();
  const { slug } = await params;
  const blog = await client.getByUID("blog", slug);
  return {
    title: blog.data.title,
    description: blog.data.excerpt,
  };
}

export default async function Blog({ params }: Props) {
  const { slug } = await params;
  const client = createClient();
  const blog = await client.getByUID("blog", slug);
  return <BlogInfomation blog={blog} />;
}
