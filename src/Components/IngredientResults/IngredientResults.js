import React from 'react'
import '../IngredientResults/IngredientResults.css'
import Ingredient from '../Ingredient/Ingredient'
import PropTypes from 'prop-types'

const IngredientResults = ({ingredientSearchResults, error}) => {

  const ingredients = ingredientSearchResults.map((ing, index) => {
    return (
      <Ingredient name={ing} key={index+1} />
    )
  })
  
  return (
    <>
      <section className='ingredient-results-area'>
      {(!error && ingredientSearchResults.length !== 0) && 
        <h2 className='select-ing-header'>Select an ingredient to see cocktails that match</h2>
      }
      {(!error && ingredientSearchResults.length !== 0) &&
        <div className='ingredients-results'>
          {ingredients}
        </div>
      }
      {error && <h3 className='ing-error'>{error}</h3>}
      </section>
    </>
  )
}

export default IngredientResults;

IngredientResults.propTypes = {
  ingredientSearchResults: PropTypes.arrayOf(PropTypes.string).isRequired,
  error: PropTypes.string.isRequired
}
