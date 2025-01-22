import Link from "next/link";
import React from "react";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  weight: "500",
  subsets: ["latin"],
});
function layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`relative h-full w-full bg-[url('/images/hero.webp')] bg-cover bg-center bg-no-repeat`}
    >
      <div className="absolute w-full h-full bg-black lg:opacity-50"></div>
      <Link
        href="/"
        className={`absolute text-4xl text-white m-4 p-2 rounded-md bg-black ${robotoMono.className}`}
      >
        Aniflix
      </Link>

      {children}
    </div>
  );
}

export default layout;
