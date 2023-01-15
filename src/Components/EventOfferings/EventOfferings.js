import React from 'react'
import '../EventOfferings/EventOfferings.css'
import EventCocktail from '../EventCocktail/EventCocktail'
import PropTypes from 'prop-types'


const EventOfferings = ({eventOfferings, removeCocktail}) => {

  const eventCocktails = eventOfferings.map(cocktail => {
    return <EventCocktail cocktail={cocktail} removeCocktail={removeCocktail} key={cocktail.id}/>
  })

  return (
    <div className='event-cocktails-section'>
      {eventCocktails}
    </div>
  )
}

export default EventOfferings;

EventOfferings.propTypes = {
  eventOfferings: PropTypes.arrayOf(PropTypes.shape({
    glass: PropTypes.string,
    hasAlcohol: PropTypes.bool,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    instructions: PropTypes.string,
    name: PropTypes.string.isRequired
  })).isRequired,
  removeCocktail: PropTypes.func.isRequired
}