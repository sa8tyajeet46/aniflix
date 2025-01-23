"use client";
import React, { useCallback, useState } from "react";
import HoverLabelInput from "./_componenet/HoverLabelInput";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "@/auth";
import googleSignIn, { CredSignIn, RegisterUser } from "./actions";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

function Auth() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((variant) => (variant === "login" ? "register" : "login"));
  }, []);

  const register = useCallback(
    async (e: any) => {
      try {
        e.preventDefault();
        await RegisterUser(email, password, userName);

        login(e);
      } catch (error: any) {
        toast.error(error?.message || "Internal server Error");
      }
    },
    [userName, email, password]
  );

  const login = async (e: any) => {
    try {
      e.preventDefault();

      const response = await CredSignIn(email, password);

      router.push("/");
    } catch (error: any) {
      toast.error(error?.message || "Internal server Error");
    }
  };
  const googleSignIN = async (e: any) => {
    try {
      e.preventDefault();
      await googleSignIn();
      // router.push("/");
    } catch (error: any) {
      toast.error(error?.message || "Internal server Error");
    }
  };
  return (
    <div className=" w-full h-full flex justify-center">
      <div className="w-full lg:w-[450px] px-10 bg-black lg:opacity-85 text-white h-[500px] mt-24 rounded-lg pt-5">
        <div className="text-3xl font-semibold">
          {variant === "register" ? "Sign Up" : "Sign In"}
        </div>
        <form className="w-full flex flex-col space-y-4 mt-5">
          {variant === "register" && (
            <HoverLabelInput
              value={userName}
              label="User Name"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUserName(e.target.value);
              }}
            />
          )}
          <HoverLabelInput
            value={email}
            label="Email"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
          <HoverLabelInput
            value={password}
            label="Password"
            type="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            className="!bg-red-600 !hover:bg-red-700 text-lg font-semibold !mt-7"
            onClick={(e) => {
              variant === "register" ? register(e) : login(e);
            }}
          >
            {variant === "register" ? "Register" : "Login"}
          </Button>

          <Button
            className="bg-white text-black text-lg hover:bg-gray-200"
            onClick={(e) => {
              googleSignIN(e);
            }}
          >
            <FcGoogle className="!w-6 !h-6" />
            Sign in with Google
          </Button>
        </form>
        <p className="mt-10 w-full flex justify-center  text-neutral-400">
          {variant === "register"
            ? "Already have an account?"
            : "First time using Aniflix?"}
          <span
            className="px-2 cursor-pointer hover:underline text-white"
            onClick={toggleVariant}
          >
            {variant === "register" ? "Login" : "Create an Account"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;
