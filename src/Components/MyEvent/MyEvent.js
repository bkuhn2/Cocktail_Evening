import React from 'react'
import '../MyEvent/MyEvent.css'
import Header from '../Header/Header'
import EventOfferings from '../EventOfferings/EventOfferings'

const MyEvent = ({eventOfferings, removeCocktail}) => {
  return (
    <main className='event-page'>
      <Header />
      <section className='event-section'>
        <h1 className='event-heading'>MY EVENT</h1>
        {eventOfferings.length === 0 && <h2>Browse our cocktail selection to find items to add to your event</h2>}
        {eventOfferings.length !== 0 && <EventOfferings eventOfferings={eventOfferings} removeCocktail={removeCocktail} />}
      </section>
    </main>
  )
}

export default MyEvent
