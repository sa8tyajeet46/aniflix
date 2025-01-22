"use client";
import { auth } from "@/auth";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import getUserDetails from "@/hooks/getUserDetails";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { LogoutUser } from "./actions";

export default function Home() {
  const router = useRouter();

  const { data, isLoading, error } = getUserDetails();

  const handleSignout = async (e: any) => {
    e.preventDefault();
    try {
      await LogoutUser();
    } catch (error) {
      throw error;
    }
  };
  return (
    <div>
      Logged in as {data?.user?.email}
      <div>
        <Button
          onClick={(e) => {
            handleSignout(e);
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
