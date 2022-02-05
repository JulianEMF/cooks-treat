import { React } from 'react';
import MoreRecipesButton from './MoreRecipesButton';
import NoResultsMessage from './NoResultsMessage';
import ErrorMessage from './ErrorMessage';
import "../styles/single-recipe.css";
import "../styles/recipes.css";

const Results = ( {results=[], moreRecipes, onShowDetails, totalResults, noResults, showError, detailsVisible } ) => {

    return(
        <div className={detailsVisible ? 'results-container blur' : 'results-container'} >
            <div className='results'>
                    {results && results.map(recipe => {
                    return(
                        <div key={recipe.id} className='recipe-card' onClick={onShowDetails} id={recipe.id}>
                            <div id ={recipe.id} className='image-container'>
                                <img src={recipe.thumbnail_url} alt={recipe.name}/>
                            </div>
                            <h4>{recipe.name}</h4>
                            <p className='description'>{recipe.description ? recipe.description : recipe.total_time_tier && recipe.total_time_tier.display_tier}</p>
                            <p className='description'>{recipe.yields}</p>
                        </div>
                    );
                })}
                {(noResults && !showError) && <NoResultsMessage />}
                {showError && <ErrorMessage />}
            </div>
            {(results.length < totalResults) && <MoreRecipesButton moreRecipes={moreRecipes} /> } 
        </div>
    )
}


export default Results;