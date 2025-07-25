"use client";
import { isFilled } from "@prismicio/client";
import Image from "next/image";
import Link from "next/link";
import { BlogDocument } from "../../../../prismicio-types";

export default function FilteredBlogs({
  blogs,
  label,
}: {
  blogs: BlogDocument<string>[];
  label?: string | null;
}) {
  return (
    <div className=" mx-auto h-auto">
      <div className="relative w-full h-[100vh] overflow-hidden brightness-50">
        <iframe
          src="https://player.vimeo.com/video/103684916?background=1&autoplay=1&loop=1&byline=0&title=0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute top-1/2 left-1/2 w-[200vh] h-[110vh] -translate-x-1/2 -translate-y-1/2"
        ></iframe>
      </div>
      <h1 className="text-center text-3xl md:text-5xl mt-20">
        All Blogs Of <b className="md:text-6xl">{label}</b>
      </h1>
      <div className="grid gap-5  p-2.5 w-full md:max-w-[1200px] mx-auto mt-5 [grid-template-columns:repeat(auto-fit,minmax(400px,1fr))] [grid-auto-rows:250px ]">
        {blogs.map((blog) => (
          <div key={blog.uid}>
            <Link href={`/blog/${blog.uid}`}>
              <div className=" relative w-[100%] h-50 hover:scale-[1.01] transition ">
                <div className="relative z-10 w-[100%] h-[100%] brightness-50 ">
                  {blog.data?.image?.url && (
                    <Image
                      src={blog.data?.image?.url || ""}
                      alt="blogImage"
                      style={{ objectFit: "cover" }}
                      quality={100}
                      fill
                      priority
                    />
                  )}
                </div>
                <div className="absolute bottom-0 z-20 flex flex-col gap-5 p-2.5">
                  <div className="text-2xl">{blog.data.title}</div>
                  <div className="flex gap-5">
                    <div>
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

                    <div className="flex flex-col gap-1 text-gray-300">
                      <p className=" text-lg">
                        {isFilled.contentRelationship(blog.data.authors) &&
                          blog.data.authors.data?.name}
                      </p>
                      {blog.data.date && (
                        <p>
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
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
