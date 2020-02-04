import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import { Layout, AnimationScroll, Header, ArticlePreview, Footer } from "@components";

class BlogIndex extends React.Component {

  state = {
    activePage: 0
  };

  postsPerPage = 6;

  onPaginationItemClick = activePage => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.setState({ activePage });
  }

  renderArticles = () => {
    const { activePage } = this.state;
    const postsPerPage = activePage === 0 ? (this.postsPerPage + 1) : this.postsPerPage;
    const posts = get(this, 'props.data.allContentfulBlogPost.edges');

    if(!posts.length) {
      return <p className="category-page__no-posts">Currently we don't have any articles.</p>
    };
    
    let featured = posts.findIndex(({ node }) => node.featured === true);
    if(featured === -1) {
      featured = 0;
    }

    const postsNew = [
      posts[featured],
      ...posts.filter((post, i) => i !== featured)
    ];

    const from = this.state.activePage * postsPerPage;
    const to = (activePage * postsPerPage) + postsPerPage;
    const postsToShow = postsNew.slice(from, to);

    return(
      <div className="container">
        <div className="row">
          {
            postsToShow.map(({ node }, i) => {
              const isFeatured = activePage === 0 && i === 0;
              return (
                <div className={`${!isFeatured ? 'col-3' : 'col-10'}`}>
                  <ArticlePreview 
                    article={ node } 
                    key={ node.slug } 
                    isFeatured={ isFeatured } />
                </div>
              )
            })
          }
        </div>
      </div>
    )
  };

  renderPagination = () => {
    const { activePage } = this.state;
    const posts = get(this, 'props.data.allContentfulBlogPost.edges');
    const postsCount = posts ? posts.length : 0;
    const pagesNum = Math.ceil(postsCount / this.postsPerPage);
    const pagination = [];
    if (!pagesNum) return;

    for(let i = 0; i < pagesNum; i++) {
      pagination.push(
        <li>
          <button className={ activePage === i ? 'active' : '' } onClick={ () => this.onPaginationItemClick(i) }>{i + 1}</button>
        </li>
      );
    }

    return (
      <ul className="articles__pagination">
        <li>
          <button className={`button ${activePage > 0 && 'button--active'}`} onClick={ () => this.onPaginationItemClick(activePage - 1) }>&lt;</button>
        </li>

        { pagination }
        <li>
          <button className={`button ${activePage < (pagesNum - 1) && 'button--active' }`} onClick={ () => this.onPaginationItemClick(activePage + 1) }>&gt;</button>
        </li>
      </ul>
    )
  }

  renderHeader = () => {
    const categories = get(this, 'props.data.allContentfulCategories.nodes');
    const pageComponents = get(this, 'props.data.allContentfulPage.edges[0].node');
    const heroData = pageComponents.component.find(item => item.__typename === 'ContentfulHero');
    const { title, description, image } = heroData;
    const { slug } = this.props.pageContext;

    return (
      <section className="category-page__header">
        <div className="category-page__header__container container">
          <h3 className="category-page__header__container__title">{title}</h3>
          {
            description && <div className="text-small" dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }} />
          }
          <ul className="category-page__header__container__list">
            {
              categories && categories.map((category, i) => 
                <li 
                  key={i} 
                  className={`category-page__header__container__list__item ${slug === category.slug ? 'category-page__header__container__list__item--active' : ''}`}>
                  <Link to={`/category/${category.slug}/`}>{category.title}</Link>
                </li>
              )
            }
          </ul>
        </div>
        {
          image && <img src={image.fluid.src} srcSet={image.fluid.srcSet} className="category-page__header__image" />
        }
      </section>
    );
  }
  
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const pageComponents = get(this, 'props.data.allContentfulPage.edges[0].node');
    const navigationData = pageComponents.component.find(item => item.__typename === 'ContentfulNavigation');
    const footerData = pageComponents.component.find(item => item.__typename === 'ContentfulFooter');

    return (
      <Layout location={ this.props.location }>
        <Helmet title={siteTitle} />
        <Header data={ navigationData } noAnimation={ true } />
        <main className="main-content category-page">
          {
            this.renderHeader()
          }
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

export default BlogIndex;

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
          readTime
          heroImage {
            fixed(width: 800) {
              src
              srcSet
            }
          }
          category {
            slug
            title
          }
          author {
            name
            image {
              fixed(width: 140) {
                src
                srcSet
              }
            }
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
    allContentfulCategories {
      nodes {
        slug
        title
      }
    }
    allContentfulPage(filter: {title: {eq: "Blog"}}) {
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
`
