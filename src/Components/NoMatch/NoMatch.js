import React from 'react'
import '../NoMatch/NoMatch.css'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'

const NoMatch = () => {
  return (
    <main>
      <Header />
      <section className='wrong-way-section'>
        <h1>Looks like something got a little mixed up, head back to the party</h1>
        <Link to='/'>
          <button className='go-back-button'>OK</button>
        </Link>
      </section>
    </main>
  )
}

export default NoMatch
