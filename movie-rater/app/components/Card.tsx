import { movie } from "../types/tmdb";

interface CardProps {
  movie: movie;
}

export default function Card({ movie }: CardProps) {
  return (
    <div className="">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={150} height={225} />
        <div className="p-4">
            <h2 className="text-lg text-white font-semibold" style={{ width: 150 }}
            >{movie.title}</h2>
            <p className="text-gray-600 text-sm">{movie.release_date}</p>
        </div>
    </div>
  );
}