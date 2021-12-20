import { React, useState, useEffect } from 'react';
import '../styles/recipes.css';
import SearchLogo from '../images/search-logo.svg';
import axios from 'axios';
import SingleRecipe from './SingleRecipe';
import RecipeDetails from './RecipeDetails';

function Recipes(){

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [recipeDetails, setRecipeDetails] = useState({})
    const [detailsVisible, setDetailsVisible] = useState(false);

    const handleChange = e => {
        setQuery(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        requestRecipes(query);
    }

    
    const handleClick = e => {
        setDetailsVisible(true);
        const id = e.target.parentElement.id;
        results.filter(recipe => {
            if(recipe.id == id){
                setRecipeDetails(recipe);
            }  
        })
        console.log(recipeDetails)
    }   

    let recipeOriginList = 0;
    const requestRecipes = query => {
        if(query){
            const recipeToSearch = query;
            const recipes = {
                method: 'GET',
                url: 'https://tasty.p.rapidapi.com/recipes/list',
                params:  {from: recipeOriginList, size: '20', tags: 'under_30_minutes', q:`'${recipeToSearch}'`},
                headers: {
                  'x-rapidapi-key': 'ebad24bb18mshba622518c6a5df3p12f576jsn35087cfbfaad',
                  'x-rapidapi-host': 'tasty.p.rapidapi.com'
                }
            };
            axios.request(recipes).then(function (response) {
                const results = response.data;
                console.log(results.results);
                const totalresults = results.count;
                recipeOriginList = recipeOriginList + 20; 
                if(totalresults > 0){
                    console.log("This many: " + totalresults)
                }else{
                    console.log("No results")
                }
                setResults(results.results);
            });
        }
    }

    const sayNo = <p>NO! There is no content</p>;     
    
    return(
        <div className='recipes-container'>
            <div className='input-container'>
                <img className="search-logo" src={SearchLogo} alt="Search logo"/>
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={handleChange}/>
                </form>
            </div>
            <div className="results">
                {results.map(item=> (
                    <SingleRecipe handleClick={handleClick} key={item.id} id={item.id}name={item.name} description={item.description} image={item.thumbnail_url}/>
                ))}
            </div>
            <RecipeDetails details={recipeDetails} clicked={detailsVisible} />
        </div>
    )
}

export default Recipes;