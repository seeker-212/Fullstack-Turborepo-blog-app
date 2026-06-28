import Link from "next/link";

const SignInPanel = () => {
  return (
    <>
      <Link className="text-center" href={"/auth/signin"}>
        Sign In
      </Link>
      <Link className="text-center" href={"/auth/signup"}>
        Sign Up
      </Link>
    </>
  );
};

export default SignInPanel;
