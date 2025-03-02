"use client";
import GetRandomMovie from "@/hooks/getRandomMovie";
import useInfoModal from "@/hooks/useInfoModal";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { FaCirclePlay } from "react-icons/fa6";

function Billboard() {
  const router = useRouter();
  const { data } = GetRandomMovie();

  const { openModal } = useInfoModal((state) => state);

  const handleInfo = useCallback(
    (e: any) => {
      e.preventDefault();
      openModal(data?.id);
    },
    [openModal, data?.id]
  );
  return (
    <div className="text-white h-[56.25vw] relative ">
      <video
        src={data?.videoUrl}
        poster={data?.thumbnailUrl}
        muted
        loop
        autoPlay
        className="text-white w-full object-cover  h-[56.25vw] brightness-75 z-0 absolute"
      />
      <div className="absolute w-full md:w-[40%] ml-4 mr-4 md:ml-16  top-[30%] md:top-[40%]">
        <p className="text-white text-xl font-bold md:text-3xl w-[50%] ">
          {data?.title}
        </p>
        <p className="text-white md:font-normal font-sm mt-1 md:mt-3 w-full h-12 md:h-auto md:overflow-visible overflow-clip">
          {data?.description}
        </p>
        <div className="flex">
          <button
            className="px-2 py-0.5 bg-white text-black mt-1 md:mt-3 rounded-md text-normal md:text-xl crusor-pointer mr-2 flex space-x-2 items-center z-100"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/watch/${data.id}`);
            }}
          >
            <FaCirclePlay />
            <span>play</span>
          </button>
          <button
            onClick={(e) => {
              handleInfo(e);
            }}
            className="px-2 py-0.5 bg-gray-400/50 mt-1 md:mt-3 rounded-md text-normal md:text-xl crusor-pointer flex space-x-2 items-center"
          >
            <CiCircleInfo />
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Billboard;
