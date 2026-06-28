"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/SignUpButton";
import { useActionState } from "react";
import { signIn } from "@/lib/actions/auth";

const SignInForm = () => {
  const [state, action] = useActionState(signIn, undefined);
  return (
    <form action={action} className="flex flex-col gap-2">
      {!!state?.message && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          defaultValue={state?.data.email}
          id="email"
          name="email"
          placeholder="John@Example.com"
          type="email"
        />
      </div>
      {!!state?.errors?.email && (
        <p className="text-red-500 text-sm">{state.errors.email}</p>
      )}

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          defaultValue={state?.data.password}
          id="password"
          name="password"
          type="password"
        />
      </div>
      {!!state?.errors?.password && (
        <p className="text-red-500 text-sm">{state.errors.password}</p>
      )}

      <SubmitButton>Sign In</SubmitButton>
    </form>
  );
};

export default SignInForm;
