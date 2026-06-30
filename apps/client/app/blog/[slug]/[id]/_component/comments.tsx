"use client";

import { getPostComment } from "@/lib/actions/commentAction";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CommentCard from "./commentCard";

type Props = {
  postId: number;
};

const Comments = ({ postId }: Props) => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["GET_POST_COMMENTS", postId, page],
    queryFn: async () =>
      await getPostComment({
        postId,
        skip: page * DEFAULT_PAGE_SIZE,
        take: DEFAULT_PAGE_SIZE,
      }),
  });
  return (
    <div className="p-2 rounded-md shadow-md">
      <h6 className="text-lg text-slate-700">Comments</h6>
      <div className="flex flex-col gap-4">
        {data?.comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
