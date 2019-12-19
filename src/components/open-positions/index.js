import React from 'react';
import officeImg from '@assets/images/office/office.jpg';
import closeImg from '@assets/images/close-button.svg';

export default ({positions, onModalClose, onPositionCLick}) => {

  return(
    <div className="modal__content modal--showcase__content modal--positions__content">
      <div className="modal--showcase__content__featured-img modal--positions__content__featured-img">
        <img src={officeImg} alt="Office" />
      </div>
      <div className="modal--showcase__content__project modal--positions__content__project" onClick={onPositionCLick}>
        <button type="button" className="modal__button" onClick={ () => onModalClose(false) }><img src={closeImg} alt="close" /></button>
        <div className="modal--showcase__content__project__share modal--positions__content__project__share">
          CAREERS <span className="line"></span>
        </div>

        <div className="modal--positions__content__open-positions" dangerouslySetInnerHTML = {{__html: positions}} />

      </div>
    </div>
  );
};