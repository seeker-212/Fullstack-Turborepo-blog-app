import { Post } from "@/lib/types/modelTypes";
import Image from "next/image";
import Link from "next/link";

type Props = Partial<Post>;

const PostCard = ({
  id,
  title,
  slug,
  thumbnail,
  content,
  createdAt,
}: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="relative h-60">
        <Image
          src={thumbnail ?? "/no-image.jpg"}
          alt={title ?? ""}
          fill
        ></Image>
      </div>
      <div className="p-6 grow flex flex-col">
        <h3 className="text-lg font-bold mt-4 wrap-break-word text-center text-gray-600">
          {title}
        </h3>

        <p className="mt-2 text-gray-400 text-sm">
          {new Date(createdAt ?? "").toDateString()}
        </p>

        <p className="mt-4 text-gray-700 wrap-break-word">
          {content?.slice(0, 100)}...
        </p>
        <Link
          className="text-indigo-600 hover:underline mt-auto block text-right"
          href={`/blog/${slug}/${id}`}
        >
          Read More...
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
