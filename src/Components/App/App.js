import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import '../App/App.css'
import CocktailDetails from '../CocktailDetails/CocktailDetails';
import Home from '../Home/Home';
import MyEvent from '../MyEvent/MyEvent';

const App = () => {

  const [eventOfferings, setEventOfferings] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="search/ingredientrequest/:ingredientRequest" element={<Home />}/>
        <Route path="search/ingredient/:ingredientTerm" element={<Home />}/>
        <Route path="search/name/:searchTerm" element={<Home />}/>
      </Route>
      <Route path="/cocktaildetails/:id" element={<CocktailDetails />} />
      <Route path="/myevent" element={<MyEvent />} />
      {/* Route for bad URL */}
      {/* redirect /search to just Home */}
      {/* redirect /cocktaildetails to Home */}
    </Routes>
  );
}

export default App;
