import React from "react";
import MovieCard from "./MovieCard";

type MovieListProps = {
  title: string;
  data: Record<string, any>[];
};

function MovieList({ data, title }: MovieListProps) {
  
  if(!data) return null;
  if (Array.isArray(data) && data.length == 0) return null;
  return (
    <div className="pb-12">
      <div className=" w-full sm:text-3xl text-2xl sm:font-bold font-semibold text-white pb-6">
        {title}
      </div>
      <div className="grid sm:grid-cols-4 grid-cols-1 gap-2">
        {data.map((movie, i) => {
          return <MovieCard index={i} data={movie} key={i} />;
        })}
      </div>
    </div>
  );
}

export default MovieList;
