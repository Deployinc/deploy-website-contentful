import React from 'react';

export default ({data, onClick}) => (
  <div className="clients__logos__item">
    <button className={onClick && 'clickable'} onClick={ onClick }>
      <img src={ data.logo && data.logo.fluid.src } srcSet={ data.logo && data.logo.fluid.srcSet } alt={ data.title } />
    </button>
    <div className="clients__logos__item__project-img">
      <img src={ data.image && data.image.fluid.src } srcSet={ data.image && data.image.fluid.srcSet } alt={ data.title } />
    </div>
  </div>
);