import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import '../App/App.css'
import CocktailDetails from '../CocktailDetails/CocktailDetails';
import Home from '../Home/Home';
import MyEvent from '../MyEvent/MyEvent';
import NoMatch from '../NoMatch/NoMatch';
 

const App = () => {

  const [eventOfferings, setEventOfferings] = useState([]);

  const addCocktail = (cocktail) => {
    if (eventOfferings.filter(item => item.id === cocktail.id).length === 0) {
      setEventOfferings([...eventOfferings, cocktail])
    } 
  }

  const removeCocktail = (id) => {
    setEventOfferings(eventOfferings.filter(cocktail => cocktail.id !== id));
  }

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/nameResults/:name" element={<Home />} />
        <Route path="/ingredientResults/:ingredient" element={<Home />} />
      </Route>
      <Route path="/cocktaildetails/:id" element={<CocktailDetails 
        addCocktail={addCocktail}
        eventOfferings={eventOfferings}
        />} 
      />
      <Route path="/myevent" element={<MyEvent 
        eventOfferings={eventOfferings}
        removeCocktail={removeCocktail}
        />} 
      />
      <Route path='*' element={<NoMatch />}/>
    </Routes>
  );
}

export default App;
