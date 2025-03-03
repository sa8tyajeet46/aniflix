"use client"
import { AddFavourite, deleteFavourite } from '@/app/api/FavouriteMovie';
import { addFavourite, unFavourite } from '@/app/auth/actions';
import getFavourites from '@/hooks/getFavourites';
import getUserDetails from '@/hooks/getUserDetails';
import axios from 'axios';
import React, { useCallback } from 'react'
import { toast } from 'sonner';
import { CiCirclePlus } from "react-icons/ci";
import { FaCircleCheck } from "react-icons/fa6";

function FavouriteButton({ movieId }: { movieId: string }) {
  const { data: user, mutate } = getUserDetails();
  const { data: favouites, mutate: mutateFav } = getFavourites();

  const isFavourite = user?.user?.favoriteIds?.includes(movieId);

  const toogleFavourites = useCallback(async () => {
    try {
      let response: any;
      if (!isFavourite) {
        response = await addFavourite(movieId);
      } else {
        response = await unFavourite(movieId);
      }

      mutate({
        ...user,
        favoriteIds: response?.favoriteIds,
      });

      mutateFav();
    } catch (error: any) {
      toast.error(error?.message || "Internal server Error");
    }
  }, [user, mutate, mutateFav, isFavourite, movieId]);
  return (
    <div
      onClick={(e) => {
        toogleFavourites();
      }}
    >
      {!isFavourite ? <CiCirclePlus size={35} /> : <FaCircleCheck size={30} />}
    </div>
  );
}

export default FavouriteButton;