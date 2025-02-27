"use client";
import { auth } from "@/auth";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import getUserDetails from "@/hooks/getUserDetails";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { LogoutUser } from "./actions";
import Link from "next/link";
import { generateRandomProfile } from "@/lib/utils";

export default function Home() {
  const router = useRouter();

  const { data, isLoading, error } = getUserDetails();

  if (isLoading) {
    return <Loader />;
  }
  const profileImage = generateRandomProfile();
  localStorage.setItem("avatar", profileImage);

  return (
    <div className="bg-black w-full h-screen flex flex-col justify-center items-center space-y-10">
      <span className="text-white text-4xl font-semibold">Who's Watching?</span>
      <div className="flex-col flex space-y-7">
        <Link
          href="/dashboard"
          style={{
            backgroundImage: `url('${profileImage}')`,
          }}
          className="w-40 h-40 rounded-md bg-cover hover:scale-110 transition duration-700 hover:border-2 hover:border-white"
        ></Link>
        <span className=" w-full text-center text-xl text-gray-400">
          {data?.user?.name}
        </span>
      </div>
    </div>
  );
}
