import React, { useEffect, useState } from 'react'
import '../Home/Home.css'
import Header from '../Header/Header'
import fetchCocktailData from '../../Utilities/APIcalls'
import { simplifyCategories, simplifyIngredients, formatSearchResults } from '../../Utilities/CleanUp'

const Home = () => {

  const [allCategories, setAllCategories] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [ingredientSearchResults, setIngredientSearchResults] = useState([]);
  const [categoryInput, setCategoryInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [ingredientInput, setIngredientInput] = useState('');

  useEffect(() => {
    fetchCocktailData(`https://www.thecocktaildb.com/api/json/v2/9973533/list.php?c=list`)
      .then(data => setAllCategories(simplifyCategories(data.drinks)))
  }, []);

  useEffect(() => {
    fetchCocktailData(`https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list`)
      .then(data => setAllIngredients(simplifyIngredients(data.drinks)))
  }, []);


  return (
    <div>
      <Header />
      <h1>HOME</h1>
    </div>
  )
}

export default Home
