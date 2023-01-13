import React from 'react'
import '../SearchResultsDisplay/SearchResultsDisplay.css'
import SearchResultItem from '../SearchResultItem/SearchResultItem'

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

  return (
    <div className='search-results-display'>
      {results}
    </div>
  )
}

export default SearchResultsDisplay
