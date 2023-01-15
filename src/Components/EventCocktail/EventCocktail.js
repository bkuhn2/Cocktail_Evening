import React from 'react'
import '../EventCocktail/EventCocktail.css'

const EventCocktail = ({cocktail, removeCocktail}) => {

  const makeIngredientList = () => {
    if (cocktail.ingredients) {
      return cocktail.ingredients.map((ing, index) => {
        return (
          <li className='ingredient-li' key={index+1}>{ing}</li>
        )
      })
    }
  }

  const handleDelete = (event) => {
    event.preventDefault();
    removeCocktail(cocktail.id);
  }

  return (
    <div>
      <p>{cocktail.name}</p>
      <img className='event-cocktail-image' src={cocktail.image} alt={`${cocktail.name} image`}/>
      <ul>
        {makeIngredientList()}
      </ul>
      <button onClick={event => handleDelete(event)}>Remove from my event</button>
    </div>
  )
}

export default EventCocktail
