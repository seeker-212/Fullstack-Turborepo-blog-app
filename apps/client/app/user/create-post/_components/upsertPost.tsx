"use client";

import SubmitButton from "@/components/SignUpButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {};

const UpsertPostForm = ({}: Props) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <form
      className="flex flex-col gap-5 [&>div>label]:text-slate-500 [&>div>input]:transition
    [&>div>textarea]:transition"
    >
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter the title of your post"
        />
      </div>

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write your post content here"
          rows={6}
        />
      </div>

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

        {imageUrl && (
          <Image
            src={imageUrl}
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
        />
      </div>

      <div className="flex items-center gap-2">
        <Input
          id="published"
          type="checkbox"
          name="published"
          className="h-4 w-4"
        />
        <Label htmlFor="published">Publish Now</Label>
      </div>

      <SubmitButton>Save</SubmitButton>
    </form>
  );
};

export default UpsertPostForm;
