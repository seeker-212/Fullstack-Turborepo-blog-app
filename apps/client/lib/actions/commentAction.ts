"use server";

import { authFetchGraphQL, fetchGraphQl } from "../fetchGraphQl";
import { print } from "graphql";
import { CREATE_COMMENT_MUTATION, GET_POST_COMMENTS } from "../gqlQueries";
import { CommentEntity } from "../types/modelTypes";
import { CreateCommentFormState } from "../types/formState";
import { CommentFormSchema } from "../zodSchema/commentFormSchema";

export async function getPostComment({
  postId,
  skip,
  take,
}: {
  postId: number;
  skip: number;
  take: number;
}) {
  const data = await fetchGraphQl(print(GET_POST_COMMENTS), {
    postId,
    take,
    skip,
  });

  return {
    comments: data.getPostComment as CommentEntity[],
    count: data.postCommentCount as number,
  };
}

export async function saveComment(
  state: CreateCommentFormState,
  formData: FormData,
): Promise<CreateCommentFormState> {
  const validateField = CommentFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validateField.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validateField.error.flatten().fieldErrors,
    };

  const data = await authFetchGraphQL(print(CREATE_COMMENT_MUTATION), {
    input: {
      ...validateField.data,
    },
  });

  if (data)
    return {
      message: "Success! Your Comment Saved",
      ok: true,
      open: false,
    };

  return {
    message: "Oops! Something Went Wrong",
    ok: false,
    open: true,
    data: Object.fromEntries(formData.entries()),
  };
}
