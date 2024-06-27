import React, { useState }  from 'react';
import '../App.css';
import Score from './Score';
import Reset from './Reset';
import Timer from './Timer';

const Counter = ({ isActive, setIsActive, setResetSignal }) => {
  const [seconds, setSeconds] = useState(0);

  // リセットボタンを押すとタイマーの表示が0に戻る
  const resetGame = () => {
    setIsActive(false);
    setSeconds(0);
    setResetSignal(prev => !prev);
  }

  return (
    <div className='counter-wrap'>
      <Score />
      <Reset resetGame={resetGame} />
      <Timer isActive={isActive} setIsActive={setIsActive} seconds={seconds} setSeconds={setSeconds} />
    </div>
  );
};

export default Counter;
