import React from 'react'
import { Link } from 'react-router-dom'
import '../Header/Header.css'

const Header = () => {
  return (
    <div>
      <h1>HEADER</h1>
      <Link to='/myevent'>
        <h2>HERE</h2>
      </Link>
      <Link to='/'>
        <h2>home</h2>
      </Link>
    </div>
  )
}

export default Header
