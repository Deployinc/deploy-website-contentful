import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import { Layout, AnimationScroll, Header, ArticlePreview, Footer } from "@components";
import window from '@constants/window';

class BlogCategoryTemplate extends React.Component {

  state = {
    activePage: (this.props.location.state && this.props.location.state.activePage) || 0
  };

  postsPerPage = 6;

  onPaginationItemClick = activePage => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.setState({ activePage });
  }

  renderArticles = () => {
    const { activePage } = this.state;
    const postsPerPage = this.postsPerPage;
    const posts = get(this, 'props.data.allContentfulBlogPost.edges');
    const { slug } = this.props.pageContext;

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
                <div key={ post.node.slug } className="col-3">
                  <ArticlePreview article={ post.node } slug={ slug } activePage={ activePage } />
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
    const { description, image } = heroData;
    const { slug, title } = this.props.pageContext;

    return (
      <section className="category-page__header">
        <div className="category-page__header__container container">
          <h1 className="category-page__header__container__title">{title}</h1>
          {
            description && <div className="text-small" dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }} />
          }
          <ul className="category-page__header__container__list">
            <li className="category-page__header__container__list__item">
              <Link to="/blog">All</Link>
            </li>
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
    const meta = get(this, 'props.data.site.siteMetadata');
    const { slug, title: categoryTitle } = this.props.pageContext;
    const page = get(this, 'props.data.allContentfulPage.edges[0].node');
    const pageComponents = get(this, 'props.data.allContentfulPage.edges[0].node');
    const contactFormData = get(this, 'props.data.contentfulContactForm');
    const navigationData = pageComponents.component.find(item => item.__typename === 'ContentfulNavigation');
    const footerData = pageComponents.component.find(item => item.__typename === 'ContentfulFooter');
    const ogImage = pageComponents.component.find(item => item.__typename === 'ContentfulHero').image;

    const { title, metaDescription } = page;

    const description = `Read our blog for your weekly dose of tech topics. Find out more about ${categoryTitle} and stay up to date with the latest news, best practices, tips & tricks, and more.`

    const metaData = [
      {
        name: "description",
        content: description
      }
    ];

    const pageTitle = `${categoryTitle} | ${title || meta.title}`;

    const seo = {
      title: pageTitle,
      description: description,
      image: '//images.ctfassets.net/6afke33grie2/3eiey2skOlXAMWFJqwSN5r/9d49445b0b1da27f87d4e020a7cea320/deploy-logo.png',
      author: false
    };

    return (
      <Layout location={ this.props.location } seo={ seo }>
        <Helmet  title={ pageTitle } meta={ metaData } />
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
            contactFormData={ contactFormData }
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
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }, filter: {category: {elemMatch: {slug: {eq: $slug}}}}) {
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
            fixed(quality: 90, width: 400) {
              src
              srcSet
            }
          }
          author {
            name
            image {
              fixed(width: 45, quality: 80) {
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
    allContentfulCategories(sort: {fields: slug}) {
      nodes {
        slug
        title
      }
    }
    allContentfulPage(filter: {slug: {eq: "blog"}}) {
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
                }
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
