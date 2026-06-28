"use server";

import { redirect } from "next/navigation";
import { fetchGraphQl } from "../fetchGraphQl";
import { CREATE_USER_MUTATION } from "../gqlQueries";
import { SignUpFormState } from "../types/formState";
import { SignUpFormSchema } from "../zodSchema/signUpFormSchema";
import { print } from "graphql";

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
