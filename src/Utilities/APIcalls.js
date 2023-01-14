
const fetchCocktailData = (url) => {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Bad Response Error')
    }
  })
}

export default fetchCocktailData;