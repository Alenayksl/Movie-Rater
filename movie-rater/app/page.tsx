"use client"
import { useState , useEffect } from "react";
import { movie, tvShow, video,  celeb, reviews } from "./types/tmdb";
import { get } from "./lib/api";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
import VideoCard from "./components/VideoCard";
import CelebCard from "./components/CelebCard";
import ReviewsCard from "./components/ReviewsCard";

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
  const [videos, setVideos] = useState<(video & { movieTitle: string; movieId: number })[]>([]);
  const [celebs, setCelebs] = useState<celeb[]>([]);
  const [reviews, setReviews] = useState<reviews[]>([]);

  async function getReviews() {
    setLoading(true);
    setError(null);
    try {
      const reviewsPromises = movies.slice(0, 10).map(async (movie) => {
        try {
          const data = await get(`/movie/${movie.id}/reviews?language=en-US&page=1`);
          return data.results;
        } catch (error) {
          console.error(`Failed to fetch reviews for movie ${movie.id}`, error);
          return [];
        }
      });

      const allReviewsArrays = await Promise.all(reviewsPromises);
      const allReviews = allReviewsArrays.flat();
      
      const sortedReviews = allReviews.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      const topReviews = sortedReviews.slice(0, 10);
      console.log(topReviews);
      setReviews(topReviews);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch reviews.");
    } finally {
      setLoading(false);
    }
  }

  async function getCelebs() {
    setLoading(true);
    setError(null);
    try {
      const data = await get("/trending/person/day?language=en-US");
      console.log(data);
      setCelebs(data.results);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch celebs.");
    } finally {
      setLoading(false);
    }
  }

  async function getVideosForMovies(movies: movie[]) {
    setLoading(true);
    setError(null);
    try {
      const videoPromises = movies.slice(0, 10).map(async (movie) => {
        try {
          const data = await get(`/movie/${movie.id}/videos?language=en-US`);
          const trailer = (data.results || []).find((v: video) =>
            v.site === "YouTube" &&
            (v.type === "Trailer" || v.type === "Teaser")
          );
          if (trailer) {
            return {
              ...trailer,
              movieTitle: movie.title,
              movieId: movie.id
            };
          }
          return null;
        } catch (error) {
          console.error(`Failed to fetch videos for movie ${movie.id}`, error);
          return null;
        }
      });
      
      const allVideos = await Promise.all(videoPromises);
      const validVideos = allVideos.filter(v => v !== null);
      setVideos(validVideos);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch videos.");
    } finally {
      setLoading(false);
    }
  }

  async function getVideosForTvShows(tvShows: tvShow[]) { 
    setLoading(true);
    setError(null);
    try {
      const videoPromises = tvShows.slice(0, 10).map(async (tvShow) => {
        try {
          const data = await get(`/tv/${tvShow.id}/videos?language=en-US`);
          const trailer = (data.results || []).find((v: video) =>
            v.site === "YouTube" &&
            (v.type === "Trailer" || v.type === "Teaser")
          );
          if (trailer) {
            return {
              ...trailer,
              movieTitle: tvShow.name,
              movieId: tvShow.id
            };
          }
          return null;
        } catch (error) {
          console.error(`Failed to fetch videos for TV show ${tvShow.id}`, error);
          return null;
        }
      });
      const allVideos = await Promise.all(videoPromises);
      const validVideos = allVideos.filter(v => v !== null);
      setVideos(validVideos);
    }
    catch (error) {
      console.error(error);
      setError("Failed to fetch videos.");
    } finally {
      setLoading(false);
    }
  }

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

   function handleTabChange(value: string) {
    setActiveTab(value);
    if (value === "today") {
      getMovieListToday();
    } else if (value === "this_week") {
      getMovieListThisWeek();
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

  async function handleVideosTabChange(value: string) {
    setActiveTab(value);
    if (value === "movies") {
      getVideosForMovies(movies);
    } else if (value === "tv_shows") {
      getVideosForTvShows(tvShows);
    }   
  }

  useEffect(() => {
    getTvShowListToday();
  }, []);

  useEffect(() => {
    getMovieListToday();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      getVideosForMovies(movies);
    }
  }, [movies]);

  useEffect(() => {
    getCelebs();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      getReviews();
    }
  }, [movies]);

  return (
    <main className="min-h-screen pt-20 px-6">
      <Header />
<div style = {{backgroundImage: 'url(/icons/video-background.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
{/* self note: video-background video alanında background olarak kullanılacak. */}
 <div className="mr-auto ml-auto mt-5 w-full max-w-5xl">
        <h1 className="text-white text-3xl font-bold mb-4">Trending Trailers</h1>
        <Tabs defaultValue="movies" onValueChange={handleVideosTabChange}>
          <TabsList className="justify-center mb-8 bg-gray-900 border border-purple-700 rounded-full p-1">
            <TabsTrigger 
              className="text-gray-400 hover:text-white rounded-full data-[state=active]:bg-purple-800 data-[state=active]:text-white transition-all px-6 py-2" 
              value="movies"
            >
              Movies
            </TabsTrigger>
            <TabsTrigger 
              className="text-gray-400 hover:text-white rounded-full data-[state=active]:bg-purple-800 data-[state=active]:text-white transition-all px-6 py-2" 
              value="tv_shows"
            >
              TV Shows
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="container mx-auto mb-16">
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        {videos.length > 0 && (
          <div className="relative">            
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent className="-ml-4">
                {videos.map((video) => (
                  <CarouselItem key={video.id} className="lg:basis-1/3 md:basis-1/2 basis-1 p-4">
                    <VideoCard video={video} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-transparent text-white z-30 top-1/2 -left-16" />
              <CarouselNext className="bg-transparent text-white z-30 top-1/2 -right-16" />
            </Carousel>
          </div>
        )}
      </div>
      </div>

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

      <div className="mr-auto ml-auto mt-16 w-full max-w-5xl">
        <h1 className="text-white text-3xl font-bold mb-4">Popular Celebrities</h1>
      </div>
      <div className="container mx-auto mb-16">
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        {celebs.length > 0 && (
          <div className="relative">            
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent className="-ml-4">
                {celebs.map((celeb) => (
                  <CarouselItem key={celeb.id} className="lg:basis-1/6 md:basis-1/5 sm:basis-1/4 basis-1/3 p-4">
                    <CelebCard celeb={celeb} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-transparent text-white z-30 top-1/2 -left-16" />
              <CarouselNext className="bg-transparent text-white z-30 top-1/2 -right-16" />
            </Carousel>
          </div>
        )}
      </div>

      <div className="mr-auto ml-auto mt-16 w-full max-w-5xl">
        <h1 className="text-white text-3xl font-bold mb-4">Latest Reviews</h1>
      </div>
      <div className="container mx-auto mb-16">
        {error && <p className="text-red-500 text-center">{error}</p>} 
        {reviews.length > 0 && (
          <div className="relative">            
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent className="-ml-4">
                {reviews.map((review) => (
                  <CarouselItem key={review.id} className="lg:basis-1/3 md:basis-1/2 basis-1 p-4">
                    <ReviewsCard review={review} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-transparent text-white z-30 top-1/2 -left-16" />
              <CarouselNext className="bg-transparent text-white z-30 top-1/2 -right-16" />
            </Carousel>
          </div>
        )}
      </div>
        

      <Footer />

    </main>
  );
}