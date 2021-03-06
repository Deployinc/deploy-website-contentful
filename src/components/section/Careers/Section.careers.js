import React, { Component, Fragment } from 'react';
import Slider from 'react-slick';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Img from 'gatsby-image';
import { SliderItem, OpenPositions, Modal, Button } from '@components';
import { trackCustomEvent } from '@lib/helpers';

class Careers extends Component {

  sliderRef = React.createRef();
  careersRef = React.createRef();
  scrollCount = null;

  state = {
    positions: null,
    modal: false
  }

  componentDidMount = () => {
    this.getJobs();
    window.addEventListener('touchstart', this.touchStart);
    window.addEventListener('touchmove', this.preventTouch, {passive: false});
    this.intervalId = setInterval(this.toggleScroll, 200);
    if(this.careersRef){
      this.careersRef.current.addEventListener('wheel', this.onScroll);
    }
  }

  getJobs = async () => {
    try {
      const res = await fetch('https://deploy.bamboohr.com/jobs/embed2.php'); 
      const data = await res.text();
      if(!data) return;
      const editedData = data.replace(new RegExp('<a', 'g'), '<a target="_blank"');
      this.setState({positions: editedData});
    } catch (error) {
      console.error(error);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('touchstart', this.touchStart);
    window.removeEventListener('touchmove', this.preventTouch, {passive: false});
  }

  touchStart(e) {
    this.firstClientX = e.touches[0].clientX;
    this.firstClientY = e.touches[0].clientY;
  }

  preventTouch(e) {
    const minValue = 5; // threshold

    this.clientX = e.touches[0].clientX - this.firstClientX;
    this.clientY = e.touches[0].clientY - this.firstClientY;

    // Vertical scrolling does not work when you start swiping horizontally.
    if(Math.abs(this.clientX) > minValue && e.cancelable){ 
        e.preventDefault();
        e.returnValue = false;
        return false;
    }
  }

  toggleScroll = () => {
    this.scrollCount = 0;
  }

  onScroll = e => {
    e.preventDefault();
    if(this.scrollCount) return 0;
    this.scrollCount=1;
    if (e.deltaX < 0) {
      this.sliderRef.current.slickNext();
    } else if (e.deltaX > 0) {
      this.sliderRef.current.slickPrev();
    }
  }

  openModal = (e) => {
    trackCustomEvent({
      category: 'opened',
      action: 'CareersModal'
    });
    
    this.setState({modal: true});
  }

  onModalClose = (value) => {
    this.setState({modal: value});
  }
  
  onPositionClick = event => {
    if(event.target.tagName.toLowerCase() == 'a') {
      trackCustomEvent({
        category: 'click',
        action: 'openPositionExternalLink'
      });
    }
  }

  renderSlider = () => {
    const settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 700,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '16.5%',
      verticalSwiping: false,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            centerPadding: '11%',
          }
        }
      ],
      afterChange: () => {
        trackCustomEvent({
          category: 'slideChanged',
          action: 'CareersSlider'
        });
      }
    };

    const { careersCarousel } = this.props;
    const { careersImage } = careersCarousel;
    if(!careersImage) return null;

    return(
      <div className="slider" ref={this.careersRef}>
        <Slider {...settings} ref={this.sliderRef} after>
          {
            careersImage.map(item =>
              <SliderItem key={ item.id } image={ item } name="Deploy Inc. Office" />  
            )
          }
        </Slider>
      </div>
    )
  }

  render() {
    const { data } = this.props;
    const { modal, positions } = this.state;
    const html = documentToHtmlString( data && data.text.json);

    return(
      <Fragment>
        <section className="careers section-padding" id="careers">
          <div className="careers__row" ref={this.props.forwardRef}>
            <div className="col-5">
              <Img 
                fluid={ data.image.fluid }
                // srcSet={ data && data.image && data.image.fluid.srcSet } 
                alt="Deploy Inc. Office" 
                className="careers__office-img" />
            </div>

            <div className="col-5">
              <div className="careers__content">
                <div className="text-medium" dangerouslySetInnerHTML={{ __html: html }} />

                <Button text={ data.ctaButtonText } color="#fdd4bd" onClick={ data.ctaButtonLink === 'careersPopup' ? this.openModal : null} />

                {
                  this.renderSlider()
                }
              </div>
            </div>
          </div>
        </section>

        <Modal active={ modal } onModalClose={ this.onModalClose }>
          <OpenPositions positions={ positions}  onModalClose={ this.onModalClose } onPositionCLick={ this.onPositionClick } />
        </Modal>
      </Fragment>
    );
  }
}

export default Careers;