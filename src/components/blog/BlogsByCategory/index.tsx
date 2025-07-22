import { isFilled } from '@prismicio/client'
import Image from 'next/image'
import Link from 'next/link'
import { BlogDocument } from '../../../../prismicio-types'



export default function BlogsByCategory({ blogs }: { blogs: BlogDocument<string>[] }) {
  return (
    <div className='grid gap-5 mt-20 mx-auto p-2.5 max-w-[1200px] max-2xl:[grid-template-columns:repeat(auto-fit,minmax(300px,1fr))] max-2xl:[grid-auto-rows:250px ]'>

      {blogs.map((blog) => (
        <Link href={`/blog/${blog.uid}`} key={blog.uid}>
          <div className=' relative w-[100%] h-50' >
            <div className='relative z-1 w-[100%] h-[100%] brightness-50 '>
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
            <div className='absolute bottom-0 z-2 flex flex-col gap-5 p-2.5'>
              <div className='text-2xl'>{blog.data.title}</div>
              <div className='flex gap-5'>
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
                <div className='flex flex-col gap-1 text-gray-300'>
                  <p className=' text-lg'>{(isFilled.contentRelationship(blog.data.authors) && blog.data.authors.data?.name)}</p>
                  {blog.data.date && (
                    <p>{blog.data.date
                      ? new Date(blog.data.date).toLocaleString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                      : "N/A"}</p>

                  )}
                </div>
              </div>
            </div>

          </div>
          <hr className='w-[100%]' />
        </Link>
      ))}

    </div>
  )
}