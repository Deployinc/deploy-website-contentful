import React from 'react';

export default ({onNavItemClick}) => (
  <nav className="header__navbar">
    <ul className="header__navbar__nav">
      <li className="header__navbar__nav__item">
        <button onClick={() => onNavItemClick('servicesRef')}>Services</button>
      </li>
      <li className="header__navbar__nav__item">
      <button onClick={() => onNavItemClick('casesRef')}>Cases</button>
      </li>
      <li className="header__navbar__nav__item">
        <button onClick={() => onNavItemClick('careersRef')}>Careers</button>
      </li>
      <li className="header__navbar__nav__item">
        <button onClick={() => onNavItemClick('footerRef')}>Contact</button>
      </li>
    </ul>
  </nav>
);