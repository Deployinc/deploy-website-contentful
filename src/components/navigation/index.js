import React from 'react';
import { Link } from 'gatsby';

export default ({ navData, onNavItemClick, isHomepage }) => (
  <nav className="header__navbar">
    <ul className="header__navbar__nav">
      {
        navData.map((item, i) => 
          <li key={ i } className="header__navbar__nav__item">
            {
              item.ref ?
                (
                  isHomepage ? 
                  <button onClick={() => onNavItemClick(item.ref)}>{item.title}</button> :
                  <Link to={item.url}>{item.title}</Link>
                ) :
                <Link to={item.url}>{item.title}</Link>
            }
          </li>
        )
      }
    </ul>
  </nav>
);