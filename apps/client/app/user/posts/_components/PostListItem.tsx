import { Post } from "@/lib/types/modelTypes";
import Image from "next/image";
import PostActions from "./postActions";

type Props = {
  post: Post;
};

const PostListItem = ({ post }: Props) => {
  return (
    <tr className="border-b transition hover:bg-slate-50">
      <td className="px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-md">
            <Image
              src={post.thumbnail || "/no-image.jpg"}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <h3 className="line-clamp-1 font-semibold text-slate-800">
              {post.title}
            </h3>

            <p className="mt-1 line-clamp-2 text-sm text-slate-500">
              {post.content}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-4 text-center">
        {new Date(post.createdAt).toLocaleDateString()}
      </td>

      <td className="px-4 py-4 text-center">
        {post.published ? (
          <span className="rounded bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            Yes
          </span>
        ) : (
          <span className="rounded bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
            No
          </span>
        )}
      </td>

      <td className="px-4 py-4 text-center">{post._count.likes ?? 0}</td>

      <td className="px-4 py-4 text-center">{post._count.comments ?? 0}</td>

      <td className="px-4 py-4 text-center">
        <PostActions postId={post.id} />
      </td>
    </tr>
  );
};

export default PostListItem;
