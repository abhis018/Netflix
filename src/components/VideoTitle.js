import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
        <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 lg:px-24 z-20 text-black">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold drop-shadow-md leading-tight mb-4 max-w-4xl">
                {title}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl font-medium max-w-2xl drop-shadow-sm mb-6">
                {overview}
            </p>
            <div className="flex gap-4">
                <button className="flex items-center gap-2 px-6 py-2 bg-white text-black font-semibold text-lg rounded hover:bg-gray-200 transition duration-200">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    Play
                </button>

                <button className="flex items-center gap-2 px-6 py-2 bg-gray-700 bg-opacity-70 text-white font-semibold text-lg rounded hover:bg-gray-600 transition duration-200">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
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