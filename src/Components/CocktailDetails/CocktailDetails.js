import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../CocktailDetails/CocktailDetails.css'
import Header from '../Header/Header'
import fetchCocktailData from '../../Utilities/APIcalls'
import { formatCocktailData, generateIngredients } from '../../Utilities/CleanUp'
import PropTypes, { object } from 'prop-types'


const CocktailDetails = ({addCocktail, eventOfferings}) => {

  const [selectedCocktail, setSelectedCocktail] = useState();
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  let cocktailID = useParams().id;

  useEffect(() => {
    fetchCocktailData(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${cocktailID}`)
      .then(data => {
        if (!data.drinks || data.drinks.length === 0) {
          throw new Error(`Looks like there's some missing data or an error, try another cocktail or check with site administrator.`)
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
            <h2 className='selected-cocktail-name'>{selectedCocktail.name}</h2>
            <p className='selected-cocktail-glass'>{`Served in a ${selectedCocktail.glass}`}</p>
            {!selectedCocktail.hasAlcohol && <p>Non-alcoholic</p>}
            <p className='selected-cocktail-ingredients-header'>Ingredients:</p>
            <ul className='selected-cocktail-ingredients-list'>
              {makeIngredientList()}
            </ul>
            <p className='selected-cocktail-instructions'>{selectedCocktail.instructions}</p>
            {!saved && 
              <button onClick={event => addToEvent(event)} className='add-button' type='button'>Add this to my event offerings</button>
            }
            {saved && <p className='saved-message'>This cocktail is included in your event offering.</p>} 
          </div>
        </section>
      }
    </main>
  )
}

export default CocktailDetails;

CocktailDetails.propTypes = {
  addCocktail: PropTypes.func.isRequired,
  eventOfferings: PropTypes.arrayOf(PropTypes.shape({
    glass: PropTypes.string,
    hasAlcohol: PropTypes.bool,
    id: PropTypes.string,
    image: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    instructions: PropTypes.string,
    name: PropTypes.string
  })).isRequired
};