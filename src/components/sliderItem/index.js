import React from 'react';

export default ({img, imgName, fullName, title}) => (
    <div className="leadership__item">
        <img src={img} alt={imgName} />
        { fullName && <h3 className="leadership__title">{fullName} <span>{title}</span></h3>}
    </div>
);