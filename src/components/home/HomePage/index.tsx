import Image from "next/image";
import Link from "next/link";
import { BlogDocument } from "../../../../prismicio-types";
import styles from "./HomePage.module.css";

export default function HomePage(props: { blogs: BlogDocument<string>[] }) {
  const { blogs } = props;
  return (
    <div className="grid grid-cols-4 gap-4">
      {blogs.map((blog) => (
        <div key={blog.uid} className="border">
          <Link className="font-bold text-4xl" href={`/blog/${blog.uid}`}>
            {blog.data.title}
          </Link>
          <p>{blog.data.excerpt}</p>
          {blog.data?.image?.url && (
            <Image
              src={blog.data?.image?.url || ""}
              alt=""
              width={500}
              height={350}
            />
          )}
        </div>
      ))}
      {/* <div className={styles.heroSection}>
        <Slider />
        <div className={styles.heroSectionLabel}>
          <p>
            Blog <span>Website</span>
          </p>
          <button>Explore more</button>
        </div>
      </div>
      <div>
        <Blogs />
      </div> */}
    </div>
  );
}
