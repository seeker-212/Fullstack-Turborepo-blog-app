"use client";
import {
  getPostLikeData,
  likePost,
  unLikePost,
} from "@/lib/actions/likeAction";
import { SessionUser } from "@/lib/session";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery } from "@tanstack/react-query";

type Props = {
  postId: number;
  user?: SessionUser;
};

const Like = (props: Props) => {
  const { data, refetch: refetchPostLikeData } = useQuery({
    queryKey: ["GET_POST_LIKES_DATA", props.postId],
    queryFn: async () => await getPostLikeData(props.postId),
  });

  const likeMutation = useMutation({
    mutationFn: () => likePost(props.postId),
    onSuccess: () => refetchPostLikeData(),
  });

  const unLikeMutation = useMutation({
    mutationFn: () => unLikePost(props.postId),
    onSuccess: () => refetchPostLikeData(),
  });
  return (
    <div className="mt-3 flex items-center justify-start gap-2 ">
      {data?.userLikedPost ? (
        <button
          onClick={() => unLikeMutation.mutate()}
          className="w-6 text-rose-600 cursor-pointer"
        >
          <SolidHeartIcon />
        </button>
      ) : (
        <button
          onClick={() => likeMutation.mutate()}
          className="w-6 cursor-pointer "
        >
          <HeartIcon />
        </button>
      )}

      <p className="text-slate-600">{data?.likeCount} likes</p>
    </div>
  );
};

export default Like;
