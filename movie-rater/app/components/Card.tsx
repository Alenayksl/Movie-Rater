import { movie } from "../types/tmdb";
import { Star } from "lucide-react";

interface CardProps {
  movie: movie;
}

export default function Card({ movie }: CardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-gray-900 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
      <div className="relative overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-[225px] object-cover transition-transform duration-300 group-hover:scale-110"
        />

        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="text-yellow-400 fill-yellow-400" size={14} />
          <span className="text-white text-xs font-bold">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-3">
        <h2 className="text-white font-semibold text-sm line-clamp-2 mb-1 min-h-10">
          {movie.title}
        </h2>
        <p className="text-gray-400 text-xs">{movie.release_date}</p>
      </div>

      <div className="absolute inset-0 rounded-lg border-2 border-purple-600/0 group-hover:border-purple-600/50 transition-all duration-300" />
    </div>
  );
}
