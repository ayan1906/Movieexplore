import React from 'react'

const Hero = () => {
  return (
    <div className="min-h-screen bg-[#0d0f17] text-white selection:bg-rose-500 selection:text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-rose-600/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        {/* Navbar */}
        <nav className="navbar flex items-center justify-between py-6 border-b border-white/10">
          <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-rose-500 to-amber-400 bg-clip-text text-transparent cursor-pointer">
            MovieExplorer
          </h1>
          <button className="px-5 py-2 text-sm font-medium text-white/90 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-200 backdrop-blur-sm cursor-pointer hover:border-white/25">
            Movies
          </button>
        </nav>

        {/* Hero Section */}
        <div className="homesection flex flex-col items-center justify-center text-center pt-28 pb-20">
          <span className="px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-rose-400 uppercase bg-rose-500/10 border border-rose-500/20 rounded-full">
            Unlimited Entertainment
          </span>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight max-w-3xl leading-tight">
            Discover <span className="bg-gradient-to-r from-rose-500 via-pink-400 to-amber-400 bg-clip-text text-transparent">Movies</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-xl font-normal leading-relaxed">
            Explore and discover your favorite movies from around the world.
          </p>

          <button className="mt-10 px-8 py-4 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-semibold text-base rounded-full shadow-lg shadow-rose-600/30 hover:shadow-rose-600/50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer">
            Explore Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero