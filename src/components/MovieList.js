import MovieCards from './MovieCards'

const MovieList = ({title, movies}) => {
    if(!movies) return;
     console.log(movies);
  return (
    <div>
        <h1 className='text-1xl font-bold py-2'>{title}</h1>
        <div className='flex overflow-x-scroll scrollbar-hide'>
            <div className='flex'>
                {movies.map(movie => <MovieCards key={movie.id} posterPath={movie.poster_path}/>)}
            </div>
        </div>
    </div>
   
  )
}

export default MovieList