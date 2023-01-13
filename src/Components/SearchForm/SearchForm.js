import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../SearchForm/SearchForm.css'

const SearchForm = () => {

  const [nameInput, setNameInput] = useState('');
  const [ingredientInput, setIngredientInput] = useState('');

  return (
    <form className='search-form'>
      <div className='search-type'>
        <p>Search By Cocktail Name</p>
        <input />
        <Link to={`/search/${nameInput}`}>
          <button>Let's Go</button>
        </Link>
      </div>
      <p>OR</p>
      <div className='search-type'>
        <p>Search By Ingredient</p>
        <input />
        <button>Let's Go</button>
      </div>
    </form>
  )
}

export default SearchForm
