import Image from "next/image";
import Link from "next/link";
import { BlogDocument, HomepageDocument } from "../../../../prismicio-types";
import styles from "./HomePage.module.css";
import Slider from "./Slider";
import Blogs from "../../blog/BlogList";

export default function HomePage(props: {
  blogs: BlogDocument<string>[];
  homepage: HomepageDocument;
}) {
  const { blogs, homepage } = props;
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
      <div className={styles.blogList}>
        <Blogs blogs={blogs} />
      </div>
    </div>
  );
}
