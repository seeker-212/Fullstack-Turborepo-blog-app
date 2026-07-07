"use client";

import SubmitButton from "@/components/SignUpButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PostFormState } from "@/lib/types/formState";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  state: PostFormState;
  formAction: (payload: FormData) => void;
};

const UpsertPostForm = ({ state, formAction }: Props) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!state) return;

    if (state.ok) {
      toast.success(state.message ?? "Post saved successfully!");
    } else if (state.message) {
      toast.error(state.message ?? "Oops! Something went wrong.");
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-5 [&>div>label]:text-slate-500 [&>div>input]:transition
    [&>div>textarea]:transition"
    >
      <input hidden name="postId" defaultValue={state?.data?.postId} />
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter the title of your post"
          defaultValue={state?.data?.title}
        />
      </div>
      {!!state?.errors?.title && (
        <p className="text-red-500 animate-shake">{state.errors.title}</p>
      )}

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write your post content here"
          rows={6}
          defaultValue={state?.data?.content}
        />
      </div>
      {!!state?.errors?.content && (
        <p className="text-red-500 animate-shake">{state.errors.content}</p>
      )}

      <div>
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input
          id="thumbnail"
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (!file) {
              setImageUrl("");
              return;
            }

            if (imageUrl) {
              URL.revokeObjectURL(imageUrl);
            }

            setImageUrl(URL.createObjectURL(file));
          }}
        />
        {!!state?.errors?.thumbnail && (
          <p className="text-red-500 animate-shake">{state.errors.thumbnail}</p>
        )}

        {(!!imageUrl || !!state?.data?.previousThumbnailUrl) && (
          <Image
            src={(imageUrl || state?.data?.previousThumbnailUrl) ?? ""}
            alt="Post thumbnail preview"
            width={200}
            height={150}
            className="mt-3 rounded-md border object-cover"
          />
        )}
      </div>

      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          name="tags"
          placeholder="Enter tags (comma-separated)"
          defaultValue={state?.data?.tags}
        />
      </div>
      {!!state?.errors?.tags && (
        <p className="text-red-500 animate-shake">{state.errors.tags}</p>
      )}

      <div className="flex items-center gap-2">
        <Input
          id="published"
          type="checkbox"
          name="published"
          className="h-4 w-4"
          defaultChecked={state?.data?.published === "on" ? true : false}
        />
        <Label htmlFor="published">Publish Now</Label>
      </div>
      {!!state?.errors?.published && (
        <p className="text-red-500 animate-shake">{state.errors.published}</p>
      )}

      <SubmitButton>Save</SubmitButton>
    </form>
  );
};

export default UpsertPostForm;
