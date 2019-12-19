// === MODAL COMP === //
import React, { Component } from 'react';
import classnames from 'classnames';

class Modal extends Component {

  state = {
    active: this.props.active
  }

  static getDerivedStateFromProps (newProps, state) {
    if (newProps.active !== state.active) {
      if (newProps.active) {
        document.body.style.overflow = 'hidden';
      } else { 
        document.body.style.overflow = 'initial';
      }
      return {
        active: newProps.active
      };
    }
    return state;
  }

  handleClose = e => {
    if (e.target.getAttribute('data-name') === 'modal') {
      this.props.onModalClose(!this.state.active);
    }
  }

  handleClick = () => {
    this.props.onModalClose(!this.state.active);
  }

  render () {
    const { children } = this.props;
    return (
      <div
        className={ classnames({
          'modal': true,
          'modal--open': this.state.active
        }) }
        data-name="modal"
        onClick={ this.handleClose }>

        {children}
      </div>
    );
  }
}

export default Modal;
