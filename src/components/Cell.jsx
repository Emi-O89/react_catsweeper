import React from 'react';
import '../App.css';
import cellCatImage from '../img/cell_cat.png';

const Cell = ({ isCat, isRevealed, numCats, onClick }) => {

  const handleClick = () => {
    if (!isRevealed) {
      onClick();
    }
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
    <div className={`cell ${isRevealed ? 'revealed' : ''}`} onClick={handleClick}>
      {isRevealed && (isCat ? <img src={cellCatImage} alt="Cat" style={{ width: '18px', height: '18px' }} /> : numCats > 0 ? <span className={`${getNumClass()}`}>{numCats}</span> : null)}
    </div>
  );
};

export default Cell;