"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Card from "@/app/components/Card";
import { get } from "@/app/lib/api";
import { celebCredits, celebDetails, movie, tvShow } from "@/app/types/tmdb";

export default function CelebDetailsPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const [celeb, setCeleb] = useState<celebDetails | null>(null);
  const [credits, setCredits] = useState<celebCredits | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchCelebDetails() {
      setLoading(true);
      try {
        const [celebData, creditsData] = await Promise.all([
          get(`/person/${id}?language=en-US`),
          get(`/person/${id}/combined_credits?language=en-US`),
        ]);
        setCeleb(celebData);
        setCredits(creditsData);
      } catch (error) {
        console.error("Error fetching celebrity details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCelebDetails();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-white">Loading...</div>;
  }

  if (!celeb) {
    return <div className="p-8 text-white">No celebrity data found.</div>;
  }

  const works = (credits?.cast ?? [])
    .filter((work) => work.poster_path)
    .sort((first, second) => second.vote_average - first.vote_average)
    .slice(0, 20);

  const requestedReturnTo = searchParams.get("returnTo");
  const returnTo = requestedReturnTo?.startsWith("/") && !requestedReturnTo.startsWith("//")
    ? requestedReturnTo
    : "/celebs/popular";

  return (
    <main className="min-h-screen bg-gray-950">
      <Header />

      <section className="container mx-auto px-4 pt-28 pb-12">
        <Link href={returnTo} className="mb-8 inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white">
          <ArrowLeft size={18} />
          {returnTo === "/celebs/popular" ? "Back to celebs" : "Back to previous page"}
        </Link>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="shrink-0">
            {celeb.profile_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/h632${celeb.profile_path}`}
                alt={celeb.name}
                width={288}
                height={420}
                className="h-[420px] w-72 rounded-lg object-cover shadow-2xl"
              />
            ) : (
              <div className="flex h-[420px] w-72 items-center justify-center rounded-lg bg-gray-800 text-gray-400">
                No Image
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">{celeb.name}</h1>
            <p className="mb-6 text-lg text-purple-400">{celeb.known_for_department}</p>

            <div className="mb-8 grid gap-4 text-gray-300 sm:grid-cols-2">
              {celeb.birthday && <p><span className="text-gray-500">Birthday:</span> {celeb.birthday}</p>}
              {celeb.place_of_birth && <p><span className="text-gray-500">Birthplace:</span> {celeb.place_of_birth}</p>}
              {celeb.deathday && <p><span className="text-gray-500">Deathday:</span> {celeb.deathday}</p>}
            </div>

            <h2 className="mb-3 text-2xl font-semibold text-white">Biography</h2>
            <p className="max-w-4xl whitespace-pre-line text-lg leading-relaxed text-gray-300">
              {celeb.biography || "No biography available."}
            </p>
          </div>
        </div>
      </section>

      {works.length > 0 && (
        <section className="container mx-auto px-4 pb-16">
          <h2 className="mb-6 text-2xl font-semibold text-white">Known For</h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {works.map((work) => (
              "title" in work ? (
                <Card key={`movie-${work.id}`} movie={work as movie} />
              ) : (
                <Card key={`tv-${work.id}`} tvShow={work as tvShow} />
              )
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}