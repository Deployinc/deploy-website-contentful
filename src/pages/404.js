import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import COLORS from '@constants/colors';
import { Layout, Header, Footer } from "@components";

class NotFound extends Component {
  render() {
    const meta = get(this, 'props.data.site.siteMetadata');
    const pageComponents = get(this, 'props.data.allContentfulPage.edges[0].node');
    const contactFormData = get(this, 'props.data.contentfulContactForm');
    const heroData = pageComponents.component.find(item => item.__typename === 'ContentfulHero');
    const footerData = pageComponents.component.find(item => item.__typename === 'ContentfulFooter');
    const navigationData = pageComponents.component.find(item => item.__typename === 'ContentfulNavigation');
    const { title, description, image } = heroData;

    return (
      <Layout location={ this.props.location }>
        <Helmet title={ `Page Not Found | ${meta.title}` } />
        <Header data={ navigationData } noAnimation={ true } />
        <section className="category-page__header header-404">
          <div className="category-page__header__container container">
            <h1 className="category-page__header__container__title">{title}</h1>
            {
              description && <div className="text-small" dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }} />
            }
            <Link className="button-underlined button-underlined--back white" to='/'>
              Go to homepage
              <i className="arrow-right"></i> 
              <span style={{ backgroundColor: COLORS.orangeDark }}></span>
            </Link>
          </div>
          {
            image && <img src={image.fluid.src} srcSet={image.fluid.srcSet} className="category-page__header__image" />
          }
        </section>
        <Footer
          contactFormData={ contactFormData }
          className="no-margin"
          data={ footerData } 
          noAnimation
        />
      </Layout>
    );
  }
}

export default NotFound;

export const pageQuery = graphql`
  query query404 {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPage(filter: {slug: {eq: "404"}}) {
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
            ... on ContentfulHero {
              id
              title
              description {
                childMarkdownRemark {
                  html
                }
              }
              image {
                fluid {
                  src
                  srcSet
                },
                fixed(width: 1200, quality: 80) {
                  src
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
`