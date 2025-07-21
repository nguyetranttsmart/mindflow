import Image from "next/image";
import Link from "next/link";
import {
  BlogDocument,
  CategoriesDocument,
  HomepageDocument,
} from "../../../../prismicio-types";
import styles from "./HomePage.module.css";
import Slider from "./Slider";
import Blogs from "../../blog/BlogList";
import Categories from "@/components/categories";

export default function HomePage(props: {
  blogs: BlogDocument<string>[];
  categories: CategoriesDocument<string>[];
  homepage: HomepageDocument;
}) {
  const { blogs, categories, homepage } = props;
  const banners = homepage.data.banners;
  return (
    <div className={styles.homePage}>
      <div className={styles.heroSection}>
        <Slider banners={banners} />
        <div className={styles.heroSectionLabel}>
          <p>
            Blog <span>Website</span>
          </p>
          <button>Explore more</button>
        </div>
      </div>
      <div className={styles.categoryList}>
        <Categories categories={categories} />
      </div>
      <div className={styles.blogList}>
        <Blogs blogs={blogs} />
      </div>
    </div>
  );
}
