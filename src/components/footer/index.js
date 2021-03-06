import React, { Component } from 'react';
import { Button, Copyright, SocialNav, Modal, ContactForm } from '@components';
import SendEmail from '@lib/services/email.js';
import { trackCustomEvent } from '@lib/helpers';

class Footer extends Component { 
  state = {
    contactModal: false,
    email: '',
    firstName: '',
    phone: '',
    message: '',
    formError: {},
    formSuccess: '',
    isSending: false,
    consent: false
  }

  formRef = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    if(this.props.contactModal && !prevProps.contactModal) {
      this.openModal();
    }
  }

  openModal = (e) => {
    this.setState({ contactModal: true, formSuccess: '', formError: {} });
  }

  onModalClose = (value) => {
    this.setState({ contactModal: value });
    if(this.props.toggleModal)
      this.props.toggleModal(false);

    if(!this.state.formSuccess) {
      trackCustomEvent({
        category: 'click',
        action: 'ContacFormAbandonment'
      });
    }
  }

  onChange = e => {
    const { name, value } = e.target;

    if (name === 'phone') {
      if (this.validatePhone(value)) return;
    }

    this.setState({ [name]: value });
  }

  onSocialItemClick = () => {
    trackCustomEvent({
      category: 'click',
      action: 'SocialMediaLink'
    });
  }

  onContactInfoClick = () => {
    trackCustomEvent({
      category: 'click',
      action: 'ContactInfoLinks'
    });
  }

  sendMail = async e => {
    e.preventDefault();
    let { email, firstName, phone, message, consent, formError } = this.state;
    if(!consent) return;
    this.setState({ formError: {}, formSuccess: '' });

    if (!email) {
      formError.email = 'Email is required.';
      this.setState({ formError });
    }

    if (!firstName) {
      formError.firstName = 'Name is required.';
      this.setState({ formError });
    }

    if (!phone) {
      formError.phone = 'Phone is required.';
      this.setState({ formError });
    }

    if (!message) {
      formError.message = 'Message is required.';
      this.setState({ formError });
    }

    const recaptcha = grecaptcha.getResponse();

    if (!grecaptcha || !recaptcha) {
      formError.global = 'Please prove that you are not a robot.';
      this.setState({ formError: formError });
      return;
    }

    this.setState({ isSending: true });

    const url = `/.netlify/functions/email`;
    
    const formData = {
      email,
      firstName,
      phone,
      message,
      recaptcha
    };

    const { success, error } = await SendEmail(formData, url);

    if(success) {
      this.setState({ isSending: false, formSuccess: 'Thank you! Your message has been sent successfully.', firstName: '', email: '', phone: '', message: '' });
      return;
    } else {
      console.log({error});
      this.setState({ isSending: false, formError: { global: error } });
    }
  }

  validatePhone = (phoneNumber) => {
    if (!phoneNumber) return false;
    var re = /[^0-9-+()]/g;
    return re.test(phoneNumber);
  }

  renderOffices = () => {
    const { offices } = this.props.data;
    if(!offices) return null;
    return offices.map((office, i) => 
      <p key={ i } className=" footer__contact-box__content__value footer__contact-box__content--offices__value">{office}</p>
    );
  }

  renderContactInfo = (info, title) => {
    if(!info) return null;
    return(
      <div className="col-4">
        <h4 className="footer__contact-box__title">{title}</h4>

        <div className="footer__contact-box__content">
          <p className="footer__contact-box__content__value">
            <a href={`mailto:${info.emailAddress}`} onClick={ this.onContactInfoClick }>{info.emailAddress}</a>
          </p>
          <p className="footer__contact-box__content__value">
            <a href={`tel:${info.phoneNumber}`} onClick={ this.onContactInfoClick }>{info.phoneNumber}</a>
          </p>
        </div>
      </div>
    );
  };

  renderContactForm = () => {
    const { contactModal, firstName, email, phone, message, consent, formError, formSuccess, isSending } = this.state;
    return (
      <Modal active={ contactModal } onModalClose={ this.onModalClose }>
        <ContactForm
          forwardRef={ this.formRef }
          onModalClose={ this.onModalClose }
          sendMail={ this.sendMail }
          onChange={ this.onChange }
          formError={ formError }
          formSuccess={ formSuccess }
          email={ email }
          name={ firstName }
          phone={ phone }
          message={ message }
          consent={ consent }
          isSending={ isSending }
        />
      </Modal>
    );
  }

  render() {
    const { data, forwardRef, className, noAnimation } = this.props;
    const { title, copyrightsText, ctaButtonLink, ctaButtonText, contactInfo, socialMedia } = data;

    return (
      <React.Fragment>
        <footer className={`footer ${className || ''} ${noAnimation ? '' : 'footer--animated'}`} ref={forwardRef} id="footer">
          <div className="container">
            <div className="row">
              <div className="col-5">
                <h3 className="footer__title">{title}</h3>

                <div className="footer__contact-box">
                  <p className="footer__contact-box__title">Offices</p>

                    <div className="footer__contact-box__content footer__contact-box__content--offices">
                      {
                        this.renderOffices()
                      }
                    </div>
                </div>
              </div>

              <div className="col-5">
                <Button text={ ctaButtonText } type="white" size="large" color="#f2894e" onClick={ ctaButtonLink === 'contactForm' ? this.openModal : null } />

                <div className="footer__contact-box">
                  <div className="row">
                    { 
                      this.renderContactInfo(contactInfo && contactInfo[0], 'General Inquiries') 
                    }
                    { 
                      this.renderContactInfo(contactInfo && contactInfo[1], 'New Business') 
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
                  onSocialItemClick={ this.onSocialItemClick }
                  links={ socialMedia }
                />
              </div>
            </div>
          </div>
        </footer>

        { this.renderContactForm() }
      </React.Fragment>
    );
  }
}

export default Footer;