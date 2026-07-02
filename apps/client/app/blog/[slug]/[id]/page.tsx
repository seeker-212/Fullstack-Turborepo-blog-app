import { fetchPostById } from "@/lib/actions/postActions";
import Image from "next/image";
import SanitizeContent from "./_component/sanitizeContent";
import Comments from "./_component/comments";
import { getSession } from "@/lib/session";

type Props = {
  params: {
    id: string;
  };
};

const PostPage = async ({ params }: Props) => {
  const postId = (await params).id;
  const post = await fetchPostById(+postId);
  const session = await getSession();

  return (
    <main className="container mx-2 px-2 py-8 mt-25">
      <h1 className="text-4xl font-bold mb-4 text-slate-700">{post.title}</h1>
      <p className="text-slate-500 text-sm mb-4">
        By {post.author.name} | {new Date(post.createdAt).toDateString()}
      </p>

      <div className="relative w-80 h-60">
        <Image
          src={post.thumbnail ?? "/no-image.jpg"}
          alt={post.title}
          fill
          className="rounded-md object-cover"
        />
      </div>

      <SanitizeContent content={post.content} />

      {/*TODO:  POST COMMENT here */}
      <Comments user={session?.user} postId={post.id} />
    </main>
  );
};

export default PostPage;
