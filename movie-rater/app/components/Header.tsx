import { LucideVideo, Search} from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full px-6 h-14 bg-black text-white flex items-justify gap-6 z-50">
    
      
      <div className="flex items-center gap-3">
        <LucideVideo className="text-purple-600" />
        <span className="font-semibold">CineBook</span>
      </div>

     
      <div className="flex items-center gap-6">
        <button className="hover:text-gray-300 ">Movies</button>
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
<div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-800 to-purple-950"></div>

    </header>
  );
}
