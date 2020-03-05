import React from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import closeImg from '@assets/images/close-button.svg';

export default ({project, onModalClose}) => {
  const { title, image, eyebrowHeadline, text, servicesTitle, servicesList, technologiesTitle, technologiesList } = project;
  const html = documentToHtmlString(text.json);

  return(
    <div className="modal__content modal--showcase__content">
      <div className="modal--showcase__content__featured-img">
        <img src={ image && image.fluid.src } srcSet={ image && image.fluid.srcSet } alt={ title } />
      </div>

      <div className="modal--showcase__content__project">
        <div className="modal--showcase__content__project__share">
          CASES <span className="line"></span>
        </div>
        <div className="modal--showcase__content__project__text">
          <button type="button" className="modal__button" onClick={ () => onModalClose(`modal${project.id}`) }><img src={ closeImg } alt="close" /></button>
          <div className="modal--showcase__content__project__client text-medium">{eyebrowHeadline}</div>

          <h4 className="modal--showcase__content__project__title">{title}</h4>

          <div className="modal--showcase__content__project__desc" dangerouslySetInnerHTML={{__html: html}} />

          <div className="modal--showcase__content__project__info">
            {
              servicesList && 
              <div>
                <p className="text-small modal--showcase__content__project__info__title">{servicesTitle}</p>
                { 
                  servicesList.map((service, i) => <p key={ i } className="text-small">{service}</p>) 
                }
              </div>
            }

            {
              technologiesList && 
              <div>
                <p className="text-small modal--showcase__content__project__info__title">{technologiesTitle}</p>
                { 
                  technologiesList.map((technology, i) => <p key={ i } className="text-small">{technology}</p>) 
                }
              </div> 
            }
          </div>
        </div>
      </div>
    </div>
  );
};