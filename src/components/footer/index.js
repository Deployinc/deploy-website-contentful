import React from 'react';
import { Button, Copyright, SocialNav } from '../index';

export default ({ forwardRef, openModal, onSocialItemClick, onContactInfoClick }) => (
  <footer className="footer" ref={forwardRef}>
    <div className="container">
      <div className="row">
        <div className="col-5">
          <h3 className="footer__title">Let’s build something impactful.</h3>

          <div className="footer__contact-box">
            <p className="footer__contact-box__title">Offices</p>

            <div className="footer__contact-box__content">
              <div className="row">
                <div className="col-2">
                  <p className="footer__contact-box__content__value">
                    Belgrade
                  </p>
                  <p className="footer__contact-box__content__value">
                    Los Angeles
                  </p>
                </div>

                <div className="col-2">
                  <p className="footer__contact-box__content__value">Austin</p>
                  <p className="footer__contact-box__content__value">Seattle</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-5">
          <Button text="Get in touch" type="white" size="large" color="#f2894e" onClick={openModal} />

          <div className="footer__contact-box">
            <div className="row">
              <div className="col-4">
                <h4 className="footer__contact-box__title">
                  General Inquiries
                </h4>

                <div className="footer__contact-box__content">
                  <p className="footer__contact-box__content__value">
                    <a href="mailto:hello@deployinc.com" onClick={onContactInfoClick}>hello@deployinc.com</a>
                  </p>
                  <p className="footer__contact-box__content__value">
                    <a href="tel:18886857640" onClick={onContactInfoClick}>1 888 685 7640</a>
                  </p>
                </div>
              </div>

              <div className="col-4">
                <h4 className="footer__contact-box__title">New Business</h4>
                <div className="footer__contact-box__content">
                  <p className="footer__contact-box__content__value">
                    <a href="mailto:biz@deployinc.com" onClick={onContactInfoClick}>biz@deployinc.com</a>
                  </p>
                  <p className="footer__contact-box__content__value">
                    <a href="tel:1 888 685 7640" onClick={onContactInfoClick}>1 888 685 7640</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row copyright">
        <div className="col-5">
          <Copyright text="© Copyright 2009–2020 Deploy Inc." />
        </div>

        <div className="col-5">
          <SocialNav
            onSocialItemClick={onSocialItemClick}
            facebook="https://www.facebook.com/deployinc/"
            linkedin="https://www.linkedin.com/company/deploy-inc-"
            instagram="https://www.instagram.com/deploy.inc/"
          />
        </div>
      </div>
    </div>
  </footer>
);
