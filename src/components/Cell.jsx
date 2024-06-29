import React, { useState } from 'react';
import '../App.css';
import cellCatImage from '../img/cell_cat.png';
import questionImage from '../img/question.png';


const Cell = ({ isCat, isRevealed, numCats, isFlagged, onClick, onRightClick }) => {

  const handleClick = () => {        // 通常のひだりクリック
    if (!isRevealed && !isFlagged) {    // 開示されていないかつフラグがない場合のみ有効
      onClick();
    }
  };

  const handleRightClick = (e) => {  // みぎクリック
    e.preventDefault();
    onRightClick();
  };

  // 数字1～4に異なるcssを適用するためクラスを取得
  const getNumClass = () => {
    if (numCats === 1) {
      return 'num-1';
    } else if (numCats === 2) {
      return 'num-2';
    } else if (numCats === 3) {
      return 'num-3';
    } else if (numCats >= 4) {
      return 'num-4';
    }
    return ''; // numCatsが0以下の場合は何も返さない（クラスが適用されない）
  };

  return (
    <div 
    className={`cell ${isRevealed ? 'revealed' : ''}`} 
    onClick={handleClick} 
    onContextMenu={handleRightClick} 
    >
      {isFlagged && !isRevealed && <img src={questionImage} alt="？" class="question-img" style={{ width: '18px', height: '18px' }} />}
      {isRevealed && (isCat ? <img src={cellCatImage} alt="Cat" style={{ width: '18px', height: '18px' }} /> : numCats > 0 ? <span className={`${getNumClass()}`}>{numCats}</span> : null)}
    </div>
  );
};

export default Cell;