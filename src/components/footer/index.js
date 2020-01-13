import React from 'react';
import { Button, Copyright, SocialNav } from '@components';

export default ({ data, forwardRef, openModal, onSocialItemClick, onContactInfoClick }) => {
  if(!data) return null;

  const { title, copyrightsText, offices, ctaButtonLink, ctaButtonText, contactInfo, socialMedia } = data;

  const renderOffices = () => 
    offices.map((office, i) => 
      <p key={ i } className=" footer__contact-box__content__value footer__contact-box__content--offices__value">{office}</p>
    );

  const renderContactInfo = (info, title) => {
    if(!info) return null;

    return(
      <div className="col-4">
        <h4 className="footer__contact-box__title">{title}</h4>

        <div className="footer__contact-box__content">
          <p className="footer__contact-box__content__value">
            <a href={`mailto:${info.emailAddress}`} onClick={ onContactInfoClick }>{info.emailAddress}</a>
          </p>
          <p className="footer__contact-box__content__value">
            <a href={`tel:${info.phoneNumber}`} onClick={ onContactInfoClick }>{info.phoneNumber}</a>
          </p>
        </div>
      </div>
    );
  };

  return (
    <footer className="footer" ref={forwardRef}>
      <div className="container">
        <div className="row">
          <div className="col-5">
            <h3 className="footer__title">{title}</h3>

            <div className="footer__contact-box">
              <p className="footer__contact-box__title">Offices</p>

                <div className="footer__contact-box__content footer__contact-box__content--offices">
                  {
                    renderOffices()
                  }
                </div>
            </div>
          </div>

          <div className="col-5">
            <Button text={ ctaButtonText } type="white" size="large" color="#f2894e" onClick={ ctaButtonLink === 'contactForm' ? openModal : null } />

            <div className="footer__contact-box">
              <div className="row">
                { 
                  renderContactInfo(contactInfo && contactInfo[0], 'General Inquiries') 
                }
                { 
                  renderContactInfo(contactInfo && contactInfo[1], 'New Business') 
                }
              </div>
            </div>
          </div>
        </div>

        <div className="row copyright">
          <div className="col-5">
            <Copyright text={ copyrightsText } />
          </div>

          <div className="col-5">
            <SocialNav
              onSocialItemClick={ onSocialItemClick }
              links={ socialMedia }
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
