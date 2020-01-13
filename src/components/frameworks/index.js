import React from 'react';

export default ({ frameworks }) => (
  <ul className="frameworks__items">
    {
      frameworks && frameworks.map(framework => 
        <li className="frameworks__items__item" key={ framework.id }>
          <figure className="frameworks__items__item__image">
            <img src={framework.logo && framework.logo.file.url} alt={framework.title} width={140} />
          </figure>
          <p className="frameworks__items__item__name">{framework.logoCaption}</p>
        </li>
      )
    }
  </ul>
);