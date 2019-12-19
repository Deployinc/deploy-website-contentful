import React from 'react';

import { Frameworks, Button } from '../../index';

export default ({ onScrollTo, openModal }) => (
  <section className="frameworks section-padding">
    <div className="container">
      <h2 className="section-title">Experience across all major frameworks</h2>

      <Frameworks />

      <div className="row">
        <div className="col-1"></div>

        <div className="col-4">
          <ol className="frameworks__list">
            <li className="frameworks__list__item text-medium">Web Applications</li>
            <li className="frameworks__list__item text-medium">Mobile Apps</li>
            <li className="frameworks__list__item text-medium">Responsive Websites</li>
            <li className="frameworks__list__item text-medium">eCommerce</li>
            <li className="frameworks__list__item text-medium">Digital Platforms</li>
            <li className="frameworks__list__item text-medium">Enterprise Software</li>
            <li className="frameworks__list__item text-medium">Data Management</li>
            <li className="frameworks__list__item text-medium">Connected Ecosystems</li>
            <li className="frameworks__list__item text-medium">Blockchain</li>
          </ol>
        </div>

        <div className="col-5">
          <div className="frameworks__description">
            <p className="text-medium">Our offering is multifaceted, finding simple solutions to the most complex problems. Responsive websites, mobile apps, interactive platforms, IoT, Blockchain, web apps, CMS, data management...we've got it covered. Most importantly, we're really great at what we do. We'll work collaboratively, alongside your teams to develop the best technical solutions for any challenge — leading to measurable results.

            <br /><br />Not sure what your project requires?</p>

            <Button text="Let's chat" href="#" color="#fdd4bd" onClick={openModal} />
          </div>
        </div>
      </div>
    </div>
  </section>
);