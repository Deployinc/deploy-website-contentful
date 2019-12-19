import React from 'react';

export default ({video}) => (
  <div className="video-background">
    <video muted autoPlay loop playsInline>
      <source src={video} type="video/mp4" />
    </video>
  </div>
);
