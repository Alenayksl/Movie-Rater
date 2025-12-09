import { video } from "../types/tmdb";
import { Film } from "lucide-react";

interface VideoCardProps {
  video: video & { movieTitle: string; movieId: number };
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gray-900 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/30">
      {/* Video iframe */}
      <div className="relative overflow-hidden aspect-video bg-black">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${video.key}`}
          title={video.name}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0"
        ></iframe>
        
        {/* Type badge */}
        <div className="absolute top-3 left-3 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg z-10">
          <Film size={14} />
          <span>{video.type}</span>
        </div>
      </div>

      {/* Content section */}
      <div className="p-4 space-y-2 bg-gradient-to-b from-gray-900 to-gray-950">
        <h2 className="text-white font-bold text-base line-clamp-1 group-hover:text-purple-400 transition-colors duration-300">
          {video.movieTitle}
        </h2>
        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
          {video.name}
        </p>
      </div>

      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-purple-500/50 transition-all duration-300 pointer-events-none" />
    </div>
  );
}
