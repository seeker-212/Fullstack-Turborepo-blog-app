import { Post } from "@/lib/types/modelTypes";
import PostListItem from "./PostListItem";
import Pagination from "@/components/Pagination";

type Props = {
  posts: Post[];
  currentPages: number;
  totalPages: number;
};

const PostList = ({ posts, currentPages, totalPages }: Props) => {
  return (
    <div className="m-3 overflow-x-auto rounded-lg border bg-white shadow">
      <table className="w-full table-auto">
        <thead className="border-b bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">Post</th>
            <th className="px-4 py-3 text-center font-semibold">Date</th>
            <th className="px-4 py-3 text-center font-semibold">Published</th>
            <th className="px-4 py-3 text-center font-semibold">Likes</th>
            <th className="px-4 py-3 text-center font-semibold">Comments</th>
            <th className="px-4 py-3 text-center font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </tbody>
      </table>
      <Pagination {...{ currentPages, totalPages }} className="my-4" />
    </div>
  );
};

export default PostList;
