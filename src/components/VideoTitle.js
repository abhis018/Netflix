import useMovieLogo from "./hooks.js/useMovieLogo";

const VideoTitle = ({title, overview, movieId}) => {
  const logoPath = useMovieLogo(movieId);
  return (
    <div className="absolute top-10 left-0 right-0 bottom-0 flex flex-col justify-center px-8 sm:px-12 lg:px-20 z-20 text-white">
      {logoPath ? (
        <img
          src={`https://image.tmdb.org/t/p/original${logoPath}`}
          alt="Movie Logo"
          className="h-28 sm:h-20 md:h-24 lg:h-28 xl:h-32 object-contain mb-12 self-start"
        />
      ) : (
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-md mb-4">{title}</h1>
          <p className="text-sm sm:text-base lg:text-sm font-normal max-w-xl drop-shadow-sm mb-3">
            {overview}
          </p>
        </div>
      )}
      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-4 py-1.5 bg-white text-black font-medium text-sm rounded hover:bg-gray-200 transition duration-200">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Play
        </button>

        <button className="flex items-center gap-2 px-4 py-1.5 bg-gray-700 bg-opacity-70 text-white font-medium text-sm rounded hover:bg-gray-600 transition duration-200">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 
              10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z"/>
          </svg>
          More Info
        </button>
      </div>
    </div>
  )
}

export default VideoTitle