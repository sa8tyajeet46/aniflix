"use client"
import getMovie from "@/hooks/getMovie";
import { toast } from "sonner";
import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";


type watchParams={
    params:{
        MovieId?:string;

    }
}
function Page({ params }: watchParams) {
  const router = useRouter();
  const { MovieId } = params;
  const { data, error } = getMovie(MovieId ? String(MovieId) : "");
  if (error) {
    toast.error(error?.message || "Movie not found");
    return null;
  }

  return (
    <div className="text-white h-screen w-screen">
      <div className="flex space-x-3 sm:px-12 px-4 py-3 items-center">
        <button
          onClick={(e) => {
            e.preventDefault();
            router.push("/dashboard");
          }}
        >
          <IoArrowBackOutline size={35} />
        </button>
        <div className="sm:text-2xl text-xl">Watching :</div>
        <div className="sm:text-2xl text-xl font-semibold">
          {data?.movie?.title}
        </div>
      </div>

      <video
        src={data?.movie?.videoUrl}
        controls
        className="w-full h-[90vh]"
      ></video>
    </div>
  );
}

export default Page;