import { useDispatch } from "react-redux";
import { API_OPTION } from "../../utils/constant";
import { addTrendingMovies } from "../../utils/moviesSlice";
import { useEffect } from "react";


const useTrendingMovies = () => {
    const dispatch = useDispatch();

  const getTrendingMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', API_OPTION);
    const json = await data.json();
    dispatch(addTrendingMovies(json.results));
    console.log(json)
  }

  useEffect(() => {
    getTrendingMovies();
  },[]);
}


export default useTrendingMovies;