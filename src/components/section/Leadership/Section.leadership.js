import React, { Component } from 'react';
import { SliderItem } from '../../index';
import Slider from 'react-slick';

import mina from '@assets/images/leadership/mina-laban.jpg';
import jon from '@assets/images/leadership/jon-polikowski.jpg';
import ana from '@assets/images/leadership/ana-kovanovic.jpg';
import aleksandrak from '@assets/images/leadership/aleksandra-kotorac.jpg';
import leto from '@assets/images/leadership/leto-bukarica.jpg';
import milosn from '@assets/images/leadership/milos-nikolic.jpg';
import milost from '@assets/images/leadership/milos-tesic.jpg';
import slobodan from '@assets/images/leadership/slobodan-jovicic.jpg';
import viktor from '@assets/images/leadership/viktor-ristic.jpg';
import vladimir from '@assets/images/leadership/vladimir-zecevic.jpg';
import jezda from '@assets/images/leadership/jezdimir-loncar.jpg';
import iva from '@assets/images/leadership/iva-filipovski.jpg';
import lea from '@assets/images/leadership/lea-petric.jpg';
import michael from '@assets/images/leadership/michael-karney.jpg';
import sasa from '@assets/images/leadership/sasa-rankovic.jpg';
import srdjan from '@assets/images/leadership/srdjan-misic.jpg';


export default class SectionLeadership extends Component {

    sliderRef = React.createRef();
    leadershipRef = React.createRef();
    scrollCount = null;

    componentDidMount = () => {
      window.addEventListener('touchstart', this.touchStart);
      window.addEventListener('touchmove', this.preventTouch, {passive: false});
      this.intervalId = setInterval(this.toggleScroll, 200);
      if(this.leadershipRef){
        this.leadershipRef.current.addEventListener('wheel', this.onScroll);
      }
    }

    componentWillUnmount(){
      window.removeEventListener('touchstart');
      window.removeEventListener('touchmove', this.preventTouch, {passive: false});
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
      this.scrollCount=1;

      if (e.deltaX < 0) {
        this.sliderRef.current.slickNext();
      } else if (e.deltaX > 0) {
        this.sliderRef.current.slickPrev();
      }
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
                            <SliderItem img={mina} imgName="Mina Laban - President" fullName="Mina Laban" title="President" />
                            <SliderItem img={jon} imgName="Jon Polikowski - Partner / CCO" fullName="Jon Polikowski" title="Partner / CCO" />
                            <SliderItem img={ana} imgName="Ana Kovanovic - General Manager" fullName="Ana Kovanovic" title="General Manager" />
                            <SliderItem img={michael} imgName="Michael Karney - Director, Client Partnerships" fullName="Michael Karney" title="Director, Client Partnerships" />
                            {/* <SliderItem img={aleksandral} imgName="Aleksandra Lakic - HR Director" fullName="Aleksandra Lakic" title="HR Director" /> */}
                            <SliderItem img={milosn} imgName="Milos Nikolic - Tech Lead" fullName="Milos Nikolic" title="Tech Lead" />
                            <SliderItem img={leto} imgName="Leto Bukarica - Senior Tech Lead" fullName="Leto Bukarica" title="Senior Tech Lead" />
                            <SliderItem img={aleksandrak} imgName="Aleksandra Kotorac - Digital Producer" fullName="Aleksandra Kotorac" title="Digital Producer" />
                            <SliderItem img={lea} imgName="Lea Petric - Senior Product Manager" fullName="Lea Petric" title="Senior Product Manager" />
                            <SliderItem img={sasa} imgName="Sasa Rankovic - Digital Producer" fullName="Sasa Rankovic" title="Digital Producer" />
                            <SliderItem img={milost} imgName="Milos Tesic - Senior Manager, Technology Operations" fullName="Milos Tesic" title="Senior Manager, Technology Operations" />
                            <SliderItem img={jezda} imgName="Jezdimir Loncar - Tech Lead" fullName="Jezdimir Loncar" title="Tech Lead" />
                            <SliderItem img={vladimir} imgName="Vladimir Zecevic - Tech Lead" fullName="Vladimir Zecevic" title="Tech Lead" />
                            {/* <SliderItem img={branislav} imgName="Branislav Nisic - Senior Digital Producer" fullName="Branislav Nisic" title="Senior Digital Producer" /> */}
                            <SliderItem img={slobodan} imgName="Slobodan Jovicic - Tech Director" fullName="Slobodan Jovicic" title="Tech Director" />
                            <SliderItem img={srdjan} imgName="Srdjan Misic - Software Architect" fullName="Srdjan Misic" title="Software Architect" />
                            <SliderItem img={viktor} imgName="Viktor Ristic - Operations Manager" fullName="Viktor Ristic" title="Operations Manager" />
                            <SliderItem img={iva} imgName="Iva Filipovski - Recruiter" fullName="Iva Filipovski" title="Recruiter" />
                          </Slider>
                        </div>
                    </div>
                </div>
          </section>
      );
    }
  }