import React from 'react';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import { Layout, AnimationScroll, Header, Footer } from "@components";
import COLORS from '@constants/colors';

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost');
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const homePageComponents = get(this, 'props.data.allContentfulPage.edges[0].node');
    const navigationData = homePageComponents.component.find(item => item.__typename === 'ContentfulNavigation');
    const footerData = homePageComponents.component.find(item => item.__typename === 'ContentfulFooter');

    return (
      <Layout location={ this.props.location } >
        <Helmet title={`${post.title} | ${siteTitle}`} />
        <Header data={ navigationData } noAnimation={ true } />

        <article className="blog-post blog-post--single">
          { post.heroImage && 
            <figure className="blog-post__img-wrapper blog-post--single__img-wrapper">
              <img src={ post.heroImage.fluid.src } srcSet={ post.heroImage.fluid.srcSet } />
            </figure>
          }
          <div className="section-padding">
            <div className="blog-post__content blog-post--single__content">
              <div className="container">
                <h1 className="blog-post__content__title blog-post--single__content__title">{post.title}</h1>
                <div className="blog-post__content__meta-data blog-post--single__content__meta-data">
                  {
                    post.author.image && 
                    <img 
                      src={ post.author.image.fixed.src } 
                      className="blog-post__content__meta-data__author-image blog-post--single__content__meta-data__author-image" />
                  }
                  <div className="blog-post__content__meta-data__info blog-post--single__content__meta-data__info">
                    <p>{post.author.name}</p>
                    <p>{post.publishDate} - {post.readTime} read</p>
                    <p>
                    {
                      post.category && post.category.map((cat, i) => 
                        <Link key={ i } to={`/category/${cat.slug}/`}>{cat.title}{i < (post.category.length - 1) ? ', ' : ''}</Link>
                      )
                    }
                    </p>
                  </div>
                </div>
                <div className="text-small" dangerouslySetInnerHTML={{ __html: post.body.childMarkdownRemark.html }} />
                
                <Link className="button-underlined button-underlined--back" to="/blog">
                  <i className="arrow-left"></i>
                  Back to the blog
                  <span style={{ backgroundColor: COLORS.orangeDark }}></span>
                </Link>
                  
              </div>
            </div>
          </div>
        </article>

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
          fixed(width: 140) {
            src
            srcSet
          }
        }
      }
      heroImage {
        fluid {
          src
          srcSet
        }
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
  }
`
