import React, { Component } from 'react';

import { Navigation } from '@components';

import logoImg from '@assets/images/deploy-logo.svg';

class Header extends Component {
  state = {
    sidebarOpened: false,
    isSticky: false,
    isStickyVisible: false,
    loaded: window.innerWidth > 767 ? false : true
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

    // Firing GA scroll events

    const h =  document.documentElement;
    const b =  document.body;
    const sTop =  'scrollTop';
    const sh =  'scrollHeight';
    const percent = parseInt ( (h[sTop]||b[sTop]) / ((h[sh]||b[sh]) - h.clientHeight) * 100);

    if(percent > 25) {
      if(!this.firstScroll) {
        gtag('event', 'moreThen25%', {
          event_category: 'Scrolling'
        });
        this.firstScroll = true;
      }
    }

    if(percent > 50) {
      if(!this.secondScroll) {
        gtag('event', 'moreThen50%', {
          event_category: 'Scrolling'
        });
        this.secondScroll = true;
      }
    }

    if(percent > 75) {
      if(!this.thirdScroll) {
        gtag('event', 'moreThen75%', {
          event_category: 'Scrolling'
        });
        this.thirdScroll = true;
      }
    }

    if(percent > 90) {
      if(!this.fourthScroll) {
        gtag('event', 'moreThen90%', {
          event_category: 'Scrolling'
        });
        this.fourthScroll = true;
      }
    }
  }

  toggleSidebar = () => {
    const { sidebarOpened } = this.state;
    if(sidebarOpened) {
      this.setState({sidebarOpened: false});
      document.body.style.overflow = 'initial';
    } else {
      this.setState({sidebarOpened: true});
      document.body.style.overflow = 'hidden';
    }
  }

  onNavItemClick = (type) => {
    const width = window.innerWidth;
    gtag('event', 'MenuItemClick', {
      event_category: 'click'
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
    const { sidebarOpened, isSticky, isStickyVisible, loaded } = this.state;

    return(
      <header className={'header ' + (loaded && 'enter ') + (sidebarOpened ? 'opened' : '') + (isSticky ? ' sticky' : '') + (isStickyVisible ? ' visible' : '') }>
        <div className="container">
          <div className="row">
            <div className="col-5">
              <div className="header__brand">
                <a href="/">
                  <img src={logoImg} alt="deploy" />
                </a>

                <button className="header__brand__sidebar-toggle" onClick={this.toggleSidebar}>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>

            <div className={"col-5"}>
              <Navigation onNavItemClick={this.onNavItemClick} />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;