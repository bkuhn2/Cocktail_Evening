import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../CocktailDetails/CocktailDetails.css'
import Header from '../Header/Header'
import fetchCocktailData from '../../Utilities/APIcalls'
import { formatCocktailData, generateIngredients } from '../../Utilities/CleanUp'

const CocktailDetails = () => {

  const [selectedCocktail, setSelectedCocktail] = useState({});
  let cocktailID = useParams().id;

  useEffect(() => {
    fetchCocktailData(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${cocktailID}`)
      .then(data => {
        setSelectedCocktail(formatCocktailData(data.drinks[0]))
      })
  }, [cocktailID])

  return (
    <div>
      <Header />
      <h1>COCKTAIL DETAILS</h1>
    </div>
  )
}

export default CocktailDetails
