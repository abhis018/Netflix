import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'

const MainContainer = () => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies);
    if(!movies) return;

    const mainMovie = movies[1];
    const {original_title, overview, id} = mainMovie;


  return (
    <div className='relative w-full h-screen'>
        <VideoBackground movieId={id}/>
        <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 lg:px-20 z-20 text-white bg-gradient-to-r from-black/80 via-transparent to-transparent">
        <VideoTitle title={original_title} overview={overview} movieId={id}/>
      </div>
    </div>
  )
}

export default MainContainer