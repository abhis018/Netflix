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
      <div>
        <VideoTitle title={original_title} overview={overview} movieId={id}/>
      </div>
    </div>
  )
}

export default MainContainer