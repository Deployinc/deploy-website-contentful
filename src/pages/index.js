import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import { Header, Footer, Image, AnimationScroll, Modal, ContactForm } from '@components';
import {
  SectionHero,
} from '@components/section';
import { HOST } from '@constants/refs';
import Layout from '../components/layout';

const MODULES = {
  ContentfulHomepageHero: SectionHero,
};

class RootIndex extends React.Component {
  footerRef = React.createRef();
  servicesRef = React.createRef();
  casesRef = React.createRef();
  careersRef = React.createRef();
  formRef = React.createRef();

  state = {
    contactModal: false,
    email: '',
    first_name: '',
    phone: '',
    message: '',
    formError: {},
    formSuccess: '',
    isSending: false
  }

  openModal = (e) => {
    this.setState({ contactModal: true, formSuccess: '', formError: {} });
  }

  onModalClose = (value) => {
    this.setState({ contactModal: value });
    if(!this.state.formSuccess) {
      gtag('event', 'ContacFormAbandonment', {
        event_category: 'click'
      });
    }
  }

  onScrollTo = type => {
    const ref = type || 'footerRef';

    if (!this[ref]) return;

    this[ref].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  onChange = e => {
    const { name, value } = e.target;

    if (name === 'phone') {
      if (this.validatePhone(value)) return;
    }

    this.setState({ [name]: value });
  }

  sendMail = async e => {
    e.preventDefault();
    this.setState({ formError: {}, formSuccess: '' });
    let { email, first_name, phone, message, formError } = this.state;

    if (!email) {
      formError.email = 'Email is required.';
      this.setState({ formError });
    }

    if (!first_name) {
      formError.first_name = 'Name is required.';
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

    try {
      this.setState({ isSending: true });
      const url = `${HOST}/api/email/`;
      email = encodeURIComponent(email);
      first_name = encodeURIComponent(first_name);
      phone = encodeURIComponent(phone);
      message = encodeURIComponent(message);
      let serializedData = `email=${email}&first_name=${first_name}&phone=${phone}&message=${message}&g-recaptcha-response=${recaptcha}`;
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: serializedData,
        url
      };
      const { data } = await axios(options);
      if (data.success) {
        this.setState({ isSending: false, formSuccess: 'Thank you! Your message has been sent successfully.', first_name: '', email: '', phone: '', message: '' });
        gtag('event', 'ContacFormSend', {
          event_category: 'click'
        });
      } else {
        formError.global = 'Some of the field values are invalid.'
        this.setState({ isSending: false, formError });
      }
      grecaptcha.reset();
    } catch (err) {
      formError.global = 'An error occured. Check your internet connection please.';
      this.setState({ isSending: false, formError })
    }
  }

  validatePhone = (phoneNumber) => {
    if (!phoneNumber) return false;
    var re = /[^0-9-+()]/g;
    return re.test(phoneNumber);
  }

  onSocialItemClick = () => {
    gtag('event', 'SocialMediaLink', {
      event_category: 'click'
    });
  }

  onContactInfoClick = () => {
    gtag('event', 'ContactInfoLinks', {
      event_category: 'click'
    });
  }

  renderModules = (modules) => {
    return modules.map(module => {
      const Section = MODULES[module.__typename];
      if(!Section) return;
      return <Section key={ module.id } data={ module } />
    });
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const homePageComponents = get(this, 'props.data.allContentfulPage.edges[0].node');
    console.log(homePageComponents);
    return (
      <Layout location={this.props.location} >
        <Helmet title={siteTitle} />
        <Header onScrollTo={this.onScrollTo} />
        <main className="main-content">
          {
            this.renderModules(homePageComponents.component)
          }
        </main>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPage {
      edges {
        node {
          component {
            ... on ContentfulHomepageHero {
              id
              backgroundVideo
              text
            }
          }
        }
      }
    }
  }
`
