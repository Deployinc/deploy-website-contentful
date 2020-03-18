import React from 'react';

export default ({ image = {}, name, position }) => (
    <div className="leadership__item">
        <img src={ image && image.fluid.src } srcSet={ image && image.fluid.srcSet } alt={ name } />
        <h3 className="leadership__title">
          {name} <span>{position}</span>
        </h3>
    </div>
);