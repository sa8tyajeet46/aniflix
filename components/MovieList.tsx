import React from "react";
import MovieCard from "./MovieCard";

type MovieListProps = {
  title: string;
  data: Record<string, any>[];
};

function MovieList({ data, title }: MovieListProps) {
  console.log(data);
  if(!data) return null;
  if (Array.isArray(data) && data.length == 0) return null;
  return (
    <div className="pb-12">
      <div className=" w-full text-3xl font-bold text-white pb-6">{title}</div>
      <div className="grid grid-cols-4 gap-2">
        {data.map((movie, i) => {
          return <MovieCard index={i} data={movie} />;
        })}
      </div>
    </div>
  );
}

export default MovieList;
