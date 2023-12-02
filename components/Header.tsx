import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex p-5 justify-between sticky top-0 bg-white z-50 shadow-md">
      {/* left */}
      <div className="flex space-x-2 items-center">
        <Image alt="logo" src="/img/GPT-4.jpg" width={30} height={30} />

        <div>
          <h1 className="font-bold">
            Shawn's
            <span className="text-violet-500"> AI </span>
            Image Generator
          </h1>
          <h2 className="text-xs">Power by DALL·E 3, GPT-3.5-Turbo & Microsoft Azure!</h2>
        </div>
      </div>

      {/* right*/}
      <div className="flex divide-x items-center text-xs md:text-base  text-slate-400">
        <Link href="https://github.com/shawfeg218" className="px-2 font-light text-right">
          shawfeg218
        </Link>
        <Link
          href="https://github.com/shawfeg218/ai-image-generator"
          className="px-2 font-light text-right"
        >
          Github Repo
        </Link>
      </div>
    </header>
  );
}
