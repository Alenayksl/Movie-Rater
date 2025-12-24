"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Card from "@/app/components/Card";
import { useState, useEffect, useCallback } from "react";
import { movie } from "@/app/types/tmdb";
import { get } from "@/app/lib/api";
import Pagination from "@/app/components/Pagination";
import MoviesFilter from "@/app/components/MoviesFilter";

export default function PopularMoviesPage() {

  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<number[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("popularity.desc");

  const [movies, setMovies] = useState<movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const hasFilters = selectedGenres.length > 0 || selectedPlatforms.length > 0 || selectedCountry || selectedLanguage || selectedYear || sortBy !== "popularity.desc";

  const getPopularMovies = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      page: page.toString(),
      language: selectedLanguage ?? "en-US",
    });

    let endPoint = "";

    if (hasFilters) {
      params.append("sort_by", sortBy);
      if (selectedGenres.length > 0) {
      params.append("with_genres", selectedGenres.join(","));
    }
    if (selectedPlatforms.length > 0) {
      params.append("with_watch_providers", selectedPlatforms.join(","));
      params.append("watch_region", selectedCountry || "US");
    }
    if (selectedYear) {
      params.append("primary_release_year", selectedYear.toString());
    }
    if (selectedCountry) {
      params.append("region", selectedCountry);
    }
  if (selectedLanguage) {
    params.append("with_original_language", selectedLanguage);
  }

    endPoint = `/discover/movie?${params.toString()}`;
  } else {
    endPoint = `/movie/popular?page=${page}&language=${selectedLanguage ?? "en-US"}`;
  }

  try {
      const data = await get(endPoint);
      console.log(data);
      setMovies(data.results);
      setTotalPages(data.total_pages > 500 ? 500 : data.total_pages); 
    } catch (error) {
      console.error(error);
      setError("Failed to fetch popular movies");
    } finally {
      setLoading(false);
    }
  }, [selectedLanguage, hasFilters, sortBy, selectedGenres, selectedPlatforms, selectedYear, selectedCountry]);

  function handleGenreChange(genreId: number, checked: boolean) {
    setSelectedGenres(prev =>
      checked ? [...prev, genreId] : prev.filter(g => g !== genreId)
    );
  }

  function handlePlatformChange(platformId: number, checked: boolean) {
    setSelectedPlatforms(prev =>
      checked ? [...prev, platformId] : prev.filter(p => p !== platformId)
    );
  }

  function handleCountryChange(countryCode: string | null) {
    setSelectedCountry(countryCode);
  }

  function handleLanguageChange(languageCode: string | null) {
    setSelectedLanguage(languageCode);
  }

  function handleYearChange(year: number | null) {
    setSelectedYear(year);
  }

  function handleSortChange(sortOption: string) {
    setSortBy(sortOption);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
    getPopularMovies(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    setCurrentPage(1);
    getPopularMovies(1);
  }, [getPopularMovies]);

  return (
    <main className="min-h-screen bg-gray-950">
      <Header />
      <MoviesFilter
        selectedGenres={selectedGenres}
        selectedPlatforms={selectedPlatforms}
        selectedCountry={selectedCountry}
        selectedLanguage={selectedLanguage}
        selectedYear={selectedYear}
        sortBy={sortBy}
        onGenreChange={handleGenreChange}
        onPlatformChange={handlePlatformChange}
        onCountryChange={handleCountryChange}
        onLanguageChange={handleLanguageChange}
        onYearChange={handleYearChange}
        onSortChange={handleSortChange}
      >
        <div>
          {loading && <p className="text-white text-center py-8">Loading...</p>}
          {error && <p className="text-red-500 text-center py-8">{error}</p>}
          
          {!loading && movies.length > 0 && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-8">
                {movies.map((movie) => (
                  <Card key={movie.id} movie={movie} />
                ))}
              </div>
              
              <div className="flex justify-center my-8">
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}

          {!loading && movies.length === 0 && !error && (
            <p className="text-gray-400 text-center py-8">No movies found</p>
          )}
        </div>
      </MoviesFilter>
      
      <Footer />
    </main>
  );
}