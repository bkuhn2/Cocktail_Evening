import React from 'react'
import { Link } from 'react-router-dom'
import '../SearchResultItem/SearchResultItem.css'
import PropTypes from 'prop-types'

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

export default SearchResultItem;

SearchResultItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}
