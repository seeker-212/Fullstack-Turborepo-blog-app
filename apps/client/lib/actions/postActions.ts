"use server";

import { print } from "graphql";
import { authFetchGraphQL, fetchGraphQl } from "../fetchGraphQl";
import {
  CREATE_POST_MUTATION,
  DELETE_POST_MUTATION,
  GET_POST_BY_ID,
  GET_POSTS,
  GET_USER_POSTS,
  UPDATE_POST_MUTATION,
} from "../gqlQueries";
import { Post } from "../types/modelTypes";
import { transformTakeSkip } from "../helper";
import { PostFormState } from "../types/formState";
import { PostFormSchema } from "../zodSchema/postFormSchema";
import { uploadThumbnail } from "../upload";

export const fetchPosts = async ({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}) => {
  const { skip, take } = transformTakeSkip({ page, pageSize });

  console.log({ page, skip, take });

  const data = await fetchGraphQl(print(GET_POSTS), { skip, take });

  return { posts: data.posts as Post[], totalPosts: data.postCount };
};

export const fetchPostById = async (id: number) => {
  const data = await fetchGraphQl(print(GET_POST_BY_ID), { id });

  return data.getPostById as Post;
};

export async function fetchUserPosts({
  userId,
  page,
  pageSize,
}: {
  userId?: number;
  page?: number;
  pageSize?: number;
}) {
  const { take, skip } = transformTakeSkip({ page, pageSize });
  const data = await authFetchGraphQL(print(GET_USER_POSTS), {
    take,
    skip,
  });

  return {
    posts: data.getUsersPosts as Post[],
    totalPosts: data.userPostCount as number,
  };
}

//Create New post
export async function saveNewPost(
  state: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const validatedFields = PostFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };

  //TODO: Upload thumbnail to supabase
  let thumbnailUrl = "";
  if (validatedFields.data.thumbnail) {
    thumbnailUrl = await uploadThumbnail(validatedFields.data.thumbnail);
  }

  //Call graphQl Api
  const data = await authFetchGraphQL(print(CREATE_POST_MUTATION), {
    input: {
      ...validatedFields.data,
      thumbnail: thumbnailUrl,
    },
  });
  if (data) return { message: "Success! New Post Saved", ok: true };
  return {
    message: "Oops, Something Went Wrong!",
    data: Object.fromEntries(formData.entries()),
  };
}

//Update Post
export async function updatePost(
  state: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const validatedFields = PostFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Check if thumbnail have been changed
  const { thumbnail, ...inputs } = validatedFields.data;
  let thumbnailUrl = "";
  if (thumbnail) {
    thumbnailUrl = await uploadThumbnail(thumbnail);
  }

  const data = await authFetchGraphQL(print(UPDATE_POST_MUTATION), {
    input: {
      ...inputs,
      ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
    },
  });

  if (data) return { message: "Success! Post Updated", ok: true };
  return {
    message: "Oops, Something Went Wrong!",
    data: Object.fromEntries(formData.entries()),
  };
}

//DELETE USER POST
export async function deletePost(postId: number) {
  const data = await authFetchGraphQL(print(DELETE_POST_MUTATION), {
    postId,
  });
  return data.deletePost;
}
