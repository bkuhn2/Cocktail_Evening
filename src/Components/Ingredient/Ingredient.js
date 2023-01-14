import React from 'react'
import { Link } from 'react-router-dom'
import '../Ingredient/Ingredient.css'

const Ingredient = ({name}) => {
  return (
    <Link to={`/ingredientResults/${name}`}>
      <button className='ingredient'>{name}</button>
    </Link>
  )
}

export default Ingredient
