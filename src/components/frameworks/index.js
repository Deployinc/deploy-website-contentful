import React from 'react';

import reactImg from '@assets/images/frameworks/react.svg'
import shopifyImg from '@assets/images/frameworks/shopify.svg'
import wordpressImg from '@assets/images/frameworks/wordpress.svg'
import magentoImg from '@assets/images/frameworks/magento.svg'
import blockchainImg from '@assets/images/frameworks/blockchain.svg'

export default () => (
  <ul className="frameworks__items">
    <li className="frameworks__items__item">
      <figure className="frameworks__items__item__image">
        <img src={reactImg} alt="React" width="148" />
      </figure>
      <p className="frameworks__items__item__name">ReactJS</p>
    </li>

    <li className="frameworks__items__item">
      <figure className="frameworks__items__item__image">
        <img src={shopifyImg} alt="Shopify" width="128" />
      </figure>
      <p className="frameworks__items__item__name">Shopify</p>
    </li>

    <li className="frameworks__items__item">
      <figure className="frameworks__items__item__image">
        <img src={wordpressImg} alt="Wordpress" width="132" />
      </figure>
      <p className="frameworks__items__item__name">Wordpress</p>
    </li>

    <li className="frameworks__items__item">
      <figure className="frameworks__items__item__image">
        <img src={magentoImg} alt="Magento" width="119" />
      </figure>
      <p className="frameworks__items__item__name">Magento</p>
    </li>

    <li className="frameworks__items__item">
      <figure className="frameworks__items__item__image">
        <img src={blockchainImg} alt="Blockchain" width="140" />
      </figure>
      <p className="frameworks__items__item__name">Blockchain</p>
    </li>
  </ul>
);