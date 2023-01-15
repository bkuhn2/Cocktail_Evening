import React from 'react'
import '../IngredientResults/IngredientResults.css'
import Ingredient from '../Ingredient/Ingredient'

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
      {error && <h3>{error}</h3>}
    </section>
    </>
  )
}

export default IngredientResults
