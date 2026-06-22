import Posts from "@/components/Posts";
import Hero from "../components/hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <Posts posts={[]} />
    </main>
  );
}
