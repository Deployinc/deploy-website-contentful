import React, { Component } from 'react';
import Slider from 'react-slick';
import { SliderItem } from '@components';

export default class SectionLeadership extends Component {
    sliderRef = React.createRef();
    leadershipRef = React.createRef();
    scrollCount = null;

    componentDidMount = () => {
      window.addEventListener('touchstart', this.touchStart);
      window.addEventListener('touchmove', this.preventTouch, { passive: false });
      this.intervalId = setInterval(this.toggleScroll, 200);
      if(this.leadershipRef){
        this.leadershipRef.current.addEventListener('wheel', this.onScroll);
      }
    }

    componentWillUnmount(){
      window.removeEventListener('touchstart', this.touchStart);
      window.removeEventListener('touchmove', this.preventTouch, { passive: false });
      clearInterval(this.intervalId);
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
      this.scrollCount = 1;

      if (e.deltaX < 0) {
        this.sliderRef.current.slickNext();
      } else if (e.deltaX > 0) {
        this.sliderRef.current.slickPrev();
      }
    }

    renderSlides = () => {
      const { carouselItem } = this.props.data;

      if(!carouselItem) return;
      console.log({carouselItem});

      return carouselItem.map(item => 
        <SliderItem key={ item.id } image={ item.image } name={ item.name } position={ item.position } />
      );
    }

    render() {
      const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false,
        verticalSwiping: false,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              initialSlide: 0,
              slidesToShow: 1,
              centerMode: true,
              centerPadding: '14%',
            }
          }
        ],
        afterChange: () => gtag('event', 'LeadershipSlider', { event_category: 'slideChanged' })
      };

      return (
        <section className="leadership">
            <div className="leadership__row">
                <div className="col-1"></div>
                <div className="col-9">
                    <div className="leadership__slider" ref={this.leadershipRef}>
                      <Slider {...settings} ref={this.sliderRef}>
                        { 
                          this.renderSlides() 
                        }
                      </Slider>
                    </div>
                </div>
            </div>
        </section>
      );
    }
  }