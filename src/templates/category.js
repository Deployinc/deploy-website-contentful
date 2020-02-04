import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import { Layout, AnimationScroll, Header, ArticlePreview, Footer } from "@components";
import window from '@constants/window';

class BlogCategoryTemplate extends React.Component {

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
      return <p className="category-page__no-posts">No articles in this category.</p>
    };

    const from = this.state.activePage * postsPerPage;
    const to = (activePage * postsPerPage) + postsPerPage;
    const postsToShow = posts.slice(from, to);
    
    return(
      <div className="container">
        <div className="row">
          {
            postsToShow.map((post, i) => {
              return (
                <div className="col-3">
                  <ArticlePreview 
                    article={ post.node } 
                    key={ post.node.slug } />
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

    if(!pagesNum) return;

    for(let i = 0; i < pagesNum; i++) {
      pagination.push(
        <li key={ i }>
          <button className={ activePage === i ? 'active' : '' } onClick={ () => this.onPaginationItemClick(i) }>{i + 1}</button>
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

export default BlogCategoryTemplate;

export const pageQuery = graphql`
  query BlogPostByCategory($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(filter: {category: {elemMatch: {slug: {eq: $slug}}}}) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          readTime
          category {
            title
            slug
          }
          heroImage {
            fixed(width: 800) {
              src
              srcSet
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
