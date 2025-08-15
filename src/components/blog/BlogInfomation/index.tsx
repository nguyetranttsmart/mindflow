"use client";
import { isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { BlogDocument } from "../../../../prismicio-types";
import styles from "./BlogInfomation.module.css";
export default function BlogInfomation({
  blog,
}: {
  blog: BlogDocument<string>;
}) {
  if (!blog) return notFound();
  const router = useRouter();

  return (
    <div className={styles.blogInfomation}>
      <div className={styles.blog}>
        <div className={styles.blogHeader}>
          <div
            className={styles.authorAvatar}
            onClick={() => {
              const author = blog.data.authors;
              if (isFilled.contentRelationship(author)) {
                router.push(`/author/${author.uid}`);
              }
            }}
          >
            <Image
              src={
                (isFilled.contentRelationship(blog.data.authors) &&
                  blog.data.authors.data?.avatar.url) ||
                "unknown"
              }
              width={60}
              height={60}
              alt="authorAvatar"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div className={styles.blogMeta}>
            <p
              className={styles.authorName}
              onClick={() => {
                const author = blog.data.authors;
                if (isFilled.contentRelationship(author)) {
                  router.push(`/author/${author.uid}`);
                }
              }}
            >
              {(isFilled.contentRelationship(blog.data.authors) &&
                blog.data.authors.data?.name) ||
                "unknown"}
            </p>
            <p className={styles.releaseDay}>
              {" "}
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
        <div className={styles.blogMainContent}>
          <div className={styles.blogTitle}>
            <p>{blog.data.title}</p>
          </div>
          <div className={styles.blogExcerpt}>
            <p>{blog.data.excerpt}</p>
          </div>
          <div className={styles.blogImage}>
            {blog.data?.image?.url && (
              <Image
                src={blog.data?.image?.url || ""}
                alt="blogImage"
                style={{ objectFit: "cover" }}
                quality={100}
                priority
                fill
              />
            )}
          </div>
          <div className={styles.blogContent}>
            <PrismicRichText field={blog.data.content} />
          </div>
        </div>
      </div>
    </div>
  );
}
