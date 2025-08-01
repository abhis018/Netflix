import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import client from "../utils/openAI";
import { API_OPTION } from "../utils/constant";
import { addGptMovieResult } from "../utils/gptSlice";


const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector(store => store.config.lang);
  const searchText = useRef(null);


  const searchMovieTMDB = async(movie) => {
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+ movie +'&include_adult=false&language=en-US&page=1', API_OPTION);
    const json = await data.json();
    return json.results;
  }

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value); 

    const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query" + searchText.current.value + ". only give me names of 5 movies, and comma separated like the example given ahead. Example Result: Hera pheri, Don, Bajrangi Bhaijaan, Sholay, Tarzan";

    const gptResults = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'developer', content: 'Talk like a pirate.' },
        { role: 'user', content: gptQuery },
      ],
    });
    console.log(gptResults.choices[0].message.content);
    const gptMovies = gptResults.choices[0].message.content.split(",");

    const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie)) ;

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);

    dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}))
  }

  return (
    <div className="flex items-center justify-center pt-[30%] md:pt-[8%] px-4">
        <form className="w-full max-w-2xl bg-black grid grid-cols-12 rounded-lg shadow-lg" onSubmit={(e) => e.preventDefault()}>
            <input ref={searchText} type="text" className="col-span-9 p-3 m-2 rounded-lg text-black focus:outline-none" placeholder={lang[langKey].gptSearchPlaceholder}/>
            <button className="py-2 px-4 m-2 col-span-3 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg transition duration-200" onClick={handleGptSearchClick}>{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar;