import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.prismic.io"], // 👈 thêm domain Prismic vào đây
  },
};
export default nextConfig;
