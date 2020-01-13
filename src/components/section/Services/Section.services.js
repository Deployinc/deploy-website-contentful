import React from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const SectionServices = ({forwardRef, data}) => {
  const leftColumn = documentToHtmlString(data.leftColumnText.json);
  const rightColumn = documentToHtmlString(data.rightColumnTex.json);
  return(
    <section className = "services section-padding" ref={forwardRef}>
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <h2 className = "services__title">{data.leftColumnTitle}</h2>
                    <div className="services__item" dangerouslySetInnerHTML={{__html: leftColumn}} />
                </div>

                <div className="col-2"></div>
                
                <div className="col-4">
                    <h2 className = "services__title">{data.rightColumnTitle}</h2>
                    <div className="services__item" dangerouslySetInnerHTML={{__html: rightColumn}} />
                </div>
            </div>
        </div>
    </section>
)
};

export default SectionServices;
