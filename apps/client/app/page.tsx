import Posts from "@/components/Posts";
import Hero from "../components/hero";
import { fetchPosts } from "@/lib/actions/postActions";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  const { totalPosts, posts } = await fetchPosts({
    page: page ? +page : undefined,
  });
  return (
    <main>
      <Hero />
      <Posts posts={posts} />
    </main>
  );
}
