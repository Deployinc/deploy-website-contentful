import React from 'react';
import { Link } from 'gatsby';

export default ({ article }) => {
  return (
    <article className="blog-post container">
      <h3 className="blog-post__title">
        <Link to={ `/blog/${article.slug}` }>{article.title}</Link>
      </h3>

      <p className="blog-post__description text-small"
        dangerouslySetInnerHTML={ {
          __html: article.description.childMarkdownRemark.html,
        } }
      />
      
      <div className="blog-post__meta-data">
        <p>Author: {article.author.name}</p>
        <p>Date: {article.publishDate}</p>
        <p>Category:&nbsp;
          {
            article.category.length && article.category.map((cat, i) => 
              <Link key={ i } to={`/category/${cat.slug}/`}>{cat.title}{i < (article.category.length - 1) ? ', ' : ''}</Link>
            )
          }
        </p>
        <p>Read Time: {article.readTime}</p>
      </div>
      <Link className="button-underlined" to={`/blog/${article.slug}`}>
        Read More <span style={{ backgroundColor: "#fdd4bd" }}></span>
      </Link>
    </article>
  );
}
