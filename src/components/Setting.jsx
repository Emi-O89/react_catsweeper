import React from 'react';
import '../App.css';
import { BsGearFill } from "react-icons/bs";

const Setting = () => {
  return (
    <>
      <button type="button" className="setting_btn">
        <BsGearFill />
      </button>
    </>
  );
};

export default Setting;

// メニューモーダルを実装する