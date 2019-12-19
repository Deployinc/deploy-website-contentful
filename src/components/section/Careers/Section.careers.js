import React, { Component, Fragment } from 'react';
import { SliderItem, OpenPositions, Modal } from '../../index';
import { Button } from '../../index';
import Slider from 'react-slick';
// import axios from 'axios';

import officeImg from '@assets/images/office/office.jpg';
import officeImg1 from '@assets/images/office/1.jpg';
import officeImg2 from '@assets/images/office/2.jpg';
import officeImg3 from '@assets/images/office/3.jpg';
import officeImg4 from '@assets/images/office/4.jpg';
import officeImg5 from '@assets/images/office/5.jpg';
import officeImg6 from '@assets/images/office/6.jpg';
import officeImg7 from '@assets/images/office/7.jpg';
import officeImg8 from '@assets/images/office/8.jpg';
import officeImg9 from '@assets/images/office/9.jpg';

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
      const { data } = await fetch('https://deploy.bamboohr.com/jobs/embed2.php'); 
      const editedData = data.replace(new RegExp('<a', 'g'), '<a target="_blank"');
      this.setState({positions: editedData});
    } catch (error) {
      console.error(error);
    }
  }

  componentWillUnmount(){
    window.removeEventListener('touchstart', this.touchStart);
    window.removeEventListener('touchmove', this.preventTouch, {passive: false});
  }

  touchStart(e){
    this.firstClientX = e.touches[0].clientX;
    this.firstClientY = e.touches[0].clientY;
  }

  preventTouch(e){
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
    gtag('event', 'CareersModal', {
      event_category: 'opened'
    });
    this.setState({modal: true});
  }

  onModalClose = (value) => {
    this.setState({modal: value});
  }
  
  onPositionClick = event => {
    if(event.target.tagName.toLowerCase() == 'a') {
      gtag('event', 'openPositionExternalLink', {
        event_category: 'click'
      });
    }
  }

  render() {
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
      afterChange: () => gtag('event', 'CareersSlider', { event_category: 'slideChanged' })
    };

    const { modal, positions } = this.state;

    return(
      <Fragment>
        <section className="careers section-padding">
          <div className="careers__row" ref={this.props.forwardRef}>
            <div className="col-5">
              <img src={officeImg} alt="Office" className="careers__office-img" />
            </div>

            <div className="col-5">
              <div className="careers__content">
                <p className="text-medium">We partner with companies and brands globally, strategically holding offices in Los Angeles, Seattle, Austin and Belgrade. Our unique locations and diverse backgrounds enable us to bring strong perspectives to our clients’ most difficult challenges.</p>

                <Button text="View openings" href="#" color="#fdd4bd" onClick={this.openModal} />

                <div className="slider" ref={this.careersRef}>
                  <Slider {...settings} ref={this.sliderRef} after>
                    <SliderItem img={officeImg1} imgName="Deploy Office" />
                    <SliderItem img={officeImg2} imgName="Deploy Office" />
                    <SliderItem img={officeImg3} imgName="Deploy Office" />
                    <SliderItem img={officeImg4} imgName="Deploy Office" />
                    <SliderItem img={officeImg5} imgName="Deploy Office" />
                    <SliderItem img={officeImg6} imgName="Deploy Office" />
                    <SliderItem img={officeImg7} imgName="Deploy Office" />
                    <SliderItem img={officeImg8} imgName="Deploy Office" />
                    <SliderItem img={officeImg9} imgName="Deploy Office" />
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Modal active={modal} onModalClose={this.onModalClose}>
          <OpenPositions positions={positions} onModalClose={this.onModalClose} onPositionCLick={this.onPositionClick} />
        </Modal>
      </Fragment>
    );
  }
}

export default Careers;