"use client"
import getMovie from '@/hooks/getMovie';
import useInfoModal from '@/hooks/useInfoModal';
import React, { useCallback, useEffect, useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import {useRouter} from "next/navigation"
import { FaCirclePlay } from 'react-icons/fa6';
import FavouriteButton from './FavouriteButton';


declare interface InfoModalInterface{
visible:boolean,
onClose:()=>void
}

function InfoModal({visible,onClose}:InfoModalInterface) {
    const router=useRouter();
    const [isVisible,setIsVisible]=useState(!!visible);
    const {movieId} =useInfoModal((state)=>state);
    
    
    const {data,error}=getMovie(movieId?String(movieId):"");


    useEffect(()=>{
        setIsVisible(!!visible)
    },[
        visible
    ])

    const handleClose=useCallback((e:any)=>{
      e.preventDefault();
      setIsVisible(false);
      setTimeout(()=>
      {onClose()},300
    )
    },[onClose])

    if (!isVisible) {
      return null;
    }

    return (
      <div className="fixed top-1/2 bg-zinc-600 text-white   z-50 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md  w-auto">
        <video
          src={data?.movie?.videoUrl}
          autoPlay
          muted
          className="h-[25vh] rounded-md relative object-cover w-full"
        ></video>
        <div
          className="absolute top-2 right-2 text-white cursor-pointer"
          onClick={handleClose}
        >
          <IoMdCloseCircle size={18} />
        </div>
        <div className=" flex flex-col text-white py-2 px-3 space-y-0.5">
          <div className="w-full flex space-x-2 flex-row items-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push(`/watch/${data?.movie?.id}`);
              }}
            >
              <FaCirclePlay size={30} />
            </button>
            <FavouriteButton movieId={data?.movie?.id} />
          </div>
          <div className="w-full flex text-2xl font-semibold">
            {data?.movie?.title}
          </div>
          <div className="w-full flex">{data?.movie?.duration}</div>
          {/* <div className="w-full flex">{data?.movie?.genre}</div> */}
          <div className=" flex sm:w-[400px] w-[300px]">
            {data?.movie?.description}
          </div>
        </div>
        {/* <div>
          <button onClick={handleClose}>close</button>
        </div>
        <div>{data?.movie?.title}</div> */}
      </div>
    );
}

export default InfoModal