"use client";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";

export default function getUserDetails() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/currentUser",
    fetcher
  );

  return { data, error, isLoading, mutate };
}
