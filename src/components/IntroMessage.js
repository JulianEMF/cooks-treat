import '../styles/header.css';

const IntroMessage = ( {visible} ) => {
    return(
        <div className="message-container" >
            <p className={!visible ? "hide-text" : "message"}>Welcome to Cook's Treat. Where you will find hundreds of delicious recipes.</p>
        </div> 
    )
}

export default IntroMessage;