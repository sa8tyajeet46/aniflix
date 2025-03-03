import React, { useCallback } from "react";
import Image from "next/image";
import { FaCirclePlay } from "react-icons/fa6";
import FavouriteButton from "./FavouriteButton";
import { useRouter } from "next/navigation";
import useInfoModal from "@/hooks/useInfoModal";
import { FaCircleChevronDown } from "react-icons/fa6";
import Link from "next/link";

type MovieCardProps = {
  data: Record<string, any>;
  index: number;
};
function MovieCard({ data, index }: MovieCardProps) {
  const router = useRouter();

  const { openModal } = useInfoModal((state) => state);

  const handleInfo = useCallback(
    (e: any) => {
      e.preventDefault();
      openModal(data?.id);
    },
    [openModal, data?.id]
  );
  return (
    <div
      key={index}
      className="relative bg-zinc-800 sm:h-[12vw] h-[30vh] group overflow-visible rounded-md"
    >
      <button
        className="bg-transparent w-full h-full sm:hidden flex"
        onClick={(e) => {
          e.preventDefault();
          console.log("button clicked");
          handleInfo(e);
        }}
      >
        <Image
          src={data?.thumbnailUrl}
          alt="Movie ThumbNail"
          className="h-[12vw] object-cover rounded-md cursor-pointer transition duration-200 delay-200 group-hover:opacity-90 sm:group-hover:opacity-0"
          fill
        />
      </button>
      <Image
        src={data?.thumbnailUrl}
        alt="Movie ThumbNail"
        className="h-[12vw] object-cover rounded-md cursor-pointer transition duration-200 delay-200 group-hover:opacity-90 sm:group-hover:opacity-0 sm:flex hidden"
        fill
      />
      <div className="bg-zinc-600 w-full group-hover:-translate-y-[6vw] group-hover:translate-x-[1vw] transition duration-200 delay-200 group-hover:scale-100 group-hover:flex flex-col rounded-md absolute z-10 opacity-0 md:group-hover:opacity-100 hidden sm:hidden md:group-hover:flex cursor-pointer">
        <img
          src={data?.thumbnailUrl}
          alt="Movie ThumbNail"
          className="h-[12vw] object-cover rounded-md cursor-pointer"
        />
        <div className="flex flex-col text-white py-2 px-3 space-y-2">
          <div className="w-full flex space-x-2 flex-row items-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push(`/watch/${data.id}`);
              }}
            >
              <FaCirclePlay size={30} />
            </button>
            <FavouriteButton movieId={data?.id} />
            <button
              onClick={(e) => {
                e.preventDefault();
                handleInfo(e);
              }}
            >
              <FaCircleChevronDown size={30} />
            </button>
          </div>
          <div className="w-full flex text-green-500 font-semibold space-x-2">
            <div>New</div>
            <div className="text-white">
              {new Date(Date.now()).getFullYear()}
            </div>
          </div>
          <div className="w-full flex">{data?.duration}</div>
          <div className="w-full flex">{data?.genre}</div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
