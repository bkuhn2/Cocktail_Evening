import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../CocktailDetails/CocktailDetails.css'
import Header from '../Header/Header'
import fetchCocktailData from '../../Utilities/APIcalls'
import { formatCocktailData, generateIngredients } from '../../Utilities/CleanUp'

const CocktailDetails = ({addCocktail, eventOfferings}) => {

  const [selectedCocktail, setSelectedCocktail] = useState();
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  let cocktailID = useParams().id;

  useEffect(() => {
    fetchCocktailData(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${cocktailID}`)
      .then(data => {
        console.log(data);
        if (!data.drinks || data.drinks.length === 0) {
          throw new Error(`Looks like we're missing some data here, we'll get this corrected soon.`)
        } else {
          setSelectedCocktail(formatCocktailData(data.drinks[0]));
        }
      })
      .catch(error => {
        setError(error.message);
      })
  }, [cocktailID]);

  useEffect(() => {
    if (selectedCocktail) {
      setError('');
      evaluateIfSaved();
    }
  }, [selectedCocktail])

  const makeIngredientList = () => {
    if (selectedCocktail.ingredients) {
      return selectedCocktail.ingredients.map((ing, index) => {
        return (
          <li className='ingredient-li' key={index+1}>{ing}</li>
        )
      })
    }
  }

  const evaluateIfSaved = () => {
    if (eventOfferings.find(item => item.id === selectedCocktail.id)) {
      setSaved(true);
    }
  }

  const addToEvent = (event) => {
    event.preventDefault();
    addCocktail(selectedCocktail);
    setSaved(true);
  }

  return (
    <main className='details-page'>
      <Header />
      {error && <h2 className='detail-status-message'>{error}</h2>}
      {(!selectedCocktail && !error) && <h2 className='detail-status-message'>Be right there with your request...</h2>}
      {(selectedCocktail && !error) &&
        <section className='cocktail-details'>
          <img className='cocktail-detail-image' src={selectedCocktail.image} alt={`Image of ${selectedCocktail.name}`}/>
          <div className='cocktail-details-area'>
            <h2>{selectedCocktail.name}</h2>
            <p>{`Served in a ${selectedCocktail.glass}`}</p>
            {!selectedCocktail.hasAlcohol && <p>Non-alcoholic</p>}
            <p>Ingredients:</p>
            <ul>
              {makeIngredientList()}
            </ul>
            <p>{selectedCocktail.instructions}</p>
            {!saved && 
              <button onClick={event => addToEvent(event)} className='add-button' type='button'>Add this to my event offerings</button>
            }
            {saved && <p>This cocktail is included in your event offering.</p>} 
          </div>
        </section>
      }
    </main>
  )
}

export default CocktailDetails
