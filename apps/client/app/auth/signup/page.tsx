import Link from "next/link";

const SignUpPage = () => {
  return (
    <div
      className="bg-white p-8 rounded-md shadow-md w-96 flex flex-col justify-center
    items-center"
    >
      <h2 className="text-center text-2xl font-bold mb-4">Sign Up</h2>

      {/* SIGN UP FORM HERE */}

      <div>
        <p>Already have an account</p>
        <Link className="underline" href={"/auth/signin"}>
          signIn
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
