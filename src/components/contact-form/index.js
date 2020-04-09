import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import officeImg from '@assets/images/office.jpg';
import closeImg from '@assets/images/close-button.svg';
import spinner from '@assets/images/spinner.gif';

export default ({ onModalClose, onChange, formError, formSuccess, sendMail, email, name, phone, message, consent, isSending, forwardRef }) => {
  const { email: emailErr, firstName: nameErr, phone: phoneErr, message: messageErr, global: globalErr } = formError;

  return (
    <div className="modal__content modal--showcase__content modal--positions__content modal--contact__content">
      <div className="modal--showcase__content__featured-img modal--positions__content__featured-img">
        <img src={ officeImg } alt="Office" />
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
            <h4 className="modal--showcase__content__project__title">
              Get in touch
            </h4>
            <p className="contact-form__subtitle">
              Send us a message now
            </p>

            <div className="contact-form__field">
              <label htmlFor="email">Your email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="contact-form__input"
                placeholder="Your Email"
                value={email}
                onChange={onChange}
                maxLength="150"
              />
              {emailErr && <span className="contact-form__field__error">{emailErr}</span>}
            </div>

            <div className="contact-form__field">
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                name="firstName"
                id="name"
                className="contact-form__input"
                placeholder="Your Name"
                value={name}
                onChange={onChange}
                maxLength="100"
              />
              {nameErr && <span className="contact-form__field__error">{nameErr}</span>}
            </div>

            <div className="contact-form__field">
              <label htmlFor="phone">Your phone number</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="contact-form__input"
                placeholder="Phone Number"
                value={phone}
                onChange={onChange}
                maxLength="15"
              />
              {phoneErr && <span className="contact-form__field__error">{phoneErr}</span>}
            </div>

            <div className="contact-form__field">
              <label htmlFor="message">Your message</label>
              <textarea
                name="message"
                id="message"
                className="contact-form__input"
                placeholder="Your Message"
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
              {isSending ? <img src={spinner} alt="Sending..." className="contact-form__spinner" /> : <button className="border-btn" disabled={ !consent }>Send</button>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
