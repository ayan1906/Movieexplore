import{ useState, useEffect } from 'react'

const Moviecard = () => {
    const [allMovies, setAllMovies] = useState([])
    const [visibleCount, setVisibleCount] = useState(12)  
    const [text, settext] = useState('')
    const [selectedMovie, setSelectedMovie] = useState(null)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const fetchdata = await fetch('https://api.tvmaze.com/shows')
                const response = await fetchdata.json()
                setAllMovies(response)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchMovies()
    }, [])


    const searchmovie = allMovies.filter((movie) =>
        movie.name.toLowerCase().includes(text.toLowerCase())
    )


    const displayedMovies = searchmovie.slice(0, visibleCount)


    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 12)
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto">
                
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-rose-500 to-amber-400 bg-clip-text text-transparent mb-3">
                        Explore Shows & Movies
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base mb-6">
                        Find your favorite series and cinema with detailed ratings and insights
                    </p>

                    <div className="relative">
                        <input
                            value={text}
                            type="text"
                            placeholder="Search movie title..."
                            onChange={(e) => {
                                settext(e.target.value)
                                setVisibleCount(12) 
                            }}
                            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl py-3.5 pl-12 pr-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 shadow-lg shadow-black/40 transition-all text-sm sm:text-base"
                        />
                        <svg
                            className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                            />
                        </svg>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {displayedMovies.map((movie) => {
                        const releaseYear = movie.premiered ? movie.premiered.split('-')[0] : 'N/A'
                        const rating = movie.rating?.average ? movie.rating.average.toFixed(1) : '—'

                        return (
                            <div
                                key={movie.id}
                                className="group bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-rose-950/30 transition-all duration-300 flex flex-col justify-between">
                                
                                <div className="relative overflow-hidden aspect-[2/3] bg-slate-800">
                                    <img
                                        src={movie.image?.original || movie.image?.medium || 'https://via.placeholder.com/300x450?text=No+Image'}
                                        alt={movie.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />

                                    <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5 shadow-md">
                                        <span className="text-amber-400 text-xs">★</span>
                                        <span className="text-xs font-semibold text-white">{rating}</span>
                                    </div>

                                    <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 text-[11px] font-medium text-slate-300">
                                        {releaseYear}
                                    </div>
                                </div>

                                <div className="p-4 flex flex-col flex-grow justify-between gap-3">
                                    <div>
                                        <h3 className="font-bold text-sm sm:text-base text-slate-100 group-hover:text-rose-400 transition-colors line-clamp-1">
                                            {movie.name}
                                        </h3>
                                        <p className="text-xs text-slate-400 mt-1">
                                            {movie.genres?.slice(0, 2).join(' • ') || 'Entertainment'}
                                        </p>
                                    </div>

                                    <button onClick={() => setSelectedMovie(movie)} className="w-full py-2.5 px-4 bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm active:scale-95 cursor-pointer">
                                        See Details
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {displayedMovies.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">No movie found matching "{text}"</p>
                    </div>
                )}

                {visibleCount < searchmovie.length && (
                    <div className="flex justify-center mt-12">
                        <button
                            onClick={handleLoadMore}
                            className="px-8 py-3.5 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-semibold text-sm sm:text-base rounded-full shadow-lg shadow-rose-600/30 hover:shadow-rose-600/50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer">
                            Load More Movies
                        </button>
                    </div>
                )}
            </div>
            {selectedMovie && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setSelectedMovie(null)} 
                >
                    <div
                        className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full relative shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()} // ভেতরের ক্লিকে বন্ধ হওয়া আটকায়
                    >
                        <button
                            onClick={() => setSelectedMovie(null)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold cursor-pointer transition duration-150"
                        >
                            ✕
                        </button>

                        <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                            <img
                                src={selectedMovie.image?.original || selectedMovie.image?.medium}
                                alt={selectedMovie.name}
                                className="w-36 h-52 object-cover rounded-xl shadow-md"
                            />
                            <div className="flex-1 text-left space-y-2">
                                <h2 className="text-2xl font-bold text-rose-500">
                                    {selectedMovie.name}
                                </h2>
                                <p className="text-xs text-slate-400">
                                    <strong>Language:</strong> {selectedMovie.language || 'N/A'}
                                </p>
                                <p className="text-xs text-slate-400">
                                    <strong>Genres:</strong> {selectedMovie.genres?.join(', ') || 'N/A'}
                                </p>
                                <p className="text-xs text-slate-400">
                                    <strong>Rating:</strong> ⭐ {selectedMovie.rating?.average || 'N/A'}
                                </p>
                                <p className="text-xs text-slate-400">
                                    <strong>Premiered:</strong> {selectedMovie.premiered || 'N/A'}
                                </p>
                            </div>
                        </div>

                        {/* সামারি বা বিবরণ (HTML ট্যাগ ক্লিন করে দেখানো) */}
                        <div className="mt-4 pt-4 border-t border-slate-800">
                            <p className="text-xs sm:text-sm text-slate-300 line-clamp-4 leading-relaxed">
                                {selectedMovie.summary?.replace(/<[^>]*>?/gm, '') || 'No summary available.'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Moviecard