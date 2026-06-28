"use server";

import { redirect } from "next/navigation";
import { fetchGraphQl } from "../fetchGraphQl";
import { CREATE_USER_MUTATION, SIGN_IN_MUTATION } from "../gqlQueries";
import { SignUpFormState } from "../types/formState";
import { SignUpFormSchema } from "../zodSchema/signUpFormSchema";
import { print } from "graphql";
import { LoginFormSchema } from "../zodSchema/loginFormSchema";
import { revalidatePath } from "next/cache";
import { createSession } from "../session";

export async function signUp(
  state: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> {
  const validatedField = SignUpFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedField.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedField.error.flatten().fieldErrors,
    };

  const data = await fetchGraphQl(print(CREATE_USER_MUTATION), {
    input: {
      ...validatedField.data,
    },
  });

  if (data.errors)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: {},
      message: "Something Went Wrong",
    };
  redirect("/auth/signin");
}

export async function signIn(
  state: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> {
  const validatedFields = LoginFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const data = await fetchGraphQl(print(SIGN_IN_MUTATION), {
    input: {
      ...validatedFields.data,
    },
  });

  if (data.errors) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: {},
      message: "Invalid Credentials",
    };
  }
  await createSession({
    user: {
      id: data.signIn.id,
      name: data.signIn.name,
      avatar: data.signIn.avatar,
    },
    accessToken: data.signIn.accessToken,
  });
  revalidatePath("/");
  redirect("/");
}
