"use client"
import { useState , useEffect } from "react";
import { movie, tvShow } from "./types/tmdb";
import { get } from "./lib/api";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [movies, setMovies] = useState<movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("today");
  const [tvShows, setTvShows] = useState<tvShow[]>([]);

  async function getMovieListToday() {
    setLoading(true);
    setError(null);
   try {
 const data = await get("/trending/movie/day?language=en-US");
   console.log(data);
   setMovies(data.results);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  }

  async function getMovieListThisWeek() {
    setLoading(true);
    setError(null);
   try {
 const data = await get("/trending/movie/week?language=en-US");
   console.log(data);
   setMovies(data.results);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  }

  function handleTabChange(value: string) {
    setActiveTab(value);
    if (value === "today") {
      getMovieListToday();
    } else if (value === "this_week") {
      getMovieListThisWeek();
    }
  } 

  useEffect(() => {
    getMovieListToday();
  }, []);

  async function getTvShowListToday() {
    setLoading(true);
    setError(null);
   try {
 const data = await get("/trending/tv/day?language=en-US");
    console.log(data);
    setTvShows(data.results);
      } catch (error) {
      console.error(error);
      setError("Failed to fetch TV shows.");
    } finally {
      setLoading(false);
    }
  }

  async function getTvShowListThisWeek() {
    setLoading(true);
    setError(null);
   try {
 const data = await get("/trending/tv/week?language=en-US");
    console.log(data);
    setTvShows(data.results);
      } catch (error) {
      console.error(error);
      setError("Failed to fetch TV shows.");
    } finally {
      setLoading(false);
    }
  }

  async function handleTvTabChange(value: string) {
    setActiveTab(value);
    if (value === "today") {
      getTvShowListToday();
    } else if (value === "this_week") {
      getTvShowListThisWeek();
    }
  }

  useEffect(() => {
    getTvShowListToday();
  }, []);

  return (
    <main className="min-h-screen pt-20 px-6">
      <Header />
      <div className="mr-auto ml-auto mt-5 w-full max-w-5xl">
        <h1 className="text-white text-3xl font-bold mb-4">Trending Movies</h1>
        <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
          <TabsList className="justify-center mb-8 bg-gray-900 border border-purple-700 rounded-full p-1">
            <TabsTrigger 
              className="text-gray-400 hover:text-white rounded-full data-[state=active]:bg-purple-800 data-[state=active]:text-white transition-all px-6 py-2" 
              value="today"
            >
              Today
            </TabsTrigger>
            <TabsTrigger 
              className="text-gray-400 hover:text-white rounded-full data-[state=active]:bg-purple-800 data-[state=active]:text-white transition-all px-6 py-2" 
              value="this_week"
            >
              This Week
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="container mx-auto ">
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        {movies.length > 0 && (
          <div className="relative">            
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent className="-ml-4">
                {movies.map((movie) => (
                  <CarouselItem key={movie.id} className="lg:basis-1/6 md:basis-1/4 sm:basis-1/3 basis-1/2 p-4">
                    <Card movie={movie} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-transparent text-white z-30 top-1/3 -left-16" />
              <CarouselNext className="bg-transparent text-white z-30 top-1/3 -right-16" />
            </Carousel>
          </div>
        )}
      </div>

      <div className="mr-auto ml-auto mt-16 w-full max-w-5xl">
        <h1 className="text-white text-3xl font-bold mb-4">Trending TV Shows</h1>
        <Tabs defaultValue={activeTab} onValueChange={handleTvTabChange}>
          <TabsList className="justify-center mb-8 bg-gray-900 border border-purple-700 rounded-full p-1">
            <TabsTrigger 
              className="text-gray-400 hover:text-white rounded-full data-[state=active]:bg-purple-800 data-[state=active]:text-white transition-all px-6 py-2" 
              value="today"
            >
              Today
            </TabsTrigger>
            <TabsTrigger 
              className="text-gray-400 hover:text-white rounded-full data-[state=active]:bg-purple-800 data-[state=active]:text-white transition-all px-6 py-2" 
              value="this_week"
            >
              This Week
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="container mx-auto mb-16">
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        {tvShows.length > 0 && (
          <div className="relative">            
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent className="-ml-4">
                {tvShows.map((tvShow) => (
                  <CarouselItem key={tvShow.id} className="lg:basis-1/6 md:basis-1/4 sm:basis-1/3 basis-1/2 p-4">
                    <Card movie={{
                      id: tvShow.id,
                      title: tvShow.name,
                      overview: tvShow.overview,
                      poster_path: tvShow.poster_path,
                      release_date: tvShow.first_air_date,
                      vote_average: tvShow.vote_average
                    }} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-transparent text-white z-30 top-1/3 -left-16" />
              <CarouselNext className="bg-transparent text-white z-30 top-1/3 -right-16" />
            </Carousel>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}