import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import Img from 'gatsby-image';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import closeImg from '@assets/images/close-button.svg';
import spinner from '@assets/images/spinner.gif';

export default ({ data = {}, onModalClose, onChange, formError, formSuccess, sendMail, email, name, phone, message, consent, isSending, forwardRef }) => {
  const { email: emailErr, firstName: nameErr, phone: phoneErr, message: messageErr, global: globalErr } = formError;
  console.log(data);
  const html = documentToHtmlString(data.text.json);
  return (
    <div className="modal__content modal--showcase__content modal--positions__content modal--contact__content">
      <div className="modal--showcase__content__featured-img modal--positions__content__featured-img">
        <img src={ data.image.fluid.src } srcSet={ data.image.fluid.srcSet } alt="Office" />
      </div>
      <div className="modal--showcase__content__project modal--positions__content__project">
        <button
          type="button"
          className="modal__button"
          onClick={() => onModalClose(false)}
        >
          <img src={closeImg} alt="close" />
        </button>
        <div className="modal--showcase__content__project__share modal--positions__content__project__share">
          CONTACT <span className="line" />
        </div>

        <div className="modal--positions__content__open-positions">
          <form ref={forwardRef} action="#" className="contact-form" onSubmit={sendMail}>
            <h4 className="modal--showcase__content__project__title">{data.title}</h4>
            <p className="contact-form__subtitle" dangerouslySetInnerHTML={{ __html: html }} />

            <div className="contact-form__field">
              <label htmlFor="email">{data.emailPlaceholder}</label>
              <input
                type="email"
                name="email"
                id="email"
                className="contact-form__input"
                placeholder={data.emailPlaceholder}
                value={email}
                onChange={onChange}
                maxLength="150"
              />
              {emailErr && <span className="contact-form__field__error">{emailErr}</span>}
            </div>

            <div className="contact-form__field">
              <label htmlFor="name">{data.namePlaceholder}</label>
              <input
                type="text"
                name="firstName"
                id="name"
                className="contact-form__input"
                placeholder={data.namePlaceholder}
                value={name}
                onChange={onChange}
                maxLength="100"
              />
              {nameErr && <span className="contact-form__field__error">{nameErr}</span>}
            </div>

            <div className="contact-form__field">
              <label htmlFor="phone">{data.phonePlaceholder}</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="contact-form__input"
                placeholder={data.phonePlaceholder}
                value={phone}
                onChange={onChange}
                maxLength="15"
              />
              {phoneErr && <span className="contact-form__field__error">{phoneErr}</span>}
            </div>

            <div className="contact-form__field">
              <label htmlFor="message">{data.messagePlaceholder}</label>
              <textarea
                name="message"
                id="message"
                className="contact-form__input"
                placeholder={data.messagePlaceholder}
                value={message}
                onChange={onChange}
                maxLength="500"
              />
              {messageErr && <span className="contact-form__field__error">{messageErr}</span>}
            </div>

            <div className="contact-form__field">
              <ReCAPTCHA sitekey="6LflousSAAAAAHZrouwhH3YGs4a0B7w7KBvDOZDK" />
            </div>

            <div className="contact-form__field">
              <input type="checkbox" id="consent" className="contact-form__input contact-form__input--checkbox" name="consent" onChange={ onChange } value={ consent } />
              <span className="contact-form__field__label">Check the box on the left if you consent to having this website use your submitted information so we can respond to your inquiry. This website does not store any personal information.</span>
            </div>

            {globalErr && <p className="contact-form__error">{globalErr}</p>}
            {formSuccess && <p className="contact-form__success">{formSuccess}</p>}

            <div>
              { 
                isSending ? 
                <img src={spinner} alt="Sending..." className="contact-form__spinner" /> : 
                <button className="border-btn" disabled={ !consent }>{data.ctaButtonText}</button>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
