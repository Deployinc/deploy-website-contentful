import React from 'react';
import { Link } from 'gatsby';

export default ({ article, isFeatured, activePage, slug }) => {
  return (
    <article className={`blog-post blog-post--shadow ${isFeatured ? 'blog-post--featured' : ''}`}>
      <figure className="blog-post__img-wrapper">
        <Link to={ `/blog/${article.slug}` } state={ { activePage, slug } }>
          {
          article.heroImage && 
            <img 
              src={ isFeatured ? (article.featuredHeroImage && article.heroImage.fixed.src) : (article.heroImage.fixed && article.heroImage.fixed.src) } 
              srcSet={ isFeatured ? (article.featuredHeroImage && article.featuredHeroImage.fixed.srcSet) : (article.heroImage.fixed && article.heroImage.fixed.srcSet) } 
              alt={ article.title } />
          }
        </Link>
      </figure>
      
      <div className="blog-post__content blog-post--shadow__content">
        <h3 className="blog-post__content__title">
          <Link to={ `/blog/${article.slug}` }  state={ { activePage, slug } }>{article.title}</Link>
        </h3>

        <div className="blog-post__content__meta-data blog-post__meta-data--single">
          {
            article.author.image && 
            <img src={ article.author.image.fixed.src } srcSet={ article.author.image.fixed.srcSet } className="blog-post__content__meta-data__author-image" />
          }
          <div className="blog-post__content__meta-data__info">
            <p>{article.author.name}</p>
            <p>{article.publishDate} - {article.readTime} read</p>
          </div>
        </div>

        <div className="blog-post__content__meta-data blog-post__meta-data--categories">
          <p>Category:&nbsp;
            {
              article.category && article.category.length && article.category.map((cat, i) => 
                <Link key={ i } to={`/category/${cat.slug}/`}>{cat.title}{i < (article.category.length - 1) ? ', ' : ''}</Link>
              )
            }
          </p>
        </div>

        <div className="blog-post__content__description text-small"
          dangerouslySetInnerHTML={ {
            __html: article.description.childMarkdownRemark.html,
          } }
        />
        
        <Link className="button-underlined" to={`/blog/${article.slug}`} state={ { activePage, slug } }>
          Read More <span style={{ backgroundColor: "#fdd4bd" }}></span>
        </Link>
      </div>
    </article>
  );
}
