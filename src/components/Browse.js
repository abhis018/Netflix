import Header from './Header';
import useNowPlayingMovies from './hooks.js/useNowPlayingMovies';
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer"


const Browse = () => {
 useNowPlayingMovies();

  return (
    <div className='bg-[#141414] text-white p-4'>
      <Header/>
      <MainContainer/>
      <SecondaryContainer/>
    </div>
  )
}

export default Browse