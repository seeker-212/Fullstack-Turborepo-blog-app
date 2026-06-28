import { getSession } from "@/lib/session";
import Link from "next/link";
import SignInPanel from "./SignInPanel";
import Profile from "./profile";

type Props = {};
const Navbar = async (props: Props) => {
  const session = await getSession();
  return (
    <>
      <h1 className="text-3xl font-bold p-2">DEV PEGA</h1>

      <div
        className="flex flex-col md:flex-row gap-2 ml-auto [&>a]:py-2 [&>a]:px-4 [&>a]:transition [&>a]:rounded-md
      [&>a:hover]:text-sky-100 [&>a:hover]:bg-sky-500"
      >
        <Link href="/" className="text-center">
          Blog
        </Link>

        <Link href="#about" className="text-center">
          About
        </Link>

        <Link href="#contact" className="text-center">
          Contact
        </Link>

        {session && session.user ? (
          <Profile user={session.user} />
        ) : (
          <SignInPanel />
        )}
      </div>
    </>
  );
};

export default Navbar;
