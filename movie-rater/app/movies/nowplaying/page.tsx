"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Card from "@/app/components/Card";
import { useState, useEffect } from "react";
import { movie } from "@/app/types/tmdb";
import { get } from "@/app/lib/api";
import Pagination from "@/app/components/Pagination";

export default function NowPlayingPage() {
        const [movies, setMovies] = useState<movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    async function getNowPlayingMovies(page: number) {
    setLoading(true);
    setError(null);
    try {
      const data = await get(`/movie/now_playing?language=en-US&page=${page}`);
      console.log(data);
      setMovies(data.results);
      setTotalPages(data.total_pages > 500 ? 500 : data.total_pages); 
    }
    catch (error) {
      console.error(error);
      setError("Failed to fetch now playing movies");
    }
    finally {
      setLoading(false);
    }
    }

    function handlePageChange(page: number) {
    setCurrentPage(page);
    getNowPlayingMovies(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

    useEffect(() => {
    getNowPlayingMovies(1);
    }, []);

    return (
    <main className="min-h-screen pt-20 px-6">
        <Header />
        <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Now Playing Movies</h1>
        {loading && <p className="text-white text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {movies.length > 0 && ( 
            <>  
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-8">
                {movies.map((movie) => (
                <Card key={movie.id} movie={movie} />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            </>
        )}
        </div>
        <Footer />
    </main>
  );
}