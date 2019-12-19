import React from 'react';

import { IconFacebook, IconLinkedin, IconInstagram } from '../icons';

export default ({instagram, facebook, linkedin, onSocialItemClick}) => (
  <ul className="footer__social-nav">
    <li className="footer__social-nav__item">
      <a href={facebook} target="_blank" onClick={onSocialItemClick}><IconFacebook /></a>
    </li>
    <li className="footer__social-nav__item">
      <a href={instagram} target="_blank" onClick={onSocialItemClick}><IconInstagram /></a>
    </li>
    <li className="footer__social-nav__item">
      <a href={linkedin} target="_blank" onClick={onSocialItemClick}><IconLinkedin /></a>
    </li>
  </ul>
)