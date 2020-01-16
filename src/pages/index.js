import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import { 
  Header, 
  Footer, 
  Image, 
  AnimationScroll, 
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
  state = {
    contactModal: false
  };

  toggleModal = (value) => {
    this.setState({ contactModal: value });
  }
  
  servicesRef = React.createRef();
  casesRef = React.createRef();
  careersRef = React.createRef();
  footerRef = React.createRef();

  onScrollTo = type => {
    const ref = type || 'footerRef';

    if (!this[ref]) return;

    this[ref].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
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
            <Section data={ module } openModal={ this.toggleModal } careersCarousel={ careersCarousel } forwardRef={ this.careersRef } />
          </AnimationScroll>
        );
      }
      
      return (
        <AnimationScroll section={module.id} key={ module.id }>
          <Section 
            data={ module } 
            openModal={ this.toggleModal }
            onScrollTo={this.onScrollTo} 
            forwardRef={ 
              module.__typename === 'ContentfulCaseStudiesContainer' ? this.casesRef : 
              (module.__typename === 'ContentfulServices' ? this.servicesRef : null) 
            } />
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
        contactModal={ this.state.contactModal }
        toggleModal={ this.toggleModal }
      />
    </AnimationScroll>
  );

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
