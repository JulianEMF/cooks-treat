import React from 'react';
// import '../styles/recipe-details.css';

const RecipeDetails = ({ details, clicked }) => {
    if(clicked){
        console.log("Recipe details: " + details.name);
        return(
            <div className="recipe-details"> 
                <p>{details.name}</p>
                {details.sections[0].components.map(item => {
                    return(
                        <p key={item.ingredient.id}>{item.ingredient.name}</p>
                    )
                    })}
            </div>
        );
    }
   return null;
    
}

export default RecipeDetails;