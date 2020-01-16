import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import { Layout, AnimationScroll, Header, ArticlePreview, Footer } from "@components";
import { SectionHero } from '@components/section';

class BlogIndex extends React.Component {
  state = {
    activePage: 0
  }

  postsPerPage = 3;

  renderArticles = () => {
    const posts = get(this, 'props.data.allContentfulBlogPost.edges');
    const from = this.state.activePage * this.postsPerPage;
    const to = (this.state.activePage * this.postsPerPage) + this.postsPerPage;
    const postsToShow = posts.slice(from, to);

    return postsToShow.map(({ node }) => 
      <ArticlePreview article={ node } key={ node.slug } />
    )
  };

  renderPagination = () => {
    const { activePage } = this.state;
    const posts = get(this, 'props.data.allContentfulBlogPost.edges');
    const postsCount = posts ? posts.length : 0;
    const pagesNum = Math.ceil(postsCount / this.postsPerPage);
    const pagination = [];

    for(let i = 0; i < pagesNum; i++) {
      pagination.push(
        <li key={ i }>
          <button className={ activePage === i ? 'active' : '' } onClick={ () => this.setState({ activePage: i }) }>{i + 1}</button>
        </li>
      );
    }

    return (
      <ul className="articles__pagination">
        <li>
          <button className={`button ${activePage > 0 && 'button--active'}`} onClick={ () => this.setState({ activePage: activePage - 1 }) }>&lt;</button>
        </li>

        { pagination }
        <li>
          <button className={`button ${activePage < (pagesNum - 1) && 'button--active' }`} onClick={ () => this.setState({ activePage: activePage + 1 }) }>&gt;</button>
        </li>
      </ul>
    )
  }
  
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const homePageComponents = get(this, 'props.data.allContentfulPage.edges[0].node');
    const navigationData = homePageComponents.component.find(item => item.__typename === 'ContentfulNavigation');
    const heroData = homePageComponents.component.find(item => item.__typename === 'ContentfulHomepageHero');
    const footerData = homePageComponents.component.find(item => item.__typename === 'ContentfulFooter');
    heroData.homepageText = 'Deploy Blog';

    return (
      <Layout location={ this.props.location }>
        <Helmet title={siteTitle} />
        <Header data={ navigationData } />
        <main className="main-content">
          <SectionHero data={ heroData } className="hero--articles" />

          <section className="articles section-padding">
            {
              this.renderArticles()
            }

            {
              this.renderPagination()
            }
          </section>
        </main>

        <AnimationScroll section={ footerData.id }>
          <Footer
            className="no-margin"
            data={ footerData }
          />
        </AnimationScroll>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          readTime
          category {
            slug
            title
          }
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          author {
            name
          }
          description {
            childMarkdownRemark {
              html
            }
          }
          body {
            childMarkdownRemark {
              html
            }
          }
        }
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
`
