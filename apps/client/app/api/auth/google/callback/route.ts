import { BACKEND_URL } from "@/lib/constants";
import { createSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const accessToken = searchParams.get("accessToken");
  const userId = searchParams.get("userId");
  const name = searchParams.get("name");
  const avatar = searchParams.get("avatar");

  if (!accessToken || !userId || !name || !avatar) {
    throw new Error("Google auth failed!");
  }

  const res = await fetch(`${BACKEND_URL}/auth/verify-token`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 401) {
    throw new Error("Verification failed.");
  }

  await createSession({
    user: {
      id: userId,
      name,
      avatar,
    },
    accessToken,
  });

  return NextResponse.redirect(new URL("/", req.url));
}
