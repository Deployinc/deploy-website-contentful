import React from 'react';
import Helmet from 'react-helmet';
import "slick-carousel/slick/slick.scss"; 
import "slick-carousel/slick/slick-theme.scss";
import "@styles/style.scss";
import favicon from '../../../static/favicon/favicon.ico';

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    const seo = this.props.seo || {};
    const { image, title, description, article, author } = seo;

    const canonical = `https://www.deployinc.com${location.pathname}`;

    return (
      <React.Fragment>
        <Helmet>
          <link rel="icon" href={favicon} />
          { image && <meta name="image" content={ image } /> }
          { article && <meta property="og:type" content="article" /> }
          { title && <meta property="og:title" content={ title } /> }
          { description && <meta property="og:description" content={ description } /> }
          { image && <meta property="og:image" content={ image } /> }
          { author && <meta name="author" content={ author } /> }
          <link rel="canonical" href={ canonical } />
          <meta name="google-site-verification" content="c7_gfiRbdT0oNSWxeBf1gOQtxrEH_-yDiWr71W3CQyg" />
        </Helmet>
        {children}
      </React.Fragment>
    );
  }
}

export default Template
