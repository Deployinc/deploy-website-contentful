import React, { Component, Fragment } from 'react';
import { ClientItem, Modal, ProjectDetails } from '@components';

class Clients extends Component {

  state = {
    modal: null
  }

  openModal = (modal) => {
    gtag('event', 'CaseStudyModal', {
      event_category: 'opened'
    });
    this.setState({ modal });
  }

  onModalClose = () => {
    this.setState({ modal: null });
  }

  renderProjectModal = () => {
    const { modal } = this.state;
    if(!modal) return;

    return (
      <Modal key={ modal.id } active={ modal ? true : false } onModalClose={ this.onModalClose }>
        <ProjectDetails project={ modal } onModalClose={ this.onModalClose } />
      </Modal>
    );
  }

  renderClientLogos = () => {
    const { caseStudies } = this.props.data;
    if(!caseStudies) return;

    return caseStudies.map(item => 
      <ClientItem key={ item.id } data={ item } onClick={ () => this.openModal(item) } />
    );
  }

  render() {
    const { forwardRef } = this.props;

    return(
      <Fragment>
        <section className="clients" ref={forwardRef}>
          <div className="container">
            <div className="row">
              <div className="col-1"></div>
              <div className="col-8">
                <div className="clients__logos">
                  {
                    this.renderClientLogos()
                  }
                </div> 
              </div>
            </div>
          </div>
        </section>

        {
          this.renderProjectModal()
        }
      </Fragment>
    );
  }
}

export default Clients;
