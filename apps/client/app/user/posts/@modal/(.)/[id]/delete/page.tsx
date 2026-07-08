"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/lib/actions/postActions";
import Link from "next/link";
import React, { use } from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const InterceptDeletePage = (props: Props) => {
  const params = use(props.params);
  const postId = parseInt(params.id);
  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete This Post</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone, This will permanently delete your post
            from our server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <a href={"/user/posts"}>Cancel</a>
          </AlertDialogCancel>
          <AlertDialogAction>
            <Button variant={"destructive"} onClick={() => deletePost(postId)}>
              <a href="/user/posts">Delete</a>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InterceptDeletePage;
