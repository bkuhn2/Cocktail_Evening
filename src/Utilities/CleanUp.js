
const simplifyIngredients = (rawData) => {
  return rawData.map(datum => {
    return datum.strIngredient1
  })
}

const formatSearchResults = (rawData) => {
  return rawData.map(datum => {
    return {
      name: datum.strDrink,
      id: datum.idDrink,
      image: datum.strDrinkThumb
    }
  })
} //make sure this works across all fetch calls

export { simplifyIngredients, formatSearchResults }