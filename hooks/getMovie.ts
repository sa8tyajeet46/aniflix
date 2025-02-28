"use client"
import fetcher from "@/lib/fetcher";
import useSWR from "swr";


export default function getMovie(MovieId:string)
{
    console.log(MovieId)
    const {data,error,isLoading} = useSWR(`/api/movie/${MovieId}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {data,error,isLoading}
}