import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deletePost, fetchPostById } from "@/lib/actions/postActions";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import SubmitButton from "@/components/SignUpButton";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const page = async (props: Props) => {
  const params = await props.params;
  const post = await fetchPostById(+params.id);

  const formAction = async (formData: FormData) => {
    "use server";
    await deletePost(+params.id);
    redirect("/user/posts");
  };
  return (
    <Card className="w-96 mt-12 px-6 py-6">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <p className="text-red-500">Delete This Post</p>
          <ExclamationCircleIcon className="w-8 text-red-500" />
        </CardTitle>
      </CardHeader>
      <CardDescription>
        <p>
          This action cannot be undone, This will permanently delete your post
          from our server.
        </p>
        <hr className="m-3" />
        <p className="text-slate-500 font-bold">Title Of The Post</p>
        <p>{post.title}</p>
      </CardDescription>
      <CardContent>
        <form action={formAction} className="flex justify-end gap-2">
          <Button variant={"secondary"} asChild>
            <Link href={"/user/posts"}>Cancel</Link>
          </Button>
          <SubmitButton variant={"destructive"}>Delete</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
};

export default page;
