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
        </Helmet>
        {children}
      </React.Fragment>
    );
  }
}

export default Template
