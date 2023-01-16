import React from 'react'
import '../SearchResultsDisplay/SearchResultsDisplay.css'
import SearchResultItem from '../SearchResultItem/SearchResultItem'
import { Link, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

const SearchResultsDisplay = ({searchResults}) => {
  const results = searchResults.map(result => {
    return (
      <SearchResultItem 
        name={result.name}
        id={result.id}
        image={result.image} 
        key={result.id}
      />
    )
  })

  let cocktailName = useParams().name;
  let cocktailIngredient = useParams().ingredient;

  return (
    <>
      {cocktailName && <h2 className='search-result-heading'>{`"${cocktailName}"`}</h2>}
      {cocktailIngredient && <h2 className='search-result-heading'>{`"${cocktailIngredient}"`}</h2>}
      <Link to='/' className='clear-area'>
        <button className='clear-button' type='button'>clear results</button>
      </Link>
      <div className='search-results-display'>
        {results}
      </div>
    </>
  )
}

export default SearchResultsDisplay;

SearchResultsDisplay.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
}
