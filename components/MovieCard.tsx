import React from 'react'
import Image from 'next/image'
import { FaCirclePlay } from "react-icons/fa6";
import FavouriteButton from './FavouriteButton';

type MovieCardProps={
    data:Record<string,any>,
    index:number;
}
function MovieCard({data,index}:MovieCardProps) {
  return (
    <div key={index} className="relative bg-zinc-800 h-[12vw] group overflow-visible rounded-md">
      <Image
        src={data?.thumbnailUrl}
        alt="Movie ThumbNail"
        className="h-[12vw] object-cover rounded-md cursor-pointer transition duration-200 delay-200 group-hover:opacity-90 sm:group-hover:opacity-0"
        fill
      />
      <div className=" bg-zinc-600 w-full  group-hover:-translate-y-[6vw] group-hover:translate-x-[1vw]  sm:visible transition duration-200 delay-200 group-hover:scale-110 group-hover:flex flex-col  rounded-md absolute z-10 opacity-0 group-hover:opacity-100 hidden group-hover:visible cursor-pointer">
       
        <img
          src={data?.thumbnailUrl}
          alt="Movie ThumbNail"
          className="h-[12vw] object-cover rounded-md cursor-pointer"
          
        />
        <div className=' flex flex-col text-white py-2 px-3 space-y-2'>
          <div className='w-full '>
            <FaCirclePlay size={30}/>
            <FavouriteButton movieId={data?.id} />
          </div>
          <div className='w-full flex text-green-500 font-semibold space-x-2' >
            <div>New</div>
            <div className='text-white'>{new Date(Date.now()).getFullYear()}</div>
          </div>
          <div className='w-full flex' >
           {data?.duration}
          </div>
          <div className='w-full flex' >
           {data?.genre}
          </div>
          <div>

          </div>
        </div>
        
       
        
      </div>
    </div>
  )
}

export default MovieCard