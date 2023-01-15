import React from 'react'
import '../EventOfferings/EventOfferings.css'
import EventCocktail from '../EventCocktail/EventCocktail'

const EventOfferings = ({eventOfferings, removeCocktail}) => {
  
  const eventCocktails = eventOfferings.map(cocktail => {
    return <EventCocktail cocktail={cocktail} removeCocktail={removeCocktail}/>
  })

  return (
    <div className='event-cocktails-section'>
      {eventCocktails}
    </div>
  )
}

export default EventOfferings
