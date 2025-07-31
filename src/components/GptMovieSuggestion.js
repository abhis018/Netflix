import { useSelector } from "react-redux"

const GptMovieSuggestion = () => {
  const { movieNames, movieResults } = useSelector(store => store.gpt);
  if(!movieNames) return null
  return (
    <div className="p-4 m-4 bg-black">
      

    </div>
  )
}

export default GptMovieSuggestion