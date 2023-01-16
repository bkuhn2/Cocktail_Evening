
const simplifyIngredients = (rawData) => {
  return rawData.map(datum => {
    return datum.strIngredient1
  });
}

const formatSearchResults = (rawData) => {
  return rawData.map(datum => {
    return {
      name: datum.strDrink,
      id: datum.idDrink,
      image: datum.strDrinkThumb
    }
  });
} 

const formatCocktailData = (rawData) => {
  const data = {
    name: rawData.strDrink,
    image: rawData.strDrinkThumb,
    hasAlcohol: (rawData.strAlcoholic.toLowerCase() === 'alcoholic') ? true : false,
    glass: rawData.strGlass,
    instructions: rawData.strInstructions,
    ingredients: generateIngredients(rawData),
    id: rawData.idDrink
  }
  return data;
}

const generateIngredients = (rawData) => {
  const ingredientKeys = Object.keys(rawData).filter(key => key.includes('strIngredient'))
  return ingredientKeys.reduce((list, ing, index) => {
    if (rawData[ing] !== null) {
      const measureKey = `strMeasure${index+1}` //minor tweak - if there's a space at the end, remove it
      const listItem = `${rawData[measureKey] ? rawData[measureKey] : '...'} ${rawData[ing]}`
      list = [...list, listItem]
    }
    return list;
  }, []);
}


export { simplifyIngredients, formatSearchResults, formatCocktailData }