import React from 'react';
import '../App.css';
import nikukyuImage from '../img/nikukyu.png';


// secondsを0にリセットし、タイマーを停止する
const Reset = ({ setSeconds, setIsActive }) => {
  const handleReset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <button className="reset_btn" type="button" onClick={handleReset}>
      <img className="reset_btn-img" src={nikukyuImage} alt="Reset" />
    </button>
  );
};

export default Reset;