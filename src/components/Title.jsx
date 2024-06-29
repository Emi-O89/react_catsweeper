import React from 'react';
import '../App.css';

const Title = ({ gameOver, gameWin }) => {
  return (
    <h1 className={`game_ttl-txt ${gameOver ? "game_ttl-gameovertxt" : ""} ${gameWin ? "game_ttl-gamewintxt" : ""}`}>
      {gameOver ? "GameOver !" : (gameWin ? <>★ Clear ★<br />congratulation !</> : "Catsweeper")}
    </h1>
  );
};

export default Title;