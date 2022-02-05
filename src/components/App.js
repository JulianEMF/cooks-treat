import { useState } from 'react';
import Logo from './Logo';
import IntroMessage from './IntroMessage';
import Recipes from './Recipes';
import '../styles/App.css';


const App = () => {

  const [visibleMessage, setVisibleMessage] = useState(true);
  const [blurContent, setBlurContent] = useState(true);

  const messageHandler = (value) => {
    setVisibleMessage(value);
  }

  const blurHandler = (value) => {
    setBlurContent(value);
  }

  return (
    <div className="App">
      <Logo blurContent={blurContent}/>
      <IntroMessage visible={visibleMessage}/> 
      <Recipes messageHandler={messageHandler} blurHandler={blurHandler}/>
    </div>
  );
}

export default App;
