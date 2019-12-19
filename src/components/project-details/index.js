import React from 'react';

import closeImg from '@assets/images/close-button.svg';

export default ({project, onModalClose}) => {
  const { image, client, name, description, smallDescription, services, technologies } = project;

  return(
    <div className="modal__content modal--showcase__content">
      <div className="modal--showcase__content__featured-img">
        <img src={image} alt={name} />
      </div>

      <div className="modal--showcase__content__project">
        <div className="modal--showcase__content__project__share">
          CASES <span className="line"></span>
        </div>
        <div className="modal--showcase__content__project__text">
          <button type="button" className="modal__button" onClick={ () => onModalClose(`modal${project.id}`) }><img src={closeImg} alt="close" /></button>
          <div className="modal--showcase__content__project__client text-medium">{client}</div>

          <h4 className="modal--showcase__content__project__title">{name}</h4>

          <p className="modal--showcase__content__project__desc" dangerouslySetInnerHTML={{__html: description}} />

          {smallDescription && <p className="text-small" dangerouslySetInnerHTML={{__html: smallDescription}} />}

          <div className="modal--showcase__content__project__info">
            {services && 
              <div>
                <p className="text-small modal--showcase__content__project__info__title">Services</p>
                { services.map((service, i) => <p key={i} className="text-small">{service}</p>)}
              </div>
            }

            {technologies && 
              <div>
                <p className="text-small modal--showcase__content__project__info__title">Technologies</p>
                {technologies.map((technology, i) => <p key={i} className="text-small">{technology}</p>)}
              </div> 
            }
          </div>
        </div>
      </div>
    </div>
  );
};