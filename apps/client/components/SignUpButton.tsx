"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type SignUpButtonProps = React.ComponentProps<typeof Button>;

const SubmitButton = ({ children, ...props }: SignUpButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} {...props}>
      {pending ? <span className="animate-pulse"></span> : children}
    </Button>
  );
};

export default SubmitButton;
