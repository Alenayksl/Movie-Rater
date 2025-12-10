"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Card from "@/app/components/Card";
import { useState, useEffect } from "react";
import { movie } from "@/app/types/tmdb";
import { get } from "@/app/lib/api";

export default function PopularMoviesPage() {
  const [movies, setMovies] = useState<movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function getPopularMovies() {
    setLoading(true);
    setError(null);
    try {
      const data = await get("/movie/popular?language=en-US&page=1");
      console.log(data);
      setMovies(data.results);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch popular movies");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPopularMovies();
  }, []);

  return (
    <main className="min-h-screen pt-20 px-6">
      <Header />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Popular Movies</h1>
        
        {loading && <p className="text-white text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        {movies.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {movies.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}