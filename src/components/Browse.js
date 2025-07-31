import { useSelector } from 'react-redux';
import GptSearch from './GptSearch';
import Header from './Header';
import useNowPlayingMovies from './hooks.js/useNowPlayingMovies';
import usePopularMovies from './hooks.js/usePopularMovies';
import useTrendingMovies from './hooks.js/useTrendingMovies';
import useUpcomingMovies from './hooks.js/useUpcomingMovies';
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer"


const Browse = () => {
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);
 useNowPlayingMovies();
 usePopularMovies();
 useTrendingMovies();
 useUpcomingMovies();

  return (
    <div className='bg-[#141414] text-white p-4'>
      <Header/>
      {
        showGptSearch ? <GptSearch/> :<>
        <MainContainer/>
        <SecondaryContainer/>
        </>
      }
      
    </div>
  )
}

export default Browse