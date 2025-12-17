"use client"

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Card from "@/app/components/Card";
import { useState, useEffect } from "react";
import { get } from "@/app/lib/api";
import Pagination from "@/app/components/Pagination";
import { tvShow } from "@/app/types/tmdb";

export default function PopularTv() {
    const [tvShows, setTvShows] = useState<tvShow[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    async function getPopularTvShows(page: number) {
        setLoading(true);
        setError(null);
        try {
            const data = await get(`/tv/popular?language=en-US&page=${page}`);
            console.log(data);
            setTvShows(data.results);
            setTotalPages(data.total_pages > 500 ? 500 : data.total_pages); 
        }
        catch (error) {
            console.error(error);
            setError("Failed to fetch popular TV shows");
        }
        finally {
            setLoading(false);
        }
    }

    function handlePageChange(page: number) {
        setCurrentPage(page);
        getPopularTvShows(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    useEffect(() => {
        getPopularTvShows(1);
    }, []);

  return (
    <main className="min-h-screen pt-20 px-6">
      <Header />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Popular TV Shows</h1>    
        {loading && <p className="text-white text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {tvShows.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-8">
                {tvShows.map((show) => (
                    <Card key={show.id} tvShow={show} />
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
  )
}