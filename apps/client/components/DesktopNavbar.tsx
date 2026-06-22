"use client";
import { cn } from "@/lib/utils";
import { PropsWithChildren, useEffect, useState } from "react";

type Props = PropsWithChildren;

const DesktopNavbar = (props: Props) => {
  //Use state
  const [scrollPosition, setScrollPosition] = useState(0);

  const handlescroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handlescroll);
    return () => {
      window.removeEventListener("scroll", handlescroll);
    };
  });

  const isScrollDown = scrollPosition > 10;

  return (
    <nav
      className={cn(
        "hidden fixed w-full text-white z-50 transition-colors md:block",
        { "bg-white text-gray-700 shadow-md": isScrollDown },
      )}
    >
      <div className="flex items-center px-4 py-4 container">
        {props.children}
      </div>

      <hr className="border-b border-gray-100 opacity-25" />
    </nav>
  );
};

export default DesktopNavbar;
