"use client"
import { useState } from "react";
import { movie } from "./types/tmdb";
import { get } from "./lib/api";
import Header from "./components/Header";

export default function Home() {
  const [movies, setMovies] = useState<movie[]>([]);

  async function getMovieList() {
   try {
 const data = await get("/trending/movie/day?language=en-US");
   console.log(data);
   setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  }
  
    return (
    <main className="bg-gradient-to-r from-black to-purple-950 flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <button onClick={getMovieList}>get Movie List</button>
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </main>
  );
}