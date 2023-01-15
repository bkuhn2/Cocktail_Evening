import React from 'react'
import { Link } from 'react-router-dom'
import '../EventCocktail/EventCocktail.css'
import PropTypes from 'prop-types'

const EventCocktail = ({cocktail, removeCocktail}) => {

  const makeIngredientList = () => {
    if (cocktail.ingredients) {
      return cocktail.ingredients.map((ing, index) => {
        return (
          <li className='event-ingredient-li' key={index+1}>{ing}</li>
        )
      })
    }
  }

  const handleDelete = (event) => {
    event.preventDefault();
    removeCocktail(cocktail.id);
  }

  return (
    <div className='event-cocktail-item'>
      <p className='event-cocktail-name'>{cocktail.name}</p>
      <Link to={`/cocktaildetails/${cocktail.id}`}>
        <img className='event-cocktail-image' src={cocktail.image} alt={`${cocktail.name} image`}/>
      </Link>
      <ul>
        {makeIngredientList()}
      </ul>
      <button className='delete-button' onClick={event => handleDelete(event)}>Remove from my event</button>
    </div>
  )
}

export default EventCocktail;

EventCocktail.propTypes = {
  cocktail: PropTypes.object.isRequired,
  removeCocktail: PropTypes.func.isRequired
}