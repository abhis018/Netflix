import { useDispatch, useSelector } from "react-redux";
import { API_OPTION } from "../../utils/constant";
import { addTrendingMovies } from "../../utils/moviesSlice";
import { useEffect } from "react";


const useTrendingMovies = () => {
    const dispatch = useDispatch();
    const trendingMovies = useSelector((store) => store.movies.trendingMoviesrMovies)

  const getTrendingMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', API_OPTION);
    const json = await data.json();
    dispatch(addTrendingMovies(json.results));
  }

  useEffect(() => {
    !trendingMovies && getTrendingMovies();
  },[]);
}


export default useTrendingMovies;