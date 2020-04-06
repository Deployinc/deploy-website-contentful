import React from 'react';

export default ({links, onSocialItemClick}) => (
  <ul className="footer__social-nav">
    {
      links && links.map((item, i) => 
        <li key={ i } className="footer__social-nav__item">
          <a href={ item.socialMediaLink } target="_blank" onClick={ onSocialItemClick } rel="nofollow">
            <img src={ item.socialMediaIcon && item.socialMediaIcon.file.url } alt={ item.socialMediaLink.split('.')[1] } />
          </a>
        </li>
      )
    }
  </ul>
)