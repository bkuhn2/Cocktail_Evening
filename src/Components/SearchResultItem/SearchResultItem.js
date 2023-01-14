import React from 'react'
import { Link } from 'react-router-dom'
import '../SearchResultItem/SearchResultItem.css'

const SearchResultItem = ({name, id, image}) => {
  return (
    <Link to={`/cocktaildetails/${id}`} className='result' id={id}>
      <img 
        src={image}
        alt={`Image of ${name}`}
        className='result-image'
      />
      <p className='result-text'>{name}</p>
    </Link>
  )
}

export default SearchResultItem
