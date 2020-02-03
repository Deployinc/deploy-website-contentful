import React from 'react';
import { Link } from 'gatsby';

export default ({ article, isFeatured }) => {
  return (
    <article className={`blog-post blog-post--shadow ${isFeatured ? 'blog-post--featured' : ''}`}>
      <figure className="blog-post__img-wrapper">
        <Link to={ `/blog/${article.slug}` }>
          <img src={article.heroImage.fixed.src} srcSet={article.heroImage.fixed.srcSet} alt={article.title}/>
        </Link>
      </figure>
      
      <div className="blog-post__content blog-post--shadow__content">
        <h3 className="blog-post__content__title">
          <Link to={ `/blog/${article.slug}` }>{article.title}</Link>
        </h3>

        <div className="blog-post__content__description text-small"
          dangerouslySetInnerHTML={ {
            __html: article.description.childMarkdownRemark.html,
          } }
        />

        <div className="blog-post__content__meta-data blog-post__meta-data--categories">
          <p>Category:&nbsp;
            {
              article.category && article.category.length && article.category.map((cat, i) => 
                <Link key={ i } to={`/category/${cat.slug}/`}>{cat.title}{i < (article.category.length - 1) ? ', ' : ''}</Link>
              )
            }
          </p>
        </div>

        <div className="blog-post__content__meta-data blog-post__meta-data--single">
          {
            article.author.image && 
            <img src={ article.author.image.fixed.src } className="blog-post__content__meta-data__author-image" />
          }
          <div className="blog-post__content__meta-data__info">
            <p>{article.author.name}</p>
            <p>{article.publishDate} - {article.readTime} read</p>
          </div>
        </div>
        
        {/* <div className="blog-post__meta-data">
          <p>Author: {article.author.name}</p>
          <p>Date: {article.publishDate}</p>
          
          <p>Read Time: {article.readTime}</p>
        </div> */}
        <Link className="button-underlined" to={`/blog/${article.slug}`}>
          Read More <span style={{ backgroundColor: "#fdd4bd" }}></span>
        </Link>
      </div>
    </article>
  );
}
