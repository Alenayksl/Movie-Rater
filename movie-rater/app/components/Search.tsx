"use client";

import { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { get } from "@/app/lib/api";

interface SearchResult {
  id: number;
  media_type: "movie" | "tv" | "person";
  title?: string;
  name?: string;
  poster_path?: string | null;
  profile_path?: string | null;
}

function getResultTitle(result: SearchResult) {
  return result.media_type === "movie" ? result.title : result.name;
}

function getResultPath(result: SearchResult, returnTo: string) {
  if (result.media_type === "movie") return `/movies/${result.id}`;
  if (result.media_type === "tv") return `/tv/${result.id}`;
  return `/celebs/${result.id}?returnTo=${encodeURIComponent(returnTo)}`;
}

export default function Search() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    const timeout = window.setTimeout(async () => {
      setLoading(true);
      try {
        const data = await get(`/search/multi?query=${encodeURIComponent(trimmedQuery)}&include_adult=false&language=en-US&page=1`);
        setResults((data?.results ?? []).filter((result: SearchResult) =>
          result.media_type === "movie" || result.media_type === "tv" || result.media_type === "person"
        ).slice(0, 8));
      } catch (error) {
        console.error("Error searching TMDB:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [query]);

  return (
    <div className="relative w-64">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-600" size={18} />
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search movies, TV, people..."
        aria-label="Search movies, TV shows, and people"
        className="w-full rounded-3xl border border-gray-600 bg-black py-1 pl-10 pr-4 text-white focus:border-white focus:outline-none"
      />

      {query.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-gray-700 bg-gray-900 shadow-2xl">
          {loading && <p className="px-4 py-3 text-sm text-gray-400">Searching...</p>}
          {!loading && results.length === 0 && <p className="px-4 py-3 text-sm text-gray-400">No results found.</p>}
          {!loading && results.map((result) => (
            <Link
              key={`${result.media_type}-${result.id}`}
              href={getResultPath(result, pathname)}
              onClick={() => setQuery("")}
              className="flex items-center gap-3 px-3 py-2 transition-colors hover:bg-purple-900"
            >
              {result.poster_path || result.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w92${result.poster_path || result.profile_path}`}
                  alt=""
                  className="h-12 w-9 shrink-0 rounded object-cover"
                />
              ) : (
                <div className="flex h-12 w-9 shrink-0 items-center justify-center rounded bg-gray-700 text-xs text-gray-400">
                  N/A
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{getResultTitle(result)}</p>
                <p className="text-xs capitalize text-gray-400">{result.media_type}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
