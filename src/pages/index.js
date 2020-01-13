import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import { 
  Header, 
  Footer, 
  Image, 
  AnimationScroll, 
  Modal, 
  ContactForm, 
  Layout 
} from '@components';
import {
  SectionHero,
  SectionWork,
  SectionServices,
  SectionStartProject,
  SectionFrameworks,
  SectionClients,
  SectionLeadership,
  SectionCareers 
} from '@components/section';
import { HOST } from '@constants/refs';

const MODULES = {
  ContentfulHomepageHero: SectionHero,
  ContentfulHowWeWork: SectionWork,
  ContentfulServices: SectionServices,
  ContentfulStartAProject: SectionStartProject,
  ContentfulFullWidthImage: Image,
  ContentfulFrameworksContainer: SectionFrameworks,
  ContentfulCaseStudiesContainer: SectionClients,
  ContentfulLeadershipTeamCarousel: SectionLeadership,
  ContentfulCareers: SectionCareers,
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
      formError.global = 'An unknown error occured. Check your internet connection please.';
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
      if(module.__typename === 'ContentfulHomepageHero' || module.__typename === 'ContentfulFullWidthImage') {
        return <Section key={ module.id } data={ module } />
      }

      if(module.__typename === 'ContentfulCareers') {
        const careersCarousel = modules.find(module => module.__typename === 'ContentfulCareersCarousel');
        return (
          <AnimationScroll section={module.id} key={ module.id }>
            <Section data={ module } openModal={ this.openModal } careersCarousel={ careersCarousel } forwardRef={this.careersRef} />
          </AnimationScroll>
        );
      }
      
      return (
        <AnimationScroll section={module.id} key={ module.id }>
          <Section 
            data={ module } 
            openModal={ this.openModal } 
            onScrollTo={this.onScrollTo} 
            forwardRef={ module.__typename === 'ContentfulCaseStudiesContainer' ? this.casesRef : null } />
        </AnimationScroll>
      );
    });
  }

  renderFooter = footerData => (
    <AnimationScroll section={ footerData.id }>
      <Footer 
        data={ footerData } 
        forwardRef={ this.footerRef } 
        openModal={ this.openModal } 
        onSocialItemClick={ this.onSocialItemClick } 
        onContactInfoClick={ this.onContactInfoClick } 
      />
    </AnimationScroll>
  );

  renderContactForm = () => {
    const { first_name, email, phone, message, formError, formSuccess, isSending } = this.state;
    return (
      <Modal active={ this.state.contactModal } onModalClose={ this.onModalClose }>
        <ContactForm
          forwardRef={ this.formRef }
          onModalClose={ this.onModalClose }
          sendMail={ this.sendMail }
          onChange={ this.onChange }
          formError={ formError }
          formSuccess={ formSuccess }
          email={ email }
          name={ first_name }
          phone={ phone }
          message={ message }
          isSending={ isSending }
        />
      </Modal>
    );
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const homePageComponents = get(this, 'props.data.allContentfulPage.edges[0].node');
    const footerData = homePageComponents.component.find(item => item.__typename === 'ContentfulFooter');
    const navigationData = homePageComponents.component.find(item => item.__typename === 'ContentfulNavigation');

    return (
      <Layout location={ this.props.location } >
        <Helmet title={ siteTitle } />
        <Header onScrollTo={ this.onScrollTo } data={ navigationData } />

        <main className="main-content">
          {
            this.renderModules(homePageComponents.component)
          }
        </main>
        
        {
          this.renderFooter(footerData)
        }

        {
          this.renderContactForm()
        }
      </Layout>
    )
  }
}

export default RootIndex;

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
            ... on ContentfulNavigation {
              id
              logo {
                file {
                  url
                }
              }
            },
            ... on ContentfulHomepageHero {
              id
              backgroundVideo
              homepageText: text
            }
            ... on ContentfulHowWeWork {
              id
              title
              underlineColor
              howWeWorkText: text
            }
            ... on ContentfulServices {
              id
              leftColumnTitle
              rightColumnTitle
              leftColumnText {
                json
              }
              rightColumnTex {
                json
              }
            }
            ... on ContentfulStartAProject {
              id
              startAProjectText: text
              ctaButtonText
              ctaButtonLink
            }
            ... on ContentfulFullWidthImage {
              id
              image {
                fluid(quality: 100) {
                  base64
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                }
              }
            }
            ... on ContentfulFrameworksContainer {
              id
              frameworks {
                id
                logo {
                  file {
                    url
                  }
                }
                logoCaption
              }
              title
              frameworksText: text {
                json
              }
              list
              ctaButtonLink
              ctaButtonText
            }
            ... on ContentfulCaseStudiesContainer {
              id
              caseStudies {
                id
                servicesList
                servicesTitle
                technologiesList
                technologiesTitle
                eyebrowHeadline
                title
                logo {
                  fluid {
                    src
                    srcSet
                  }
                }
                image {
                  fluid {
                    srcSet
                    src
                  }
                }
                text {
                  json
                }
              }
            }
            ... on ContentfulLeadershipTeamCarousel {
              id
              carouselItem {
                id
                position
                name
                image {
                  fluid {
                    src
                    srcSet
                  }
                }
              }
            }
            ... on ContentfulCareers {
              id
              text {
                json
              }
              ctaButtonText
              ctaButtonLink
              image {
                fluid {
                  src
                  srcSet
                }
              }
            }
            ... on ContentfulCareersCarousel {
              id
              careersImage: image {
                id
                fluid {
                  src
                  srcSet
                }
              }
            }
            ... on ContentfulFooter {
              id
              copyrightsText
              ctaButtonLink
              ctaButtonText
              offices
              title
              contactInfo {
                emailAddress
                phoneNumber
              }
              socialMedia {
                socialMediaLink
                socialMediaIcon {
                  file {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
