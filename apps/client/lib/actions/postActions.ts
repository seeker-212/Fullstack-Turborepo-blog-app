"use server";

import { print } from "graphql";
import { fetchGraphQl } from "../fetchGraphQl";
import { GET_POSTS } from "../gqlQueries";
import { Post } from "../types/modelTypes";

export const fetchPosts = async () => {
  const data = await fetchGraphQl(print(GET_POSTS));

  return data.posts as Post[];
};
