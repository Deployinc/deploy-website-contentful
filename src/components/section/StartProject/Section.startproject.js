import React from 'react';
import { Button } from '@components';

const SectionStartProject = ({ openModal, data }) => (
  <section className="startProject section-padding">
    <div className="container">
      <div className="row">
        <div className="col-5">
          <p className="startProject__content">{data.startAProjectText}</p>
        </div>
        <div className="col-5">
          <Button text={data.ctaButtonText} size="large" color="#d5f0d3" onClick={ data.ctaButtonLink === 'contactForm' ? () => openModal(true) : null } />
        </div>
      </div>
    </div>
  </section>
);

export default SectionStartProject;