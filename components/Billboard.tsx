"use client";
import GetRandomMovie from "@/hooks/getRandomMovie";
import React from "react";

function Billboard() {
  const { data } = GetRandomMovie();
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
          <button className="px-2 py-0.5 bg-gray-400/50 mt-1 md:mt-3 rounded-md text-normal md:text-xl crusor-pointer">
            More Info
          </button>
        </div>

    </div>
  );
}

export default Billboard;
