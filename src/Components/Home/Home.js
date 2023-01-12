import React, { useState } from 'react'
import '../Home/Home.css'
import Header from '../Header/Header'

const Home = () => {

  const [allCategories, setAllCategories] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [ingredientSearchResults, setIngredientSearchResults] = useState([]);
  const [categoryInput, setCategoryInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [ingredientInput, setIngredientInput] = useState('');

  return (
    <div>
      <Header />
      <h1>HOME</h1>
    </div>
  )
}

export default Home
