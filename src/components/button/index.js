import React from 'react';

export default ({ text, color, size, type, onClick, noArrow = false }) => (
  <button 
    className={`button-underlined ${size || ''} ${type || ''}`} onClick={ onClick ? onClick : null } >
      {text} 
      { !noArrow && <i className="arrow-right"></i> }
      <span style={{ backgroundColor: color }}></span>
    </button>
);