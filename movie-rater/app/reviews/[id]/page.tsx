"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { ArrowLeft, ExternalLink, Star, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { get } from "@/app/lib/api";
import { reviews } from "@/app/types/tmdb";

export default function ReviewPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const [review, setReview] = useState<reviews | null>(null);
  const [loading, setLoading] = useState(true);

  const movieTitle = searchParams.get("movieTitle");
  const requestedReturnTo = searchParams.get("returnTo");
  const returnTo = requestedReturnTo?.startsWith("/") && !requestedReturnTo.startsWith("//")
    ? requestedReturnTo
    : "/";

  useEffect(() => {
    if (!id) return;

    async function fetchReview() {
      setLoading(true);
      try {
        const reviewData = await get(`/review/${id}`);
        setReview(reviewData);
      } catch (error) {
        console.error("Error fetching review:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReview();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-gray-950 p-8 text-white">Loading...</div>;
  }

  if (!review) {
    return <div className="min-h-screen bg-gray-950 p-8 text-white">No review found.</div>;
  }

  const avatarUrl = review.author_details.avatar_path
    ? review.author_details.avatar_path.startsWith("/https")
      ? review.author_details.avatar_path.substring(1)
      : `https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`
    : null;

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Header />

      <section className="container mx-auto max-w-4xl px-4 pb-20 pt-28">
        <Link href={returnTo} className="mb-8 inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white">
          <ArrowLeft size={18} />
          {returnTo === "/" ? "Back to home" : "Back to previous page"}
        </Link>

        {movieTitle && <p className="mb-3 text-purple-400">{movieTitle}</p>}
        <h1 className="mb-8 text-3xl font-bold md:text-5xl">Full Review</h1>

        <article className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-2xl">
          <header className="mb-8 flex items-start gap-4 border-b border-gray-800 px-6 pb-6 pt-6 md:px-10 md:pt-10">
            {avatarUrl ? (
              <Image src={avatarUrl} alt={review.author_details.username || review.author} width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-purple-800">
                <User size={24} />
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold">{review.author_details.username || review.author}</h2>
              <p className="mt-1 text-sm text-gray-400">
                {new Date(review.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            {review.author_details.rating !== null && (
              <div className="ml-auto flex items-center gap-1 rounded-full bg-yellow-500/20 px-3 py-1 text-yellow-400">
                <Star size={16} className="fill-yellow-400" />
                <span>{review.author_details.rating}/10</span>
              </div>
            )}
          </header>

          <div className="px-6 pb-6 whitespace-pre-line text-base leading-8 text-gray-200 md:px-10 md:pb-10 md:text-lg">
            {review.content}
          </div>

          {review.url && (
            <a href={review.url} target="_blank" rel="noopener noreferrer" className="mx-6 mb-6 inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 md:mx-10 md:mb-10">
              View original review
              <ExternalLink size={16} />
            </a>
          )}
        </article>
      </section>

      <Footer />
    </main>
  );
}