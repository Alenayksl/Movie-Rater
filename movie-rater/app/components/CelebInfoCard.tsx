import { celeb } from "../types/tmdb";

interface CelebInfoCardProps {
  celeb: celeb;
}

export default function CelebInfoCard({ celeb }: CelebInfoCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-gray-900 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
      <div className="relative overflow-hidden">
        {celeb.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${celeb.profile_path}`}
            alt={celeb.name}
            className="w-full h-[225px] object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-[225px] bg-gray-800 flex items-center justify-center">
            <span className="text-gray-600">No Image</span>
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-3">
        <h2 className="text-white font-semibold text-sm line-clamp-2 mb-1 min-h-10">
          {celeb.name}
        </h2>
        
        <div className="mb-1">
          {celeb.known_for.slice(0, 2).map((work, index) => (
            <p key={index} className="text-gray-400 text-xs line-clamp-1">
              {"title" in work ? work.title : work.name}
            </p>
          ))}
        </div>

        <p className="text-gray-400 font-semibold text-xs">
          {celeb.known_for_department}
        </p>
      </div>

      <div className="absolute inset-0 rounded-lg border-2 border-purple-600/0 group-hover:border-purple-600/50 transition-all duration-300" />
    </div>
  );
}

