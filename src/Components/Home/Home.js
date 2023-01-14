import React, { useEffect, useState } from 'react'
import '../Home/Home.css'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import IngredientResults from '../IngredientResults/IngredientResults'
import SearchResultsDisplay from '../SearchResultsDisplay/SearchResultsDisplay'
import fetchCocktailData from '../../Utilities/APIcalls'
import { simplifyIngredients, formatSearchResults } from '../../Utilities/CleanUp'
import { useParams } from 'react-router-dom'

const Home = () => {

  const [allIngredients, setAllIngredients] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [ingredientSearchResults, setIngredientSearchResults] = useState([]);
  const [error, setError] = useState('');
  let cocktailName = useParams().name;
  let cocktailIngredient = useParams().ingredient;

  useEffect(() => {
    fetchCocktailData(`https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list`)
      .then(data => setAllIngredients(simplifyIngredients(data.drinks)))
  }, []);

  useEffect(() => {
    if (cocktailName) {
      setError('');
      findCocktailsByName();
    } else {
      setError('');
      setSearchResults([])
    }

    if (cocktailIngredient) {
      setError('');
      findCocktailsByIngredient();
    } else {
      setError('');
      setSearchResults([])
    }
  }, [cocktailName, cocktailIngredient])

  const findCocktailsByName = () => {
    fetchCocktailData(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${cocktailName}`)
      .then(data => {
        //error handling - make sure we throw error if we get nothing back, i.e. data.drinks === null
        setSearchResults(formatSearchResults(data.drinks));
      })
  }

  const findCocktailsByIngredient = () => {
    fetchCocktailData(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${cocktailIngredient}`)
      .then(data => {
        //error handling - just because they give it to you on the ingrediences list does not mean its there
        setSearchResults(formatSearchResults(data.drinks));
      })
  }

  const makeNamesList = (input) => {
    if (input) {
      findMatchingIngredients(input);
      //error handling, error message reset
    } else {
      setIngredientSearchResults([]);
      //error handling, error message reset
    }
  }

  const findMatchingIngredients = (input) => {
    const searchWords = input.toLowerCase().split(' ').filter(word =>  word !== ''); //error handling for things like periods, comma, slashes
    const ingredientMatches = searchWords.reduce((matchingWords, word) => {
      const matches = allIngredients.filter(ing => ing.toLowerCase().includes(word));
      matches.forEach(match => {
        if (!matchingWords.includes(match)) {
          matchingWords = [...matchingWords, match]
        }
      });
      return matchingWords;
    }, []);
      setIngredientSearchResults(ingredientMatches)
  }

  return (
    <main className='home-page'>
      <Header />
      <h1>Peruse our Plethora of Cocktails</h1>
      <section className='search-section'>
        <div className='search-input-area'>
          <SearchForm 
            makeNamesList={makeNamesList} 
          />
          <IngredientResults 
            ingredientSearchResults={ingredientSearchResults} 
          />
        </div>
        <section className='search-display'>
          {(!error && searchResults.length !== 0) && <SearchResultsDisplay searchResults={searchResults} />}
          {/*conditional if no search results and no error and no ingreds, display text letting user know that results display here */}
          {/* if there's an error, display that
          if there's search results, display SearchResultsDisplay
          */}
        </section>
      </section>
    </main>
  )
}

export default Home
