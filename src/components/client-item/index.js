import React from 'react';

export default ({logo, name, width, projectImg, onClick}) => (
  <div className="clients__logos__item">
    <button className={onClick && 'clickable'} onClick={onClick}><img src={logo} alt={name} width={width} /></button>
    <div className="clients__logos__item__project-img">
      <img src={projectImg} alt={name} />
    </div>
  </div>
);