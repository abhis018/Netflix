import { useDispatch, useSelector } from "react-redux";
import { API_OPTION } from "../../utils/constant";
import { addNowPlayingMovies } from "../../utils/moviesSlice";
import { useEffect } from "react";


const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies);

  const getNowPlayingMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTION);
    const json = await data.json();
    dispatch(addNowPlayingMovies(json.results));
  }

  useEffect(() => {
    if(!nowPlayingMovies) getNowPlayingMovies();
  },[]);
}


export default useNowPlayingMovies;