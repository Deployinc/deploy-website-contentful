import React, { Component } from 'react';
import { reqAnimationFrame, Scroll } from '@lib/helpers';

class AnimationScroll extends Component {

  componentDidMount () {
    const { setBreakpoint } = this.props;

    Scroll.register(this.props.section, this.onScroll);

    let interval = null;
    window.addEventListener('resize', () => {
      if (!interval) {
        interval = setTimeout(() => {
          interval = null;
          return setBreakpoint && this.element.current && this.setBreakpoint();
        }, 1000);
      }
    });

    return setBreakpoint && this.element.current &&
    setTimeout(() =>
      this.element.current &&
      this.setBreakpoint(), 100);
  }

  componentWillUnmount () {
    Scroll.unregister(this.props.section);
  }

  innerWidth = Math.min(window.innerWidth, window.screen.width)
  scrolledTo = false;
  top = 0;
  ticking = false;
  element = React.createRef();

  setBreakpoint () {
    const { setBreakpoint, section } = this.props;

    return setBreakpoint({
      [section]: {
        offset: this.element.current.getBoundingClientRect().top,
        el: this.element.current
      }
    });
  }

  onScroll = () => {
    const { top } = this.element.current.getBoundingClientRect();

    this.top = top;
    return this.requestTick();
  }

  requestTick = () =>
    !this.ticking && (
      this.ticking = true,
      reqAnimationFrame(this.update.bind(this))
    )

  update = () => {
    const { section } = this.props;
    const height = window.innerHeight;
    const enter = this.top < (height - 150);


    this.scrolledTo = enter;
    this.element.current.classList[enter ? 'add' : 'remove']('enter');

    this.ticking = false;
  }

  render () {
    return (
      <div
        ref={ this.element }
        className={ `animation__fade ${this.props.className}` }>
        { this.props.children }
      </div>
    );
  }
}

export default AnimationScroll;