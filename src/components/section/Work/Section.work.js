import React from 'react';

const SectionWork = ({title, content, color}) => (
    <section className="work section-padding">
        <div className="container">
            <div className="row">
            <div className="col-5">
                <h2 className="title-underlined small">
                {title}
                <span style={{backgroundColor: color}}></span>
                </h2>
            </div>
            <div className="col-5">
                <p className="section-title">{content}</p>
            </div>
            </div>
        </div>
    </section>
);

export default SectionWork;