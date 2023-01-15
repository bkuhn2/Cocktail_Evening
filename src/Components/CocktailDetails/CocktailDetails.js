import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../CocktailDetails/CocktailDetails.css'
import Header from '../Header/Header'
import fetchCocktailData from '../../Utilities/APIcalls'
import { formatCocktailData, generateIngredients } from '../../Utilities/CleanUp'

const CocktailDetails = () => {

  const [selectedCocktail, setSelectedCocktail] = useState({});
  const [saved, setSaved] = useState(Boolean); // useEffect to check saved array and there, TRUE
  let cocktailID = useParams().id;

  useEffect(() => {
    fetchCocktailData(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${cocktailID}`)
      .then(data => {
        setSelectedCocktail(formatCocktailData(data.drinks[0]))
      })
  }, [cocktailID]);

  const makeIngredientList = () => {
    if (selectedCocktail.ingredients) {
      return selectedCocktail.ingredients.map((ing, index) => {
        return (
          <li className='ingredient-li' key={index+1}>{ing}</li>
        )
      })
    }
  }

  return (
    <main className='details-page'>
      <Header />
      <section className='cocktail-details'>
        <img className='cocktail-detail-image' src={selectedCocktail.image} alt={`Image of ${selectedCocktail.name}`}/>
        <div className='cocktail-details-area'>
          <h2>{selectedCocktail.name}</h2>
          <p>{`Served in a ${selectedCocktail.glass}`}</p>
          <p>{selectedCocktail.hasAlcohol}</p>
          <p>Ingredients:</p>
          <ul>
            {makeIngredientList()}
          </ul>
          <p>{selectedCocktail.instructions}</p>
          <button className='add-button' type='button'>Add this to my event offerings</button> 
          {/* make conditional so that if it's already in there, this doesn't show, and lets them know once clicked */}
        </div>
      </section>
    </main>
  )
}

export default CocktailDetails
