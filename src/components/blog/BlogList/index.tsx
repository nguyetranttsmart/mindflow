import React from "react";
import styles from "./BlogList.module.css";
import Link from "next/link";
import BlogItem from "@/components/blog/BlogItem";
import Image from "next/image";
import { BlogDocument } from "../../../../prismicio-types";
import { isFilled } from "@prismicio/client";

export default function Blogs({ blogs }: { blogs: BlogDocument<string>[] }) {
  return (
    <div className={styles.blogSection}>
      {blogs.map((blog) => (
        <Link href={`/blog/${blog.uid}`} key={blog.uid}>
          <BlogItem blog={blog} />
        </Link>
      ))}
    </div>
  );
}
