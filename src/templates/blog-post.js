import React from 'react';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import { Layout, AnimationScroll, Header, Footer } from "@components";
import COLORS from '@constants/colors';

class BlogPostTemplate extends React.Component {
  render() {
    const meta = get(this, 'props.data.site.siteMetadata');
    const post = get(this.props, 'data.contentfulBlogPost');
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const homePageComponents = get(this, 'props.data.allContentfulPage.edges[0].node');
    const contactFormData = get(this, 'props.data.contentfulContactForm');
    const navigationData = homePageComponents.component.find(item => item.__typename === 'ContentfulNavigation');
    const footerData = homePageComponents.component.find(item => item.__typename === 'ContentfulFooter');
    const { title, description, heroImage, author, publishDate, readTime, category, body } = post;
    const { activePage, slug } = this.props.location && this.props.location.state || {};
    const backLink = slug ? `/category/${slug}` : 'blog';

    const metaData = [
      {
        name: "description",
        content: description.description || meta.description
      }
    ];

    const seo = {
      article: true,
      title: title,
      description: description.description,
      image: heroImage.fixed.src,
      author: author.name
    };

    return (
      <Layout location={ this.props.location } seo={ seo }>
        <Helmet title={`${title} | ${siteTitle}`} meta={ metaData } />
        <Header data={ navigationData } noAnimation={ true } narrow />

        <article className="blog-post blog-post--single">
          { heroImage && 
            <figure className="blog-post__img-wrapper blog-post--single__img-wrapper">
              <img src={ heroImage.fluid.src } srcSet={ heroImage.fluid.srcSet } />
            </figure>
          }
          <div className="section-padding">
            <div className="container">
              <div className="row">
                <div className="col-1"></div>
                <div className="col-8">
                  <div className="blog-post__content blog-post--single__content">
                    
                    <h1 className="blog-post__content__title blog-post--single__content__title">{title}</h1>
                    <div className="blog-post__content__meta-data blog-post--single__content__meta-data">
                      {
                        author.image && 
                        <img 
                          src={ author.image.fixed.src } 
                          srcSet={ author.image.fixed.srcSet } 
                          className="blog-post__content__meta-data__author-image blog-post--single__content__meta-data__author-image" />
                      }
                      <div className="blog-post__content__meta-data__info blog-post--single__content__meta-data__info">
                        <p>{author.name}</p>
                        <p>{publishDate} - {readTime} read</p>
                        <p>
                        {
                          category && category.map((cat, i) => 
                            <Link key={ i } to={`/category/${cat.slug}/`}>{cat.title}{i < (category.length - 1) ? ', ' : ''}</Link>
                          )
                        }
                        </p>
                      </div>
                    </div>
                    <div className="text-small" dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }} />
                  
                    <Link className="button-underlined button-underlined--back" to={ backLink } state={ { activePage } }>
                      <i className="arrow-left"></i>
                      Back to blog
                      <span style={{ backgroundColor: COLORS.orangeDark }}></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

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

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      readTime
      category {
        slug
        title
      }
      author {
        name,
        image {
          fixed(width: 70, quality: 80) {
            src
            srcSet
          }
        }
      }
      heroImage {
        fluid(quality: 90) {
          src
          srcSet
        }
        fixed(width: 1200, quality: 80) {
          src
        }
      }
      description {
        description
      }
      body {
        childMarkdownRemark {
          html
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
