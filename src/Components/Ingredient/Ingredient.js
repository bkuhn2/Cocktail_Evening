import React from 'react'
import { Link } from 'react-router-dom'
import '../Ingredient/Ingredient.css'

const Ingredient = ({name, selectAnIngredient}) => {

  const chooseThisIngredient = (text) => {
    selectAnIngredient(text);
  }

  return (
    <button 
      className='ingredient'
      onClick={event => chooseThisIngredient(event.target.innerText)}
    >
      {name}
    </button>
  )
}

export default Ingredient
