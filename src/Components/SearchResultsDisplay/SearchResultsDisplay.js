import React from 'react'
import '../SearchResultsDisplay/SearchResultsDisplay.css'
import SearchResultItem from '../SearchResultItem/SearchResultItem'
import { Link, useParams } from 'react-router-dom'

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
      {cocktailName && <h2>{`"${cocktailName}"`}</h2>}
      {cocktailIngredient && <h2>{`"${cocktailIngredient}"`}</h2>}
      <Link to='/' className='clear-area'>
        <button className='clear-button' type='button'>clear results</button>
      </Link>
      <div className='search-results-display'>
        {results}
      </div>
    </>
  )
}

export default SearchResultsDisplay
