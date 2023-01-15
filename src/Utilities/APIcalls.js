
const fetchCocktailData = (url) => {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json()
    } else {
      console.log('BAD response: ', response);
      throw new Error('Failed to load data, our apologies.')
    }
  })
}

export default fetchCocktailData;