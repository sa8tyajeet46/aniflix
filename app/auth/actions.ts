"use server";

import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { registerUserSchema } from "@/lib/zod";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";
import { AddFavourite, deleteFavourite } from "../api/FavouriteMovie";

// For client-side component
const googleSignIn = async () => {
  try {
    await signIn("google", { callbackUrl: "/" });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const addFavourite = async (movieId: string) => {
  try {
    const response = await AddFavourite(movieId);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const unFavourite = async (movieId: string) => {
  try {
    const response = await deleteFavourite(movieId);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const CredSignIn = async (email: string, password: string) => {
  try {
    const user = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    });

    return user;
  } catch (error: any) {
    const loginErorMessage =
      new Error(error?.cause?.err).message ?? "Internal server Error";

    throw new Error(loginErorMessage);
  }
};

export const RegisterUser = async (
  email: string,
  password: string,
  userName: string
) => {
  try {
    if (!userName || !email || !password) {
      throw new Error("userName or email can't be empty");
    }

    await registerUserSchema.parseAsync({ userName, email, password });

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new Error("Account already exists");
    }

    const hasedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: userName,
        email: email,
        hashedPassword: hasedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return user;
  } catch (error: any) {
    if (error instanceof ZodError) {
      const messages = error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      console.error("Validation Errors:", messages);

      throw new Error(`Validation failed: ${messages}`);
    }
    throw new Error(error?.message || "Internal server Error");
  }
};

export default googleSignIn;
