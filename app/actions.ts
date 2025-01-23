"use server";

import { signOut } from "@/auth";

export const LogoutUser = async () => {
  try {
    await signOut({
      redirectTo: "/",
    });
  } catch (error) {
    throw error;
  }
};
