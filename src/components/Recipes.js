import { React, useState, useRef } from 'react';
import '../styles/recipes.css';
import axios from 'axios';
import RecipeDetails from './RecipeDetails';
import Results from './Results';
import SearchBar from './SearchBar';
import LoadingSvg from './LoadingSvg';

const Recipes = ({ messageHandler }) => {
    const [query, setQuery] = useState("");
    const [recipeDetails, setRecipeDetails] = useState({});
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [render, setRender] = useState(false);
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(0);
    const [noResults, setNoResults] = useState(false);
    const [showError, setShowError] = useState(false);    

    const results = useRef([]);
    let originList = useRef(0);

    const handleChange = e => {
        setQuery(e.target.value)
    }

    const onSubmit = e => {
        setShowError(false);
        results.current = [];
        originList.current = 0;
        e.preventDefault();
        if(query.length > 0){
            requestRecipes(query);
        }else{
            setTotalResults([]);
            setNoResults(false);
            messageHandler(true);
        }
    }

    const onCloseDetails = () => {
        setDetailsVisible(false);
    }

    const onShowDetails = e => {
        const id = e.target.parentElement.id ? e.target.parentElement.id : e.target.id;
        results.current.filter(recipe => {
            if(recipe.id == id){
                setDetailsVisible(true);
                setRecipeDetails(recipe);
            }  
        });
    }

    const onMoreRecipes = () => {
        requestRecipes(query);
    }

    const requestRecipes = query => {
        setLoading(true);
        const recipeToSearch = query;
        const recipes = {
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/recipes/list',
            params:  {from: originList.current, size: '20', tags: 'under_30_minutes', q:`'${recipeToSearch}'`},
            headers: {
                'x-rapidapi-key': '22ed3ce2f2msh965dd43e2495ebdp1b92c8jsn734b75c346c8',
                'x-rapidapi-host': 'tasty.p.rapidapi.com'
            }
        };
        axios.request(recipes).then((response) => {
            if(response.data.count > 0){
                results.current = ([...results.current, ...response.data.results]);
                originList.current = originList.current + 20;
                setRender(prevValue => !prevValue);
                setLoading(false);
                setTotalResults(response.data.count);  
                setNoResults(false);
                messageHandler(false);
            }else{
                setLoading(false);
                setNoResults(true);
                setTotalResults(0);
                messageHandler(true);
            }              
        }).catch((err)=>{
            console.error("Something went wrong... " + err.message);
            setLoading(false);
            setShowError(true);
        })
    }

    return(
        <div className='recipes-container'>
            <SearchBar handleSubmit={onSubmit} handleChange={handleChange}/>
            {loading ? <LoadingSvg /> : null}
            <Results results={results.current} onShowDetails={onShowDetails} moreRecipes={onMoreRecipes} totalResults={totalResults} noResults={noResults} showError={showError} detailsVisible={detailsVisible}/>
            <RecipeDetails details={recipeDetails} clicked={detailsVisible} closeDetails={onCloseDetails}/>
        </div>
    )
}

export default Recipes;