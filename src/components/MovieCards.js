import React from 'react'
import { IMG_CDN_URL } from '../utils/constant'

const MovieCards = ({posterPath}) => {
  if(!posterPath) return null;
  return (
    <div className='w-44 pr-2 m-1'>
        <img alt="Movie-Img" src={IMG_CDN_URL + posterPath}/>
    </div>
  )
}

export default MovieCards