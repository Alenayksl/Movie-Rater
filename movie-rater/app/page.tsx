"use client"
import { useState , useEffect } from "react";
import { movie } from "./types/tmdb";
import { get } from "./lib/api";
import Header from "./components/Header";
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
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("today");

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
  
    return (
    <main className="bg-linear-to-r from-black to-purple-950 min-h-screen pt-20 px-6">
      <Header />

      <div className="mr-auto ml-auto mt-5 w-full max-w-5xl">
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
        {loading && <p className="text-white text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        {movies.length > 0 && (
          <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 h-full w-100 bg-linear-to-r from-black via-black/60 to-transparent z-10"></div>
            <div className="pointer-events-none absolute right-0 top-0 h-full w-100 bg-linear-to-l from-purple-950 via-purple-950/60 to-transparent z-10"></div>
            
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent className="-ml-4">
                {movies.map((movie) => (
                  <CarouselItem key={movie.id} className="lg:basis-1/6 md:basis-1/4 sm:basis-1/3 basis-1/2 p-4">
                    <Card movie={movie} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-transparent text-white z-20" />
              <CarouselNext className="bg-transparent text-white z-20" />
            </Carousel>
          </div>
        )}
      </div>
    </main>
  );
}