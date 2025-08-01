import { useEffect } from "react";
import { API_OPTION } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../../utils/moviesSlice";


const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const trailerVideo = useSelector((store) => store.movies.trailerVideo)
    const getMovieVideos = async () => {
        try{
            const data = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '/videos?language=en-US', API_OPTION);
            const json = await data.json();
            if (!json?.results || !Array.isArray(json.results)) {
                console.warn("No video results found:", json);
                return;
            }
            const filterData = json.results.filter(video => video.type === "Trailer");
            const trailer = filterData.length ? filterData[0] : json.results[0];
            if (trailer) dispatch(addTrailerVideo(trailer));
        }catch (err) {
            console.error("Failed to fetch trailer video:", err);
        }
    };

    useEffect(() => {
        !trailerVideo && getMovieVideos();
    },[])

}

export default useMovieTrailer