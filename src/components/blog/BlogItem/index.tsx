import React from "react";
import styles from "./BlogItem.module.css";
import Image from "next/image";
import { IBlog } from "@/components/blog/type";

export default function BlogItem({ blog }: { blog: IBlog }) {
  return (
    <div className={styles.blog}>
      <div className={styles.blogImage}>
        <Image
          src={blog.coverImage}
          alt="blogImage"
          style={{ objectFit: "cover" }}
          quality={100}
          fill
        />
      </div>
      <div className={styles.blogContent}>
        <div className={styles.blogLabel}>
          <div className={styles.authorAvatar}>
            <Image
              src={blog.authors[0]?.avatar || "/images/default.jpg"}
              alt="authorAvatar"
              width={40}
              height={40}
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div className={styles.blogMeta}>
            <div className={styles.authorName}>
              {blog.authors[0]?.name || "unknown"}
            </div>
            <div className={styles.releaseDay}>{blog.date}</div>
          </div>
        </div>
        <div className={styles.blogSubContent}>
          <div className={styles.blogTitle}>
            <p>{blog.title}</p>
          </div>
          <div className={styles.blogExpert}>
            <span>{blog.excerpt}</span>
          </div>
        </div>
        <hr className={styles.bottomLine} />
      </div>
    </div>
  );
}
