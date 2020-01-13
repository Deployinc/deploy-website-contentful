import React from 'react';

export default ({data}) => (
  <section className="fluid-img">
    <img alt="Featured" src={ data.image && data.image.fluid.src } srcSet={ data.image && data.image.fluid.srcSet } />
  </section>
);