"use client";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import NavBar from "@/components/NavBar";
import getAllMovies from "@/hooks/getAllMovies";
import getFavourites from "@/hooks/getFavourites";
import React from "react";

function DashBoard() {
  const { data: movies = [], error, isLoading } = getAllMovies();
  const { data: FavouriteList = [] } = getFavourites();
  return (
    <div className="w-full  bg-black flex flex-col ">
      <NavBar />
      <Billboard />
      <div className="md:mt-14 mt-8 md:ml-8 ml-4 md:mr-8 mr-4">
        <MovieList title="Trending Now" data={movies} />
      </div>
      <div className="md:mt-14 mt-8 md:ml-8 ml-4 md:mr-8 mr-4">
        <MovieList title="MY Favourites" data={FavouriteList} />
      </div>
    </div>
  );
}

export default DashBoard;
