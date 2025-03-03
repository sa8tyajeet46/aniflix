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
  const [browseOpen, setBrowseOpen] = useState(false);
  const toggleOpen = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen((open) => !open);
  }, []);

  const toggleBrowseOpen = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setBrowseOpen((browse) => !browse);
    },
    []
  );
  const profileGenerationFun = useCallback(generateRandomProfile, []);
  const profileImage = profileGenerationFun();

  const handleSignout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await LogoutUser();
    } catch (error) {
      throw error;
    }
  };

  const routes = [
    { label: "Home", link: "/" },
    { label: "New and popular", link: "/new" },
    { label: "Favourites", link: "/fav" },
    { label: "Browse By Language", link: "/lang" },
  ];
  return (
    <div className="h-[80px] w-full text-white px-5 flex items-center fixed top-0 justify-between md:justify-normal z-50">
      <Link
        href="/"
        className={`sm:text-4xl text-white sm:m-4 m-2 sm:p-2 p-1 rounded-md bg-black ${robotoMono.className} text-2xl`}
      >
        Aniflix
      </Link>
      <div className="hidden space-x-5 text-white h-full items-center flex-grow sm:m-4 m-2 sm:p-2 p-1 lg:flex">
        {routes.map((route, i) => {
          return (
            <Link href={route.link} key={i}>
              {route.label}
            </Link>
          );
        })}
      </div>
      <div className="flex space-x-3 px-4 text-white items-center lg:hidden ">
        <div className="relative">
          <button
            className="flex space-x-0.5 items-center"
            onClick={(e) => {
              toggleBrowseOpen(e);
            }}
          >
            Browse
            <ChevronDown
              className="transition duration-200"
              style={{
                transform: browseOpen ? "rotate(0deg)" : "rotate(180deg)",
              }}
            />
          </button>

          <div
            className={`absolute right-0 mt-2 bg-white space-y-2 w-[200px] text-black p-2 rounded-md shadow-md transition duration-200 flex-col ${
              browseOpen ? "flex" : "hidden"
            }`}
          >
            {routes.map((route, i) => {
              return (
                <Link
                  href={route.link}
                  key={i}
                  className="bg-gray-200 flex crusor-pointer rounded-md p-1 hover:bg-accent "
                >
                  {route.label}
                </Link>
              );
            })}
            <Link
              href="/"
              className="bg-gray-200 flex crusor-pointer rounded-md p-1 hover:bg-accent "
            >
              Notifications
            </Link>
            <Link
              href="/"
              className="bg-gray-200 flex crusor-pointer rounded-md p-1 hover:bg-accent "
            >
              Search
            </Link>

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
      <div className="hidden space-x-3 px-4 text-white items-center md:flex">
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
