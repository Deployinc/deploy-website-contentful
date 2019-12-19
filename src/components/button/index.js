import React from 'react';

export default ({ text, color, size, type, onClick }) => (
  <button className={`button-underlined ${size || ''} ${type || ''}`} onClick={() => onClick()} >{text} <i className="arrow-right"></i><span style={{ backgroundColor: color }}></span></button>
);