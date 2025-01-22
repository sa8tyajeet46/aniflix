"use server";

import { signOut } from "@/auth";

export const LogoutUser = async () => {
  try {
    await signOut();
  } catch (error) {
    throw error;
  }
};
