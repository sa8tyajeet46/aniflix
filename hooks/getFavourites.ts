"use client";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";

export default function getFavourites() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/getFavouriteList",
    fetcher
  );

  return { data, error, isLoading, mutate };
}
