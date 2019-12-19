import React from 'react';

import { Button } from '../../index';

const SectionStartProject = ({ content, openModal }) => (
  <section className="startProject section-padding">
    <div className="container">
      <div className="row">
        <div className="col-5">
          <p className="startProject__content">{content}</p>
        </div>
        <div className="col-5">
          <Button text="Start a project" size="large" href="#footer" color="#d5f0d3" onClick={openModal} />
        </div>
      </div>
    </div>
  </section>
);

export default SectionStartProject;