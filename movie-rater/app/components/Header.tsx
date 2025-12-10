

import { LucideVideo, Search, ChevronDown} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Header() {

  const[isMoviesOpen, setIsMoviesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full px-6 h-14 bg-black text-white flex items-justify gap-6 z-50">
    
      
      <div className="flex items-center gap-3">
        <LucideVideo className="text-purple-600" />
        <span className="font-semibold">CineBook</span>
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
             <button className="w-full text-left px-4 py-2 hover:bg-purple-800 transition-colors"
              >
                <Link href="/movies/popular">
                Popular
                </Link>
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-purple-800 transition-colors">
                Top Rated
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-purple-800 transition-colors">
                Upcoming
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-purple-800 transition-colors">
                Now Playing
              </button>
          </div>
        )}
        </div>

        <button className="hover:text-gray-300">TV Shows</button>
        <button className="hover:text-gray-300">Celebs</button>
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
