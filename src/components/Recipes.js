import { React, useState, useRef, useEffect } from 'react';
import '../styles/recipes.css';
import axios from 'axios';
import RecipeDetails from './RecipeDetails';
import Results from './Results';
import SearchBar from './SearchBar';
import LoadingSvg from './LoadingSvg';

const Recipes = ({ messageHandler, blurHandler }) => {
    const [query, setQuery] = useState("");
    const [send, setSend] = useState(false);
    const [recipeDetails, setRecipeDetails] = useState({});
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(0);
    const [noResults, setNoResults] = useState(false);
    const [showError, setShowError] = useState(false);   
    const [results, setResults] = useState([]);
    

    let originList = useRef(0);

    const handleChange = e => {
        setQuery(e.target.value)
    }

    const onSubmit = e => {
        setResults(()=> []);
        originList.current = 0;
        e.preventDefault();
        if(query.length > 0){
            setSend((value)=>!value);
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
        results.forEach(recipe => {
            if(Number(recipe.id) === Number(id)){
                setDetailsVisible(true);
                setRecipeDetails(recipe);
                return;
            }  
        });
    }

    const onMoreRecipes = () => {
        setSend((value) => !value);
    }

    useEffect(()=>{
        if(query){
            const requestRecipes = async () => {
                setLoading(true);
                setShowError(false);
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
                    if(response.data.count){
                        setResults(()=> [...results, ...response.data.results]);
                        setTotalResults(() => response.data.count);  
                        setLoading(false);
                        setShowError(false);
                        setNoResults(false);
                        originList.current = originList.current + 20;
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
            requestRecipes();
        }        
    }, [send]);

    useEffect(()=> {
        blurHandler(value => !value);
    }, [detailsVisible] )

    

    return(
        <div className='recipes-container'>
            <SearchBar handleSubmit={onSubmit} handleChange={handleChange}/>
            {loading && <LoadingSvg />}
            <Results results={results} onShowDetails={onShowDetails} moreRecipes={onMoreRecipes} totalResults={totalResults} noResults={noResults} showError={showError} detailsVisible={detailsVisible}/>
            <RecipeDetails details={recipeDetails} clicked={detailsVisible} closeDetails={onCloseDetails}/>
        </div>
    )
}

export default Recipes;