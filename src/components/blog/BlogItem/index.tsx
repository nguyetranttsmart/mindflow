import React from "react";
import styles from "./BlogItem.module.css";
import Image from "next/image";
import { BlogDocument } from "../../../../prismicio-types";
import { isFilled } from "@prismicio/client";

export default function BlogItem({ blog }: { blog: BlogDocument<string> }) {
  return (
    <div className={styles.blog}>
      <div className={styles.blogImage}>
        {blog.data?.image?.url && (
          <Image
            src={blog.data?.image?.url || ""}
            alt="blogImage"
            style={{ objectFit: "cover" }}
            quality={100}
            fill
          />
        )}
      </div>
      <div className={styles.blogContent}>
        <div className={styles.blogLabel}>
          <div className={styles.authorAvatar}>
            <Image
              src={
                (isFilled.contentRelationship(blog.data.authors) &&
                  blog.data.authors.data?.avatar.url) ||
                "unknown"
              }
              width={50}
              height={50}
              alt="authorAvatar"
              style={{ borderRadius: "50%" }}
            />
          </div>

          <div className={styles.blogMeta}>
            <p className={styles.authorName}>
              {(isFilled.contentRelationship(blog.data.authors) &&
                blog.data.authors.data?.name) ||
                "unknown"}
            </p>
            <p className={styles.releaseDay}>
              {blog.data.date
                ? new Date(blog.data.date).toLocaleString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A"}
            </p>
          </div>
        </div>
        <div className={styles.blogSubContent}>
          <div className={styles.blogTitle}>
            <p>{blog.data.title}</p>
          </div>
          <div className={styles.blogExpert}>
            <span>{blog.data.excerpt}</span>
          </div>
        </div>
        <hr className={styles.bottomLine} />
      </div>
    </div>
  );
}
