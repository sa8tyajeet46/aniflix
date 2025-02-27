"use client"
import fetcher from "@/lib/fetcher";
import useSWR from "swr";


export default function getAllMovies()
{
    const {data,error,isLoading} = useSWR("/api/GetAllMovies", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {data,error,isLoading}
}