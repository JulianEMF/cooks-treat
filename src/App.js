import React from 'react';
import './styles/App.css';
import Main from './components/Main';
// import Input from './components/Input';
import Recipes from './components/Recipes';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <div className="App">
      <Main />
      <Recipes />
      <RecipeDetails />
    </div>
  );
}

export default App;
