import React, { useEffect, useState } from 'react'
import '../SearchForm/SearchForm.css'

const SearchForm = ({searchByName, makeNamesList, selectAnIngredient, setSearchResults}) => {

  const [nameInput, setNameInput] = useState('');
  const [ingredientInput, setIngredientInput] = useState(''); //error handling for things like periods, comma, slashes

  useEffect(() => {
    if (ingredientInput) {
      setNameInput('');
    } else {
      setSearchResults([])
    }
    makeNamesList(ingredientInput);
    selectAnIngredient('');
  }, [ingredientInput]);

  useEffect(() => {
    if (nameInput) {
      setIngredientInput('');
      selectAnIngredient('');
      searchByName(nameInput);
    } else {
      setSearchResults([]);
    }
  }, [nameInput]);

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
