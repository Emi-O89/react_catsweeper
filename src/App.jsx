import React, { useState } from 'react';
import './App.css';
import dotCatImage from './img/dot_cat.png';
import Setting from './components/Setting';
import Counter from './components/Counter';
import Board from './components/Board';
import Title from './components/Title';



const App = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="App">
      <div className="wrap">
        <img className="wrap-img" src={dotCatImage} alt="dotcat" />
        <div className="container">
          <Setting />
          <div className="game_container">
            <Counter isActive={isActive} setIsActive={setIsActive} />
            <Board setIsActive={setIsActive} />
            <Title />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;