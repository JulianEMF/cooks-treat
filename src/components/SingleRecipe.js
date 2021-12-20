import { React } from 'react';
import '../styles/single-recipe.css';


const SingleRecipe = ( { handleClick, id, name, description, image } ) => {
    return(
        <div className="recipe-card" onClick={handleClick} id={id}>
            <img src={image} alt="something" />
            <h4>{name}</h4>
            <p>{description}</p>
        </div>
    );
}

export default SingleRecipe;