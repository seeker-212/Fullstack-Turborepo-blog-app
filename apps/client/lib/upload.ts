import { createClient } from "@supabase/supabase-js";

export async function uploadThumbnail(image: File) {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supaBaseKey = process.env.SUPABASE_API_KEY!;

  const supabase = createClient(supabaseUrl, supaBaseKey);

  const data = await supabase.storage
    .from("thumbnail")
    .upload(`${image.name}_${Date.now()}`, image);

  if (!data.data?.path) {
    throw new Error("failed to upload file");
  }

  const urlData = await supabase.storage
    .from("thumbnail")
    .getPublicUrl(data.data?.path);

  return urlData.data.publicUrl;
}
