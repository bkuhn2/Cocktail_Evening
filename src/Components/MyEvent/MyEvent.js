import React from 'react'
import '../MyEvent/MyEvent.css'
import Header from '../Header/Header'
import EventOfferings from '../EventOfferings/EventOfferings'
import PropTypes, { object } from 'prop-types'

const MyEvent = ({eventOfferings, removeCocktail}) => {
  return (
    <main className='event-page'>
      <Header />
      <section className='event-section'>
        <h1 className='event-heading'>My Event</h1>
        {eventOfferings.length === 0 && <h2 className='event-instructions'>Browse our cocktail selection to find items to add to your event.</h2>}
        {eventOfferings.length !== 0 && <EventOfferings eventOfferings={eventOfferings} removeCocktail={removeCocktail} />}
      </section>
    </main>
  )
}

export default MyEvent;

MyEvent.propTypes = {
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
