import React from "react";
import styles from "./Categories.module.css";
import { CategoriesDocument } from "../../../prismicio-types";
import Link from "next/link";

export default function Categories({
  categories,
}: {
  categories: CategoriesDocument<string>[];
}) {
  return (
    <div className={styles.categoryList}>
      {categories.map((category) => (
        <Link
          href={`/category/${category.uid}`}
          key={category.uid}
          className={styles.categoryItem}
        >
          {category.data.name}
        </Link>
      ))}
    </div>
  );
}
