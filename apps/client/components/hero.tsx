import Image from "next/image";

export default function Hero() {
  return (
    <div className="bg-linear-to-br from-sky-500 to-indigo-500 text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-3 pt-12">
        {/* LEFT SECTION */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="uppercase tracking-wider text-sm md:text-base">
            Explore insights, tutorials, and stories for curious minds like
            yours
          </p>

          <h1 className="my-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Welcome To Pega Dev Blog
          </h1>

          <p className="text-lg leading-relaxed md:text-xl">
            Join a community that thrives on learning, creating, and growing
            together.
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex w-full justify-center md:w-3/5 p-7">
          <img
            src="/Hero.png"
            alt="Hero section illustration"
            className="w-full md:w-3/4 z-0"
          />
        </div>
      </div>
      <div className="relative lg:mt-24 direction-reverse">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          className="rotate-180 -mt-10 md:-mt-33"
        >
          <g fill="#FFFFFF">
            <path d="M0 1v99c134.3 0 153.7-99 296-99H0Z" opacity=".5"></path>
            <path
              d="M1000 4v86C833.3 90 833.3 3.6 666.7 3.6S500 90 333.3 90 166.7 4 0 4h1000Z"
              opacity=".5"
            ></path>
            <path d="M617 1v86C372 119 384 1 196 1h421Z" opacity=".5"></path>
            <path d="M1000 0H0v52C62.5 28 125 4 250 4c250 0 250 96 500 96 125 0 187.5-24 250-48V0Z"></path>
          </g>
        </svg>
      </div>
    </div>
  );
}
