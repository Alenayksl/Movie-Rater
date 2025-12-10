import { reviews } from "../types/tmdb";
import { User, MessageSquare, Star, ExternalLink } from "lucide-react";

interface ReviewsCardProps {
  review: reviews;
}

export default function ReviewsCard({ review }: ReviewsCardProps) {
  const avatarUrl = review.author_details.avatar_path
    ? review.author_details.avatar_path.startsWith('/https')
      ? review.author_details.avatar_path.substring(1)
      : `https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`
    : null;

  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-950 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/30 h-full">
      {/* Header with Avatar and Author */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={review.author_details.username}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/50"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            )}
          </div>

          {/* Author Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold truncate">
              {review.author_details.username || review.author}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              {review.author_details.rating && (
                <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-0.5 rounded-full">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs text-yellow-500 font-semibold">
                    {review.author_details.rating}/10
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start gap-2">
          <MessageSquare className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-6">
            {review.content}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 pt-0">
        <a
          href={review.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors group/link"
        >
          Read Full Review
          <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-purple-500/50 transition-all duration-300 pointer-events-none" />
    </div>
  );
}