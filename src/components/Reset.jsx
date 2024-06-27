import React from 'react';
import '../App.css';
import nikukyuImage from '../img/nikukyu.png';

// リセットボタンをクリックするとボードを初期設定に戻す
const Reset = ({ resetGame }) => {
  return (
    <button className="reset_btn" type="button" onClick={resetGame}>
      <img className="reset_btn-img" src={nikukyuImage} alt="Reset" />
    </button>
  );
};

export default Reset;