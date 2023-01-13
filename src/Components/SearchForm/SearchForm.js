import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../SearchForm/SearchForm.css'

const SearchForm = () => {

  const [nameInput, setNameInput] = useState('');
  const [ingredientInput, setIngredientInput] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');

  useEffect(() => {
    if (ingredientInput !== '') {
      setNameInput('');
    }
  }, [ingredientInput]);

  useEffect(() => {
    if (nameInput !== '') {
      setIngredientInput('');
    }
  }, [nameInput]);

  const clearSearchFields = () => {
    setNameInput('');
    setIngredientInput('');
  }


  return (
    <form className='search-form'>
      <div className='search-type'>
        <p>Search By Cocktail Name</p>
        <input
          type='text'
          name='cocktail-name'
          placeholder='What are you in the mood for?'
          value={nameInput}
          onChange={event => setNameInput(event.target.value)}
        />
        <Link to={`/search/name/${nameInput}`}>
          <button onClick={clearSearchFields}>Let's Go</button>
        </Link>
      </div>
      <p>OR</p>
      <div className='search-type'>
        <p>Search By Ingredient</p>
        <input
          type='text'
          name='ingredient-name'
          placeholder='Dig a little deeper...'
          value={ingredientInput}
          onChange={event => setIngredientInput(event.target.value)}
        />
        <Link to={`/search/ingredientrequest/${ingredientInput}`}>
          <button onClick={clearSearchFields}>Let's Go</button>
        </Link>
      </div>
    </form>
  )
}

export default SearchForm
