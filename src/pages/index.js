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

  renderFooter = () => {
    const page = get(this, 'props.data.allContentfulPage.edges[0].node');
    const footerData = page.component.find(item => item.__typename === 'ContentfulFooter');
    const contactFormData = get(this, 'props.data.contentfulContactForm');

    return (
      <AnimationScroll section={ footerData.id }>
        <Footer 
          data={ footerData } 
          contactFormData={ contactFormData }
          forwardRef={ this.footerRef } 
          openModal={ this.openModal } 
          onSocialItemClick={ this.onSocialItemClick } 
          onContactInfoClick={ this.onContactInfoClick } 
          contactModal={ this.state.contactModal }
          toggleModal={ this.toggleModal }
        />
      </AnimationScroll>
    )
  };

  render() {
    const meta = get(this, 'props.data.site.siteMetadata');
    const page = get(this, 'props.data.allContentfulPage.edges[0].node');
    const footerData = page.component.find(item => item.__typename === 'ContentfulFooter');
    const contactFormData = get(this, 'props.data.contentfulContactForm');
    const navigationData = page.component.find(item => item.__typename === 'ContentfulNavigation');
    const { title, metaDescription } = page;
    const metaData = [
      {
        name: "description",
        content: metaDescription || meta.description
      }
    ];

    const seo = {
      title: title,
      description: metaDescription || meta.description,
      image: '//images.ctfassets.net/6afke33grie2/3eiey2skOlXAMWFJqwSN5r/9d49445b0b1da27f87d4e020a7cea320/deploy-logo.png',
      author: false
    };

    return (
      <Layout location={ this.props.location } seo={ seo } >
        <Helmet title={ title || meta.siteTitle } meta={ metaData } />
        <Header onScrollTo={ this.onScrollTo } data={ navigationData } />

        <main className="main-content">
          {
            this.renderModules(page.component)
          }
        </main>
        
        {
          this.renderFooter()
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
    allContentfulPage(filter: {slug: {eq: "homepage"}}) {
      edges {
        node {
          title
          metaDescription
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
                fluid(quality: 80) {
                  src
                  srcSet
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
                  fluid(maxWidth: 120, quality: 80) {
                    src
                    srcSet
                  }
                  fixed(width: 120, quality: 80) {
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
                  fluid(maxWidth: 500, quality: 80) {
                    ...GatsbyContentfulFluid_tracedSVG
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
                fluid(maxWidth: 640, quality: 80) {
                  ...GatsbyContentfulFluid_tracedSVG
                }
                fixed(width: 1200, quality: 80) {
                  src
                }
              }
            }
            ... on ContentfulCareersCarousel {
              id
              careersImage: image {
                id
                fluid(maxWidth: 500, quality: 80) {
                  ...GatsbyContentfulFluid_tracedSVG
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
    contentfulContactForm {
      ctaButtonText
      emailPlaceholder
      image {
        fluid(maxWidth: 1000, quality: 80) {
          src
          srcSet
        }
      }
      messagePlaceholder
      namePlaceholder
      phonePlaceholder
      title
      text {
        json
      }
    }
  }
`;
