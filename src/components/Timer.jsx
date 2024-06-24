import React, { useState, useEffect } from 'react';
import '../App.css';

const Timer = ({ isActive, setIsActive }) => {
  // 「seconds」秒数、「setSeconds」秒数を更新する関数
  // 「isActive」タイマーが動作している状態、「setIsActive」isActiveを更新する関数
  // 「isActive」の初期値は停止状態
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;

    // isActiveがtrueのとき、1秒ごとにsecondsを+1更新するintervalを設定
    // isActiveがfalseのとき、intervalをクリアしてタイマーを停止
    // コンポーネントがアンマウントされるときにintervalをクリア
    // isActiveが変更されたときのみuseEffectが実行される
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

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