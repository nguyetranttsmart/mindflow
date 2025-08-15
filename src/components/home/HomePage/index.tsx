"use client";
import {
  BlogDocument,
  CategoriesDocument,
  HomepageDocument,
} from "../../../../prismicio-types";
import styles from "./HomePage.module.css";
import Slider from "./Slider";
import Blogs from "../../blog/BlogList";
import Categories from "@/components/categories";
import { useEffect, useRef } from "react";

export default function HomePage(props: {
  blogs: BlogDocument<string>[];
  categories: CategoriesDocument<string>[];
  homepage: HomepageDocument;
  query: string;
}) {
  const { blogs, categories, homepage, query } = props;
  const banners = homepage.data.banners;
  const handleExploreClick = () => {
    window.scrollBy({ top: 900, behavior: "smooth" });
  };
  useEffect(() => {
    if (query) {
      window.scrollBy({ top: 900, behavior: "auto" });
    }
  }, [query]);
  return (
    <div className={styles.homePage}>
      <div className={styles.heroSection}>
        <Slider banners={banners} />
        <div className={styles.heroSectionLabel}>
          <p>
            Blog <span>Website</span>
          </p>
          <button onClick={handleExploreClick}>Explore more</button>
        </div>
      </div>
      <div className={styles.categoryList}>
        <Categories categories={categories} />
      </div>
      <div className={styles.blogList}>
        {blogs.length > 0 ? (
          <Blogs blogs={blogs} />
        ) : (
          <p className="text-center mt-5 text-2xl">No blog availale :v</p>
        )}
      </div>
    </div>
  );
}
