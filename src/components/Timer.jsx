import React, { useState, useEffect } from 'react';
import '../App.css';

const Timer = ({ isActive, seconds, setSeconds, gameWin }) => {
  // 「seconds」秒数、「setSeconds」秒数を更新する関数
  // 「isActive」タイマーが動作している状態、「setIsActive」isActiveを更新する関数
  // 「isActive」の初期値は停止状態

  useEffect(() => {
    let interval = null;

    if (isActive && !gameWin) {
      interval = setInterval(() => {           // タイマーが作動中かつゲームクリアでないとき、1秒ごとにsecondsを+1更新するintervalを設定
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {   // isActiveがfalseかつ秒数が0でないとき、タイマー停止（インターバルクリア）
      clearInterval(interval);
    }
    // isActive、gameWin が更新されるたびにインターバルをクリアする
    return () => clearInterval(interval);
  }, [isActive, gameWin]);

  return (
    <div className="counter">
      <h2 className="counter_ttl">time</h2>
      <div className="counter_box">
        <p className="counter_box-num">{seconds}</p>
      </div>
    </div>
  );
};

export default Timer;