import { useSelector } from "react-redux";
import useMovieTrailer from "./hooks.js/useMovieTrailer";

const VideoBackground = ({movieId}) => {
    const trailerVideo = useSelector(store => store.movies?.trailerVideo)
    useMovieTrailer(movieId);
     if (!trailerVideo) return null;
  return (
    <div className="top-0 left-0 w-[100%] h-screen z-0">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0`}
        title="YouTube video player"
        allow="autoplay; encrypted-media"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  )
}

export default VideoBackground