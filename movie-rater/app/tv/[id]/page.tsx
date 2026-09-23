"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { credits, reviewResults, tvShow, videos } from "../../types/tmdb";
import { get } from "@/app/lib/api";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ReviewsCard from "@/app/components/ReviewsCard";
import Card from "@/app/components/Card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

export default function TvContentPage(){
    const { id } = useParams();
    const [show, setShow] = useState<tvShow | null>(null);
    const [credits, setCredits] = useState<credits | null>(null);
    const [trailers, setTrailers] = useState<videos | null>(null);
    const [tvReviews, setTvReviews] = useState<reviewResults | null>(null);
    const [similarTv, setSimilarTv] = useState<tvShow[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [showAllTvReviews, setShowAllTvReviews] = useState(false);

    const allVideos = trailers ? trailers.results : [];
    const mainTrailer = allVideos.find(video => video.type === "Trailer" && video.official) || allVideos[0];
    const otherVideos = allVideos.filter(video => video.id !== mainTrailer?.id);

    useEffect(() => {
        if (!id) return;

        const fetchTvShowDetails = async () => {
            setLoading(true);
            try {
                const [tvShowData, creditsData, trailersData, reviewsData, similarTvData] = await Promise.all([
                    get(`/tv/${id}?language=en-US`),
                    get(`/tv/${id}/credits?language=en-US`),
                    get(`/tv/${id}/videos?language=en-US`),
                    get(`/tv/${id}/reviews?language=en-US`),
                    get(`/tv/${id}/similar?language=en-US&page=1`),
                ]);
                
                setShow(tvShowData);
                setCredits(creditsData);
                setTrailers(trailersData);
                setTvReviews(reviewsData);
                setSimilarTv(similarTvData.results);
            } catch (error) {
                console.error("Error fetching TV show details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTvShowDetails();
    }, [id]);

    if (loading) {
        return <div className="p-8 text-white">Loading...</div>;
    }

    if (!show) {
        return <div className="p-8 text-white">No TV show data found.</div>;
    }

    const runtime = show.episode_run_time?.[0];

    return (
        <main className="min-h-screen bg-gray-950">
            <Header />

            <section className="relative">
                <div className="absolute inset-0 z-10 bg-linear-to-t from-gray-900 to-transparent" />
                <div
                    className="h-130 bg-cover bg-center opacity-30"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${show.backdrop_path || show.poster_path || ""})`,
                    }}
                />
            </section>

            <section className="container relative z-20 mx-auto -mt-110 mb-12 px-4">
                <div className="flex flex-col gap-8 md:flex-row">
                    <div className="shrink-0">
                        {show.poster_path ? (
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                alt={show.name}
                                width={500}
                                height={384}
                                className="h-96 w-64 rounded-lg object-cover shadow-2xl"
                            />
                        ) : (
                            <div className="flex h-96 w-64 items-center justify-center rounded-lg bg-gray-800 text-gray-400">
                                No Image
                            </div>
                        )}
                    </div>

                    <div className="flex-1">
                        <h1 className="mb-4 text-4xl font-bold text-gray-200 md:text-5xl">{show.name}</h1>
                        <div className="mb-6 flex flex-wrap items-center gap-4">
                            <div className="flex items-center">
                                <span className="text-2xl font-bold text-yellow-400">★</span>
                                <span className="ml-2 text-2xl font-bold text-gray-200">{show.vote_average.toFixed(1)}</span>
                                <span className="ml-1 text-gray-400">/ 10</span>
                            </div>
                            <span className="text-gray-400">|</span>
                            <span className="text-gray-300">{show.first_air_date}</span>
                            {show.number_of_seasons !== undefined && (
                                <>
                                    <span className="text-gray-400">|</span>
                                    <span className="text-gray-300">
                                        {show.number_of_seasons} season{show.number_of_seasons === 1 ? "" : "s"}
                                    </span>
                                </>
                            )}
                            {runtime && (
                                <>
                                    <span className="text-gray-400">|</span>
                                    <span className="text-gray-300">{runtime} min/episode</span>
                                </>
                            )}
                        </div>

                        {show.genres && show.genres.length > 0 && (
                            <div className="mb-6">
                                <h2 className="mb-2 text-xl font-semibold text-gray-200">Genres</h2>
                                <div className="flex flex-wrap gap-2">
                                    {show.genres.map((genre) => (
                                        <span key={genre.id} className="rounded-full bg-gray-700 px-3 py-1 text-sm text-gray-200">
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <h2 className="mb-3 text-xl font-semibold text-gray-200">Overview</h2>
                        <p className="text-lg leading-relaxed text-gray-300">{show.overview || "No overview available."}</p>
                    </div>
                </div>
            </section>

            <div className="p-8">
                {credits && credits.cast.length > 0 && (
                    <section className="container mx-auto mb-12 px-4">
                        <h2 className="mb-4 text-2xl font-semibold text-gray-200">Cast</h2>
                        <Carousel opts={{ align: "start", loop: false }} className="w-full">
                            <CarouselContent className="-ml-3 md:-ml-5">
                                {credits.cast.slice(0, 20).map((castMember) => (
                                    <CarouselItem key={castMember.id} className="basis-1/2 pl-2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 md:pl-4">
                                        <Link href={`/celebs/${castMember.id}?returnTo=${encodeURIComponent(`/tv/${show.id}`)}`} className="block overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-transform hover:scale-105">
                                            {castMember.profile_path ? (
                                                <Image src={`https://image.tmdb.org/t/p/w300${castMember.profile_path}`} alt={castMember.name} width={300} height={256} className="h-64 w-full object-cover" />
                                            ) : (
                                                <div className="flex h-64 items-center justify-center bg-gray-700 text-gray-500">No Image</div>
                                            )}
                                            <div className="p-4">
                                                <h3 className="truncate text-sm font-semibold text-gray-200">{castMember.name}</h3>
                                                <p className="truncate text-xs text-gray-400">as {castMember.character}</p>
                                            </div>
                                        </Link>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </section>
                )}

                {trailers && trailers.results.length > 0 && (
                    <section className="container mx-auto mb-12 px-4">
                        <h2 className="mb-4 text-2xl font-semibold text-gray-200">Trailer & Videos</h2>
                        {mainTrailer && (
                            <div className="mb-8 h-150">
                                <iframe src={`https://www.youtube.com/embed/${mainTrailer.key}`} title={mainTrailer.name} allowFullScreen className="h-full w-full rounded-lg shadow-lg" />
                            </div>
                        )}
                        <Carousel opts={{ align: "start", loop: false }} className="w-full">
                            <CarouselContent className="-ml-3 md:-ml-5">
                                {otherVideos.map((video) => (
                                    <CarouselItem key={video.id} className="basis-1/2 pl-2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 md:pl-4">
                                        <div className="aspect-video">
                                            <iframe src={`https://www.youtube.com/embed/${video.key}`} title={video.name} allowFullScreen className="h-full w-full rounded-lg shadow-lg" />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </section>
                )}

                {tvReviews && tvReviews.results.length > 0 && (
                    <section className="container mx-auto mb-12 px-6">
                        <h2 className="mb-4 text-2xl font-semibold text-gray-200">Reviews</h2>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
                            {tvReviews.results.slice(0, showAllTvReviews ? undefined : 3).map((review) => <ReviewsCard key={review.id} review={review} returnTo={`/tv/${show.id}`} />)}
                        </div>
                        {tvReviews.results.length > 3 && (
                            <button
                                type="button"
                                aria-label={showAllTvReviews ? "Show fewer reviews" : "Show all reviews"}
                                title={showAllTvReviews ? "Show fewer reviews" : "Show all reviews"}
                                onClick={() => setShowAllTvReviews((current) => !current)}
                                className="mx-auto mt-6 flex text-gray-400 transition-all hover:scale-110 hover:text-purple-400"
                            >
                                <ChevronDown className={`transition-transform ${showAllTvReviews ? "rotate-180" : ""}`} size={30} />
                            </button>
                        )}
                    </section>
                )}

                {similarTv && similarTv.length > 0 && (
                    <section className="container mx-auto mb-12 px-6">
                        <h2 className="mb-4 text-2xl font-semibold text-gray-200">Similar TV Shows</h2>
                        <Carousel>
                            <CarouselContent className="-ml-3 md:-ml-5">
                                {similarTv.map((similarShow) => (
                                    <CarouselItem key={similarShow.id} className="basis-1/2 pl-2 md:basis-1/4 md:pl-4 xl:basis-1/8">
                                        <Card tvShow={similarShow} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </section>
                )}

                <Footer />
            </div>
        </main>
    );
}