import { LucideVideo, Search, ChevronDown} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { link } from "fs";

export default function Header() {

  const[isMoviesOpen, setIsMoviesOpen] = useState(false);
  const[isTvOpen, setIsTvOpen] = useState(false);
  const[isCelebsOpen, setIsCelebsOpen] = useState(false);
  

  return (
    <header className="fixed top-0 left-0 w-full px-6 h-14 bg-black text-white flex items-justify gap-6 z-50">
    
      
      <div className="flex items-center gap-3">
        <LucideVideo className="text-purple-600" />
        <span className="font-semibold hover:text-purple-600 cursor-pointer"
        onClick={() => window.location.href = '/'}
        >CineBook</span>
      </div>

     
      <div className="flex items-center gap-6">
        <div className="relative">
        <button className="hover:text-gray-300 flex items-center gap-1"
        onMouseEnter={() => setIsMoviesOpen(true)}
        onMouseLeave={() => setIsMoviesOpen(false)}
        >
        Movies
        <ChevronDown size={16} className={`transition-transform ${isMoviesOpen ? 'rotate-180' : ''}`} />
        </button>
        {isMoviesOpen && (
          <div 
            className="absolute top-full left-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg py-2 z-10"
            onMouseEnter={() => setIsMoviesOpen(true)}
            onMouseLeave={() => setIsMoviesOpen(false)}
          >
             <Link href="/movies/popular" className="block w-full text-left px-4 py-2 hover:bg-purple-800 transition-colors">
                Popular
              </Link>
              <Link href="/movies/toprated" className="block w-full text-left px-4 py-2 hover:bg-purple-800 transition-colors">
                Top Rated
              </Link>
              <Link href="/movies/upcoming" className="block w-full text-left px-4 py-2 hover:bg-purple-800 transition-colors">
                Upcoming
              </Link>
              <Link href="/movies/nowplaying" className="block w-full text-left px-4 py-2 hover:bg-purple-800 transition-colors">
                Now Playing
              </Link>
          </div>
        )}
        </div>

        <div className="relative">
        <button className="hover:text-gray-300 flex items-center gap-1"
        onMouseEnter={() => setIsTvOpen(true)}
        onMouseLeave={() => setIsTvOpen(false)}
        >TV Shows  <ChevronDown size={16} className={`transition-transform ${isTvOpen ? 'rotate-180' : ''}`} /></button>
        {isTvOpen && (
          <div 
            className="absolute top-full left-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg py-2 z-10"
            onMouseEnter={() => setIsTvOpen(true)}
            onMouseLeave={() => setIsTvOpen(false)}
          >
             <Link href="/tv/popular" className="block w-full text-left px-4 py-2 hover:bg-purple-800 transition-colors">
                Popular
              </Link>
              <Link href="/tv/toprated" className="block w-full text-left px-4 py-2 hover:bg-purple-800 transition-colors">
                Top Rated
              </Link>
              <Link href="/tv/ontheair" className="block w-full text-left px-4 py-2 hover:bg-purple-800 transition-colors">
                On The Air
              </Link>
              <Link href="/tv/airingtoday" className="block w-full text-left px-4 py-2 hover:bg-purple-800 transition-colors">
                Airing Today
              </Link>
          </div>
        )}
        </div>

        <div className="relative">
        <button className="hover:text-gray-300 flex items-center gap-1"
        onMouseEnter={() => setIsCelebsOpen(true)}
        onMouseLeave={() => setIsCelebsOpen(false)}

        >Celebs <ChevronDown size={16} className={`transition-transform ${isCelebsOpen ? 'rotate-180' : ''}`} /></button>
        {isCelebsOpen && (
          <div 
            className="absolute top-full left-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg py-2 z-10"
            onMouseEnter={() => setIsCelebsOpen(true)}
            onMouseLeave={() => setIsCelebsOpen(false)}
          >
              <Link href="/celebs/popular" className="block w-full text-left px-4 py-2 hover:bg-purple-800 transition-colors">
                Popular
              </Link>
          </div>
        )}
        </div>



        <button className="hover:text-gray-300">More</button>
      </div>
      


        <div className="flex items-center gap-3 ml-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-600" size={18} />
            <input 
              type="text"
              placeholder="Search..."
              className="bg-black border border-gray-600 rounded-3xl pl-10 pr-4 py-1 text-white focus:outline-none focus:border-white"
            />
          </div>
        </div>
<div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-purple-800 to-purple-950"></div>

    </header>
  );
}
