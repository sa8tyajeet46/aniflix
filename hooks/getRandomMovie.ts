"use client";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";

export default function GetRandomMovie() {
  const { data, error, isLoading } = useSWR("/api/GetRandomMovie", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { data, error, isLoading };
}
