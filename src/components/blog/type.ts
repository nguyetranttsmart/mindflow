import { IAuthor } from "@/components/author/type";
export type IBlog = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  authors: IAuthor[];
  tags: string[];
  category: string;
  content: string;
};
