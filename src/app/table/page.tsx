import { DataTable } from "@/components/data-table/data-table";
import React from "react";
import { BlogTable, columns } from "./columns";
import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";

export default async function Table() {
  const client = createClient();
  const blogs = await client.getAllByType("blog");

  const tableData: BlogTable[] = blogs.map((blog) => ({
    uid: blog.uid || "",
    title: blog.data.title || "",
    date: blog.data.date || "",
    author:
      (isFilled.contentRelationship(blog.data.authors) &&
        blog.data.authors.data?.name) ||
      "unknown",
    category:
      (isFilled.contentRelationship(blog.data.category) &&
        blog.data.category.data?.name) ||
      "uncategorized",
  }));

  return (
    <div className="mt-20 px-10">
      <h1 className="text-5xl">Blog Table</h1>
      <div>
        <DataTable columns={columns} data={tableData} />
      </div>
    </div>
  );
}
