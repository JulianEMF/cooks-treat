import { useState } from 'react';
import '../styles/App.css';
import Logo from './Logo';
import IntroMessage from './IntroMessage';
import Recipes from './Recipes';

const App = () => {

  const [visibleMessage, setVisibleMessage] = useState(true);

  const messageHandler = (value) => {
    setVisibleMessage(value);
  }

  return (
    <div className="App">
      <Logo />
      <IntroMessage visible={visibleMessage}/> 
      <Recipes messageHandler={messageHandler}/>
    </div>
  );
}

export default App;
