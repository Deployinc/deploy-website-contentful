import React from 'react';
import Img from 'gatsby-image';

export default ({ image = {}, name, position }) => (
    <div className="leadership__item">
        <Img fluid={ image.fluid } alt={ name } />
        { name && position && <h3 className="leadership__title">{name} <span>{position}</span></h3> }
    </div>
);