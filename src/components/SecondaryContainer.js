import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div>
      <div className='-mt-28 relative z-20 px-2'>
        <MovieList  title={"Now Playing"} movies={movies.nowPlayingMovies}/>
        <MovieList  title={"Popular"} movies={movies.popularMovies}/>
        <MovieList  title={"Trending"} movies={movies.trendingMovies}/>
        <MovieList  title={"Upcoming Movies"} movies={movies.upcomingMovies}/>
        <MovieList  title={"Horror"} movies={movies.horrorMovies}/>
        <MovieList  title={"Comedy"} movies={movies.comedyMovies}/>
        <MovieList  title={"Action"} movies={movies.actionMovies}/>
      </div>
    </div>
  )
}

export default SecondaryContainer