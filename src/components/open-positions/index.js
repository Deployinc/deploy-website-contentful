import React from 'react';
import closeImg from '@assets/images/close-button.svg';

export default ({ data, positions, onModalClose, onPositionCLick }) => {
  console.log(data);
  if(!positions) return null;
  return (
    <div className="modal__content modal--showcase__content modal--positions__content">
      <div className="modal--showcase__content__featured-img modal--positions__content__featured-img">
        <img src={ data.image.fluid.src } srcSet={ data.image.fluid.srcSet } alt="Office" />
      </div>
      <div className="modal--showcase__content__project modal--positions__content__project" onClick={onPositionCLick}>
        <button type="button" className="modal__button" onClick={ () => onModalClose(false) }><img src={closeImg} alt="close" /></button>
        <div className="modal--showcase__content__project__share modal--positions__content__project__share">
          CAREERS <span className="line"></span>
        </div>

        <div className="modal--positions__content__open-positions">
          <h2>{data.title}</h2>
          <div dangerouslySetInnerHTML = {{__html: positions}} />
        </div>

      </div>
    </div>
  );
};