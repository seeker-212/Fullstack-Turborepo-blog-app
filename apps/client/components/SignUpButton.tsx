import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

const SignUpButton = ({
  children,
  ...props
}: React.ComponentProps<"button">) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} {...props}>
      {pending ? <span className="animate-pulse"></span> : children}
    </Button>
  );
};

export default SignUpButton;
