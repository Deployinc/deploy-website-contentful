import React from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Frameworks, Button } from '@components';

export default ({ data, openModal }) => {
  const html = documentToHtmlString(data.frameworksText.json);
  return (
    <section className="frameworks section-padding">
      <div className="container">
        <h2 className="section-title">{data.title}</h2>

        <Frameworks frameworks={data.frameworks} />

        <div className="row">
          <div className="col-1"></div>

          <div className="col-4">
            <ul className="frameworks__list">
              {
                data.list && data.list.map((item, i) => <li key={ i } className="frameworks__list__item text-medium">{item}</li>)
              }
            </ul>
          </div>

          <div className="col-5">
            <div className="frameworks__description">
              <div className="text-medium" dangerouslySetInnerHTML={{ __html: html }} />

              <Button text={ data.ctaButtonText } color="#fdd4bd" onClick={data.ctaButtonLink === 'contactForm' ? openModal : null} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}