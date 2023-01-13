import React, { useEffect, useState } from 'react'
import '../Home/Home.css'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import fetchCocktailData from '../../Utilities/APIcalls'
import { simplifyCategories, simplifyIngredients, formatSearchResults } from '../../Utilities/CleanUp'
import { useParams } from 'react-router-dom'

const Home = () => {

  const [allIngredients, setAllIngredients] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [ingredientSearchResults, setIngredientSearchResults] = useState([]);
  const searchTerm = useParams().searchTerm;
  const ingredientRequest = useParams().ingredientRequest;
  const ingredientTerm = useParams().ingredientTerm

  const findCocktailsByName = () => {
    fetchCocktailData(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${searchTerm}`)
      .then(data => {
        //error handling - make sure we throw error if we get nothing back, i.e. data.drinks === null
        setSearchResults(formatSearchResults(data.drinks));
      })
  }

  const findCocktailsByIngredient = () => {
    fetchCocktailData(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${ingredientTerm}`)
      .then(data => {
        setSearchResults(formatSearchResults(data.drinks));
      })
  }

  useEffect(() => {
    fetchCocktailData(`https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list`)
      .then(data => setAllIngredients(simplifyIngredients(data.drinks)))
  }, []);

  useEffect(() => {
    if (searchTerm) {
      findCocktailsByName();
      //error handling, error message reset
    } else {
      setSearchResults([])
      //error handling, error message reset
    }
  }, [searchTerm]);

  useEffect(() => {
    if (ingredientTerm) {
      findCocktailsByIngredient();
      //error handling, error message reset
    } else {
      setSearchResults([]);
      //error handling, error message reset
    }
  }, [ingredientTerm])

  return (
    <div>
      <Header />
      <h1>Peruse our Plethora of Cocktails</h1>
      <main className='search-section'>
        <SearchForm />
        <section className='search-display'>
          {/*conditional if no search results and no error and no ingreds, display text letting user know that results display here */}
          {/* if there's an error, display that
          if there's search results, display SearchResultsDisplay
          if there's ingredienceResults, display that        */}
        </section>
      </main>
    </div>
  )
}

export default Home
