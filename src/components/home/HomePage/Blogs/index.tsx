import React from "react";
import styles from "./Blogs.module.css";
import { blogs } from "@/data/blogs";
import Link from "next/link";
import BlogItem from "@/components/blog/BlogItem";

export default function Blogs() {
  return (
    <div className={styles.blogSection}>
      {blogs.map((blog) => (
        <Link href={`/blog/${blog.slug}`} key={blog.slug}>
          <BlogItem blog={blog} />
        </Link>
      ))}
    </div>
  );
}
