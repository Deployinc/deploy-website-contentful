import React, { Component } from 'react';
import { Link } from 'gatsby';
import { Navigation } from '@components';
import window from '@constants/window';
import logoImg from '@assets/images/deploy-logo.svg';
import { trackCustomEvent } from '@lib/helpers';

const navData = [
  {
    title: 'Services',
    url: '/#services',
    ref: 'servicesRef'
  },
  {
    title: 'Cases',
    url: '/#cases',
    ref: 'casesRef'
  },
  {
    title: 'Careers',
    url: '/#careers',
    ref: 'careersRef'
  },
  {
    title: 'Blog',
    url: '/blog',
  },
  {
    title: 'Contact',
    url: '/#footer',
    ref: 'footerRef'
  }
];

class Header extends Component {
  state = {
    sidebarOpened: false,
    isSticky: false,
    isStickyVisible: false,
    isHomepage: true,
    loaded: window.innerWidth < 767 ? true : (this.props.noAnimation ? true : false)
  }

  hasScroll = false;
  lastScrollTop = 0;
  delta = 5;
  firstScroll = false;
  secondScroll = false
  thirdScroll = false;
  fourthScroll = false;

  componentDidMount() {
    window.addEventListener('scroll', this.toggleScroll);
    this.intervalId = setInterval(this.ifScrolled, 250);
    setTimeout(() => {
      this.setState({ loaded: true });
    }, 1500);

    if(window.location.pathname !== '/' && window.location.pathname !== '') {
      this.setState({ isHomepage: false });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.toggleScroll);
    clearInterval(this.intervalId);
  }

  toggleScroll = () => {
    this.hasScroll = true;
  }

  ifScrolled = () => {
    if (this.hasScroll && !this.state.sidebarOpened) {
      this.handleScroll();
      this.hasScroll = false;
    }
  }

  handleScroll = () => {
    const { isSticky, sidebarOpened } = this.state;
    const st = window.pageYOffset;

    if(!this.props.isStatic) {
      if (Math.abs(this.lastScrollTop - st) <= this.delta) return;

      if (st > 400) {
        if(!isSticky) {
          this.setState({isSticky: true});
        }
      } else {
        if(isSticky) {
          this.setState({isSticky: false});
        }
      }

      if (st < this.lastScrollTop && !sidebarOpened){
        // Scroll Down
        this.setState({isStickyVisible: true});
      } else {
        // Scroll Up
        this.setState({isStickyVisible: false});
      }

      this.lastScrollTop = st;
    }

    // Firing GA scroll events

    const h =  document.documentElement;
    const b =  document.body;
    const sTop =  'scrollTop';
    const sh =  'scrollHeight';
    const percent = parseInt ( (h[sTop]||b[sTop]) / ((h[sh]||b[sh]) - h.clientHeight) * 100);

    if(percent > 25) {
      if(!this.firstScroll) {
        trackCustomEvent({
          category: 'Scrolling',
          action: 'moreThen25%'
        });
        this.firstScroll = true;
      }
    }

    if(percent > 50) {
      if(!this.secondScroll) {
        trackCustomEvent({
          category: 'Scrolling',
          action: 'moreThen50%'
        });
        this.secondScroll = true;
      }
    }

    if(percent > 75) {
      if(!this.thirdScroll) {
        trackCustomEvent({
          category: 'Scrolling',
          action: 'moreThen75%'
        });
        this.thirdScroll = true;
      }
    }

    if(percent > 90) {
      if(!this.fourthScroll) {
        trackCustomEvent({
          category: 'Scrolling',
          action: 'moreThen90%'
        });
        this.fourthScroll = true;
      }
    }
  }

  toggleSidebar = () => {
    const width = window.innerWidth;
    
    if(width > 767) return;

    const { sidebarOpened } = this.state;

    if(sidebarOpened) {
      this.setState({sidebarOpened: false});
      document.body.style.overflow = 'initial';
    } else if(sidebarOpened === false) {
      this.setState({sidebarOpened: true});
      document.body.style.overflow = 'hidden';
    }
  }

  onNavItemClick = (type) => {
    const width = window.innerWidth;
    trackCustomEvent({
      category: 'click',
      action: 'MenuItemClick'
    });

    if(width < 768) {
      setTimeout(() => {
        this.scrollToSection(type);
      }, 420);
      this.toggleSidebar();
      return;
    }

    this.scrollToSection(type);
  }

  scrollToSection = (type) => {
    this.props.onScrollTo(type);
  }

  render() {
    const { sidebarOpened, isSticky, isStickyVisible, loaded, isHomepage } = this.state;
    const { data, isStatic, narrow } = this.props;
    return(
      <header className={`header ${isStatic ? 'header--static' : ''} ${loaded ? 'enter' : ''} ${sidebarOpened ? 'opened' : ''} ${isSticky ? 'sticky' : ''} ${isStickyVisible ? 'visible' : ''} ${narrow ? 'header--narrow' : ''}` }>
        <div className="container">
          <div className={`${narrow ? 'row' : ''}`}>
            { narrow && <div className="col-1" /> }
            <div className={`${narrow ? 'col-8' : 'row'}`}>
              <div className="col-4">
                <div className="header__brand">
                  <Link to="/">
                    <img src={ data.logo ? data.logo.file.url : logoImg } alt="Deploy Inc." />
                  </Link>

                  <button className="header__brand__sidebar-toggle" onClick={this.toggleSidebar}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </div>

              <div className="col-6">
                <Navigation 
                  navData={ navData } 
                  onNavItemClick={this.onNavItemClick} 
                  isHomepage={ isHomepage } 
                  toggleSidebar={ this.toggleSidebar }
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
