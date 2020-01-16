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

    return (
      <React.Fragment>
        <Helmet>
          <link rel="icon" href={favicon} />
          <script async src="https://www.googletagmanager.com/gtag/js?id=AW-UA-30456352-1"></script>
          <script>
            {`
              if(window) {
                window.dataLayer = window.dataLayer || [];
                function gtag() { dataLayer.push(arguments) }
                gtag('js', new Date());
                gtag('config', 'UA-30456352-1');
              }
            `}
          </script>
          <script
            async 
            defer 
            src="https://www.google.com/recaptcha/api.js">
          </script>
        </Helmet>
        {children}
      </React.Fragment>
    );
  }
}

export default Template