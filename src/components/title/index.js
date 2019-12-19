import React from 'react';

export default ({text, type}) => (
  <h3 className={type === 'large' ? 'title-underlined large' : 'title-underlined' }>
    {text}
    <span style={{backgroundColor: '#f2894e'}}></span>
  </h3>
);