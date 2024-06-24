import React, { useRef, useState, useEffect } from 'react';
import '../App.css';
import Score from './Score';
import Reset from './Reset';
import Timer from './Timer';

const Counter = ({ isActive, setIsActive }) => {
  const [score, setScore] = useState(0);

  return (
    <div className='counter-wrap'>
      <Score />
      <Reset />
      <Timer isActive={isActive} setIsActive={setIsActive} />
    </div>
  );
};

export default Counter;
