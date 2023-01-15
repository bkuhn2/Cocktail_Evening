import React from 'react'
import { NavLink } from 'react-router-dom'
import '../Header/Header.css'

const Header = () => {
  return (
    <header>
      <h1 className='page-title'>Cocktail Evening </h1>
      <nav className='nav-panel'>
        <NavLink to='/'>
          <h2 className='link-text'>Find Cocktails</h2>
        </NavLink>
        <NavLink to='/myevent'>
          <h2 className='link-text'>My Event</h2>
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
