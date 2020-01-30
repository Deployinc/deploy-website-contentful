import React, { useEffect, useState } from 'react';
import { Video } from '@components';
import window from '@constants/window';
import badgeImg from '@assets/images/badge.svg';
import badgeInnerImg from '@assets/images/badge-inner.svg';

const SectionHero = ({ data, className }) => {
  const [isLoaded, setIsLoaded] = useState(window.innerWidth > 767 ? false : true);
  useEffect(() => {
    onMount();
  }, []);

  const onMount = () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2500);
  };

  return (
    <section className={ `hero ${isLoaded ? 'enter' : ''} ${className}` }>
      <div className="container">
        <div className="row">
          <div className="col-7">
            <h1 className="hero__title">{data.homepageText}</h1>
          </div>
        </div>

        <div className="hero__badge">
          <img src={badgeImg} alt="Deploy" className="hero__badge__outer" />
          <img src={badgeInnerImg} className="hero__badge__inner" alt="Deploy" />
        </div>
      </div>

      <Video video={data.backgroundVideo} />
    </section>
  )
};

export default SectionHero;

