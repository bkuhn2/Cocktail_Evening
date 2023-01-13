import React from 'react'
import '../IngredientResults/IngredientResults.css'
import Ingredient from '../Ingredient/Ingredient'

const IngredientResults = ({ingredientSearchResults, selectAnIngredient}) => {

  const ingredients = ingredientSearchResults.map((ing, index) => {
    return (
      <Ingredient name={ing} key={index+1} selectAnIngredient={selectAnIngredient}/>
    )
  })
  
  return (
    <>
      <section className='ingredient-results-area'>
      {ingredientSearchResults.length !== 0 && 
        <h2 className='select-ing-header'>Select an ingredient to see cocktails that match</h2>
      }
      {ingredientSearchResults.length !== 0 &&
        <div className='ingredients-results'>
          {ingredients}
        </div>
      }


    </section>

    </>
  )
}

export default IngredientResults
