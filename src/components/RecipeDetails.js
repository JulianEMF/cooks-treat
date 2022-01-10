import { useRef, useEffect } from 'react';
import '../styles/recipe-details.css';
import cross from '../images/cross.svg';

const RecipeDetails = ({ details, clicked, closeDetails }) => {
    
    const useClickOutside = (handler) => {
        const detailsContainer = useRef();

        useEffect(() => {
            const onClickHandler = (event) => {
              if (detailsContainer.current && !detailsContainer.current.contains(event.target)) {
                handler();
              }
            };
        
            document.addEventListener("mousedown", onClickHandler);
        
            return () => {
              document.removeEventListener("mousedown", onClickHandler);
            };
        });
        
        return detailsContainer;
        };

    let detailsContainer = useClickOutside(() => {
        closeDetails();
    });

    if(clicked){
        console.log(details)
        return(
            <div ref={detailsContainer} className="recipe-details" > 
                <div className="close-button-container" >
                    <img src={cross} alt="Close Button" onClick={closeDetails}/>
                </div>
                <h1>{details.name}</h1>
                <div className="image-details-container">
                    <img src={details.thumbnail_url} url={details.name} />
                </div>
                <p className="small-detail">{details.yields}</p>
                <p className="small-detail">Time estimate: {details.total_time_tier ? details.total_time_tier.display_tier: null}</p>

                <div className="details-section">
                    <h2 className="details-title">Ingredients</h2>
                    {details.sections[0].components.map(item => {
                        return(
                            <div key={item.id}>
                                <span className="item-text">{item.measurements[0].quantity != 0 ? item.measurements[0].quantity : null} </span>
                                <span className="item-text">{item.measurements[0].quantity > 1 ? item.measurements[0].unit.display_plural : item.measurements[0].unit.display_singular} </span>
                                <span className="item-text">{item.ingredient.name}</span>
                            </div>
                        )
                    })}
                    <h2 className="details-title">Instructions</h2>
                    {details.instructions.map(item => {
                        return(
                            <p key={item.id} className="item-text">{item.display_text}</p>
                        )
                    })}
                </div>
            </div>
        );
    }
   return null;
}

export default RecipeDetails;