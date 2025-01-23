"use client";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { Roboto_Mono } from "next/font/google";
import { generateRandomProfile } from "@/lib/utils";
import { Bell, ChevronDown, Search } from "lucide-react";
import { Button } from "./ui/button";
import { LogoutUser } from "@/app/actions";

const robotoMono = Roboto_Mono({
  weight: "500",
  subsets: ["latin"],
});

function NavBar() {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback((e) => {
    e.preventDefault();
    setOpen((open) => !open);
  }, []);
  const profileGenerationFun = useCallback(generateRandomProfile, []);
  const profileImage = profileGenerationFun();

  const handleSignout = async (e: any) => {
    e.preventDefault();
    try {
      await LogoutUser();
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="h-[80px] w-full text-white px-5 flex items-center relative">
      <Link
        href="/"
        className={`text-4xl text-white m-4 p-2 rounded-md bg-black ${robotoMono.className}`}
      >
        Aniflix
      </Link>
      <div className="flex space-x-3 px-4 text-gray-400 items-center">
        <Bell className="cursor-pointer" />
        <Search className="cursor-pointer" />
        <div className="relative">
          <button
            className="flex space-x-0.5 items-center"
            onClick={(e) => {
              toggleOpen(e);
            }}
          >
            <div
              className="w-10 h-10 bg-cover rounded-md"
              style={{
                backgroundImage: `url('${profileImage}')`,
              }}
            ></div>
            <ChevronDown
              className="transition duration-200"
              style={{
                transform: open ? "rotate(0deg)" : "rotate(180deg)",
              }}
            />
          </button>

          <div
            className={`absolute right-0 mt-2 bg-white text-black p-2 rounded-md shadow-md transition duration-200 ${
              open ? "flex" : "hidden"
            }`}
          >
            <Button
              onClick={(e) => {
                handleSignout(e);
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
