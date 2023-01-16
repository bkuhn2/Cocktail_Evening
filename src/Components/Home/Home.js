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
  const [APIerror, setAPIError] = useState('');
  const [error, setError] = useState('');
  const [ingError, setIngError] = useState('');
  let cocktailName = useParams().name;
  let cocktailIngredient = useParams().ingredient;

  useEffect(() => {
    fetchCocktailData(`https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list`)
      .then(data => {
        console.log('initial data: ', data);
        setAllIngredients(simplifyIngredients(data.drinks))
      })
      .catch(error => {
        setAPIError('Failed to load page, our apologies.')
      })
  }, []);

  useEffect(() => {
    if (cocktailName) {
      setError('');
      findCocktailsByName();
    } else {
      setError('');
      setSearchResults([])
    };
    if (cocktailIngredient) {
      setError('');
      findCocktailsByIngredient();
    } else {
      setError('');
      setSearchResults([])
    };
  }, [cocktailName, cocktailIngredient])

  const findCocktailsByName = () => {
    fetchCocktailData(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${cocktailName}`)
      .then(data => {
        console.log('name data: ', data);
        if (!data.drinks) {
          throw new Error(`Apologies, we couldn't find anything matching "${cocktailName}."`)
        } else {
          setSearchResults(formatSearchResults(data.drinks));
        }
      })
      .catch(error => {
        setError(error.message);
      })
  }

  const findCocktailsByIngredient = () => {
    fetchCocktailData(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${cocktailIngredient}`)
      .then(data => {
        if (!data.drinks || data.drinks === 'None Found') {
          throw new Error(`Apologies, we couldn't find drinks with ${cocktailIngredient}, but check back as we're always updated our storerooms.`)
        } else {
          setSearchResults(formatSearchResults(data.drinks));
        }
      })
      .catch(error => {
        setError(error.message);
      })
  }

  const makeNamesList = (input) => {
    if (input) {
      findMatchingIngredients(input);
    } else {
      setIngError('');
      setIngredientSearchResults([]);
    }
  }

  const findMatchingIngredients = (input) => {
    const searchWords = input.toLowerCase().split(' ').filter(word =>  word !== '');
    const ingredientMatches = searchWords.reduce((matchingWords, word) => {
      const matches = allIngredients.filter(ing => ing.toLowerCase().includes(word));
      matches.forEach(match => {
        if (!matchingWords.includes(match)) {
          matchingWords = [...matchingWords, match]
        }
      });
      return matchingWords;
    }, []);
    if (ingredientMatches.length === 0) {
      setIngError(`Couldn't find any matching ingredients.`);
      console.log('error ingredientMatches: ', ingredientMatches);
    } else {
      console.log('success ingredientMatches: ', ingredientMatches);
      setIngError('');
      setIngredientSearchResults(ingredientMatches);
    }
  }

  return (
    <main className='home-page'>
      <Header />
      <h1 className='home-title'>Peruse our Plethora of Cocktails</h1>
      {APIerror && <h2>{APIerror}</h2>}
      {!APIerror && 
        <section className='search-section'>
          <div className='search-input-area'>
            <SearchForm 
              makeNamesList={makeNamesList} 
            />
            <IngredientResults 
              ingredientSearchResults={ingredientSearchResults}
              error={ingError} 
            />
          </div>
          <section className='search-display'>
            {(!error && searchResults.length !== 0) && <SearchResultsDisplay searchResults={searchResults}/>}
            {error && <h2>{error}</h2>}
            {/*conditional if no search results and no error and no ingreds, display text letting user know that results display here */}
            {/* if there's an error, display that
            if there's search results, display SearchResultsDisplay
            */}
          </section>
        </section>
      }
    </main>
  )
}

export default Home
