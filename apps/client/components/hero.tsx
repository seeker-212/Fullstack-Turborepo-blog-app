import Image from 'next/image';

export default function Hero() {
  return (
    <div className="bg-linear-to-br from-sky-500 to-indigo-500 text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-3">
        {/* LEFT SECTION */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="uppercase tracking-wider text-sm md:text-base">
            Explore insights, tutorials, and stories for curious minds like yours
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
        <div className="flex w-full justify-center md:w-1/2">
          <Image
            src="/Hero.png"
            alt="Hero section illustration"
            width={600}
            height={500}
            priority
            className="h-auto w-full max-w-md md:max-w-lg"
          />
        </div>
      </div>
      <div className='relative'></div>
    </div>
  );
}