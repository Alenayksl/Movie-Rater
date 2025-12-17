import { celeb } from "../types/tmdb";

interface CelebInfoCardProps {
  celeb: celeb;
}

export default function CelebInfoCard({ celeb }: CelebInfoCardProps) {
  return (
    <div className="flex flex-col items-center group cursor-pointer">
        <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50">
        {celeb.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${celeb.profile_path}`}
            alt={celeb.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-gray-600">No Image</span>
            </div>
        )}
        <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-purple-500/60 transition-all duration-300" />
      </div>

        <div className="mt-3 text-center max-w-[140px]">
        <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-purple-400 transition-colors duration-300">
          {celeb.name}
        </h3>

        <div className="mt-1">
          {celeb.known_for.map((work, index) => (
            <p key={index} className="text-gray-400 text-xs">
              {"title" in work ? work.title : work.name}
            </p>
          ))}
        </div>

        <p className="text-gray-400 text-xs mt-1">
          {celeb.known_for_department}
        </p>
        </div>  
    </div>
  );
}

