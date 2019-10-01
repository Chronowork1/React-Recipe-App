import React, {useEffect, useState} from 'react'; 
import Recipe from './Recipe';
import './App.css';
//import { tsConstructorType } from '@babel/types';
//Use const to place App variable permanently
//App equals a function that doesn't have a parameter
const App = () => {
  //Decalered the Api ID and key
  const APP_ID = "c03795ac";
  const APP_Key = "2d02c6adc893ec08a564945208029c08"
  
  //Create a const with an empty array recipes and setRecipes
  const [recipes, setRecipes] = useState([]);
 
  //create a const with an empty string search, and setSearch
  const [search, setSearch] = useState('');
  //For making a request use UseEffect
  //UseEffect: Everytime page rerender itself the page is just going to run

  //Create a const with with query and setQuery with the string chicken
  const [query, setQuery] = useState("chicken");

  //exampleReq equals the website, with the query app_id and app_key
  const exampleReq = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_Key}`;

  useEffect(() => {
    getRecipes()
  }, [query]);

  //getRecipes, a function that fetch all the data from edamam
  const getRecipes = async () => {
    //variable response that wait for and fetch the data from exampleReq
    const response = await fetch(exampleReq)
    //when the response comes back, we await the response with a method json
    //json just will format it the data neatly
    const data = await response.json();
    setRecipes(data.hits);
    //console.log(data.hits)
  }

  //create a arrow function expression, with the event
  //Everytime you run an onChange or click, the setSearch is going to run
  //from the state
  //e.target.value is set to the value of the input
  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search)
  }

  //e = event
  //implement getSearch to the submit form
  //e.preventDefault stops the refresh of the page
  //setQuery(search), whenever we input something to the search input,
  //it updates the setQuery
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    //A div with a form element and a class of search-form
    <div className="App">
      {/*Form element with a input with the type text and button with a type of submit*/}
      <form onSubmit = {getSearch} className="search-form">
        {/*The value attribute is set to an empty string */}
        {/*Add onChange, so whenever we add a number or value to the input, its going to run*/}
        <input className="search-bar" type="text" value={search} onChange = {updateSearch}/>
        {/* onClick attribute when clicked it declared a function that add one to setcounter*/}
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {/* Curly Braces for map because recipes is an array*/}
      {/* recipe parameter function on map*/}
      {/*parathesis for html element for rendering Recipe.js*/}
      <div className = "recipes">
      {recipes.map(recipe => (
        <Recipe 
        //Need a unique identifier for each Recipe const.
        //The key is to label each title, calorie and image.
        key = {recipe.recipe.label}
        title={recipe.recipe.label} 
        calorie={recipe.recipe.calorie} 
        image={recipe.recipe.image}
        ingredients = {recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  )
}

export default App;
