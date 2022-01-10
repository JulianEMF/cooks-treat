import { React, useState, useEffect, useRef } from 'react';
import MoreRecipesButton from './MoreRecipesButton';
import NoResultsMessage from './NoResultsMessage';
import ErrorMessage from './ErrorMessage';
import "../styles/single-recipe.css";
import "../styles/recipes.css";

const Results = ( {results, moreRecipes, onShowDetails, totalResults, noResults, showError, detailsVisible } ) => {
    const [render, setRender] = useState(false);
    const recipes = useRef([]);
    const totalRecipes = useRef(0);

    useEffect(()=>{
        setRender(prevValue => !prevValue);
        recipes.current = results;
        totalRecipes.current = totalResults;
    }, [results, totalResults]);

    return(
        <div className={detailsVisible ? 'results-container blur' : 'results-container'} >
            <div className='results'>
                {recipes.current ? recipes.current.map(recipe => {
                    return(
                        <div key={recipe.id} className='recipe-card' onClick={onShowDetails} id={recipe.id}>
                            <div id ={recipe.id} className='image-container'>
                                <img src={recipe.thumbnail_url} alt={recipe.name}/>
                            </div>
                            <h4>{recipe.name}</h4>
                            <p className='description'>{recipe.description ? recipe.description : recipe.total_time_tier ? recipe.total_time_tier.display_tier : null}</p>
                            <p className='description'>{recipe.yields}</p>
                        </div>
                    );
                }) : null}
                {(noResults && !showError) ? <NoResultsMessage /> : null}
                {showError ? <ErrorMessage /> : null}
            </div>
            {(recipes.current.length < totalRecipes.current) ? <MoreRecipesButton moreRecipes={moreRecipes} /> : null} 
        </div>
    )
}


export default Results;