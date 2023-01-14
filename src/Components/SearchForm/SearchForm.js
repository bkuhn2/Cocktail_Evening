import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import '../SearchForm/SearchForm.css'

const SearchForm = ({makeNamesList}) => {
  const [nameInput, setNameInput] = useState('');
  const [ingredientInput, setIngredientInput] = useState(''); //error handling for things like periods, comma, slashes
  let cocktailName = useParams().name;

  useEffect(() => {
    if (ingredientInput) {
      setNameInput('');
    } 
    makeNamesList(ingredientInput);
  }, [ingredientInput]);

  useEffect(() => {
    if (nameInput) {
      setIngredientInput('');
    } 
  }, [nameInput]);

  useEffect(() => {
    setNameInput('')
  }, [cocktailName])

  return (
    <form className='search-form'>
      <div className='search-type'>
        <p className='search-input-heading'>Know What Cocktail You're Searching For?</p>
        <input
          type='text'
          name='cocktail-name'
          placeholder='Search by name'
          value={nameInput}
          onChange={event => setNameInput(event.target.value)}
        />
        <Link to={`/nameResults/${nameInput}`}>
          <button className='search-button' type='button'>Find</button>
        </Link>
      </div>
      <div className='search-type'>
        <p className='search-input-heading'>Or, Search By What's Inside</p>
        <input
          type='text'
          name='ingredient-name'
          placeholder='Search by ingredient'
          value={ingredientInput}
          onChange={event => setIngredientInput(event.target.value)}
        />
      </div>
    </form>
  )
}

export default SearchForm
