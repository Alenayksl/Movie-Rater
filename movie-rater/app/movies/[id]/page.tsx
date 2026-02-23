"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  movie,
  credits,
  videos,
  reviewResults,
} from "@/app/types/tmdb";
import { get } from "@/app/lib/api";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ReviewsCard from "@/app/components/ReviewsCard";
import Card from "@/app/components/Card";

export default function ContentPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<movie | null>(null);
  const [credits, setCredits] = useState<credits | null>(null);
  const [trailers, setTrailers] = useState<videos | null>(null);
  const [movieReviews, setMovieReviews] = useState<reviewResults | null>(null);
  const [similarMovies, setSimilarMovies] = useState<movie[] | null>(null);
  const [loading, setLoading] = useState(true);

  const allVideos = trailers ? trailers.results : [];
  const mainTrailer = allVideos.find(video => video.type === "Trailer" && video.official) || allVideos[0];
  const otherVideos = allVideos.filter(video => video.id !== mainTrailer?.id);

  useEffect(() => {
    if (!id) return;

    async function fetchMovieData() {
      setLoading(true);

      console.log("Fetching movie with ID:", id);

      try {
        const similarMoviesResponse = await get(`/movie/${id}/similar?language=en-US&page=1`);
        setSimilarMovies(similarMoviesResponse.results);

        const movieData = await get(`/movie/${id}?language=en-US`);
        setMovie(movieData);

        const creditsData = await get(`/movie/${id}/credits?language=en-US`);
        setCredits(creditsData);

        const trailersData = await get(`/movie/${id}/videos?language=en-US`);
        setTrailers(trailersData);

        const reviewsData = await get(`/movie/${id}/reviews?language=en-US`);
        setMovieReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
      setLoading(false);
    }
    fetchMovieData();
  }, [id]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!movie) {
    return <div className="p-8">No movie data found.</div>;
  }

  return (
    <main>
      <Header />

      {/* Hero Section with Backdrop */}
      <section className="relative">
        <div className="absolute inset-0 bg-linear-to-t from-gray-900 to-transparent z-10"></div>
        <div
          className="h-130 bg-cover bg-center opacity-30 "
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
          }}
        ></div>
      </section>

      {/* Main Contentsel */}
      <section className="container mx-auto px-4 -mt-110 relative z-20 mb-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Postersel */}
          <div className="flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-64 h-96 object-cover rounded-lg shadow-2xl"
            />
          </div>

          {/* Movie Detailssel */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl text-gray-200 font-bold mb-4">
              {movie.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <span className="text-yellow-400 text-2xl font-bold">★</span>
                <span className="text-2xl font-bold ml-2 text-gray-200">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-400 ml-1">/ 10</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-300">{movie.release_date}</span>

              {movie.runtime && (
                <>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-300">
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </span>
                </>
              )}
            </div>

            {/* Genressel */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-200">
                  Genres
                </h2>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Directorssel */}
            {credits &&
              credits.crew.filter((member) => member.job === "Director")
                .length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2 text-gray-200">
                    Director
                    {credits.crew.filter((member) => member.job === "Director")
                      .length > 1
                      ? "s"
                      : ""}
                  </h2>
                  <p className="text-gray-300 text-lg">
                    {credits.crew
                      .filter((member) => member.job === "Director")
                      .map((director) => director.name)
                      .join(", ")}
                  </p>
                </div>
              )}

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-200">
                Overview
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="p-8">
        {/* Castsel */}
        <section className="container mx-auto px-4 mb-12">
          {credits && credits.cast.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-200">
                Cast
              </h2>
              <Carousel
                opts={{
                  align: "start",
                  loop: false,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-3 md:-ml-5">
                  {credits.cast.slice(0, 20).map((castMember) => (
                    <CarouselItem
                      key={castMember.id}
                      className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                    >
                      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-grab active:cursor-grabbing">
                        {castMember.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w300${castMember.profile_path}`}
                            alt={castMember.name}
                            className="w-full h-64 object-cover"
                          />
                        ) : (
                          <div className="w-full h-64 bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-500">No Image</span>
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="text-sm font-semibold text-gray-200 truncate">
                            {castMember.name}
                          </h3>
                          <p className="text-xs text-gray-400 truncate">
                            as {castMember.character}
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          )}
        </section>

{trailers && trailers.results.length > 0 && (
  <section className="container mx-auto px-4 mb-12">
    <h2 className="text-2xl font-semibold mb-4 text-gray-200">Trailer & Videos</h2>

    <div>
      {mainTrailer && (
        <div className="mb-8">
          <div className="aspect-w-16 h-150">
            <iframe
              src={`https://www.youtube.com/embed/${mainTrailer.key}`}
              title={mainTrailer.name}
              allowFullScreen
              className="w-full h-full rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      )}

      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 md:-ml-5">
          {otherVideos.map((video) => (
            <CarouselItem
              key={video.id}
              className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name}
                  allowFullScreen
                  className="w-full h-full rounded-lg shadow-lg"
                ></iframe>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  </section>
)}

        {/* reviews sectionsal */}
        <section className="container mx-auto px-6 mb-12">
          {movieReviews && movieReviews.results.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-200">Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                {movieReviews.results.map((review) => (
                  <ReviewsCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* similar movies section */}
        <section className="container mx-auto px-6 mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-200">Similar Movies</h2>
          <Carousel>
            <CarouselContent className="-ml-3 md:-ml-5">
              {similarMovies && similarMovies.length > 0 && (
                <>
                  {similarMovies.map((similarMovie) => (
                    <CarouselItem
                      key={similarMovie.id}
                      className="pl-2 md:pl-4  xl:basis-1/8"
                    >
                      
                  <Card movie={similarMovie} />

                    
                    </CarouselItem>
                  ))}
                </>
              )}
            </CarouselContent>
          </Carousel>
        </section>

        <Footer />
      </div>
    </main>
  );
}
