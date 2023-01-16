
const fetchCocktailData = (url) => {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json()
    } else if (response.status >= 500) {
      throw new Error('Failed to load data, our apologies.')
    } else if (response.status >= 400 && response.status < 500) {
      throw new Error('400 level error, our apologies - please contact site administrator.')
    }
  })
}

export default fetchCocktailData;