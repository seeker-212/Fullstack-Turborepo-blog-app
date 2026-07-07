import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

type Props = {
  postId: number;
};

const PostActions = ({ postId }: Props) => {
  return (
    <div className="flex justify-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/user/posts/${postId}/update`}
              className="rounded bg-blue-600 px-3 py-2 text-sm text-white transition hover:bg-blue-700"
            >
              <PencilIcon className="w-4" />
            </Link>
          </TooltipTrigger>
          <TooltipContent className="bg-blue-600 text-white">
            <p>Update This Post</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/user/posts/${postId}/delete`}
              className="rounded bg-red-600 px-3 py-2 text-sm text-white transition hover:bg-red-700"
            >
              <TrashIcon className="w-4" />
            </Link>
          </TooltipTrigger>

          <TooltipContent className="bg-red-500 text-white">
            <p>Delete Post</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default PostActions;
