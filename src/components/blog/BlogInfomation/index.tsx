import { PrismicRichText } from "@prismicio/react";
import { notFound } from "next/navigation";
import { BlogDocument } from "../../../../prismicio-types";
import styles from "./BlogInfomation.module.css";

export default function BlogInfomation({
  blog,
}: {
  blog: BlogDocument<string>;
}) {
  if (!blog) return notFound();
  return (
    <div className={styles.blogInfomation}>
      <p>{blog.data.title}</p>
      <PrismicRichText field={blog.data.content} />
      {/* <div className={styles.blogHeader}>
        <div className={styles.authorAvatar}>
          <Image
            src="/images/blog1.jpg"
            width={60}
            height={60}
            alt="authorAvatar"
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div className={styles.blogMeta}>
          <p className={styles.authorName}>
            {blog.authors[0].name || "unknown"}
          </p>
          <p className={styles.releaseDay}>{blog.date}</p>
        </div>
      </div>
      <div className={styles.blogMainContent}>
        <div className={styles.blogTitle}>
          <p>{blog.title}</p>
        </div>
        <div className={styles.blogExcerpt}>
          <p>{blog.excerpt}</p>
        </div>
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
          <p>{blog.content}</p>
        </div>
      </div> */}
    </div>
  );
}
