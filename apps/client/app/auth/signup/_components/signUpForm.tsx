"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SignUpButton from "@/components/SignUpButton";
import { useActionState } from "react";
import { signUp } from "@/lib/actions/auth";

const signUpForm = () => {
  const [state, action] = useActionState(signUp, undefined);
  return (
    <form action={action} className="flex flex-col gap-2">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="John Deo" />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" placeholder="John@Example.com" />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
      </div>

      <SignUpButton>SignUp</SignUpButton>
    </form>
  );
};

export default signUpForm;
