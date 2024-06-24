import React, { useRef, useState, useEffect } from 'react';
import '../App.css';

const Score = () => {
  return (
    <div className="counter">
      <h2 className="counter_ttl">score</h2>
      <div className="counter_box">
        <p className="counter_box-num"></p>
      </div>
    </div>
  );
};

     // スコアの採点方法を調べる！！

export default Score;