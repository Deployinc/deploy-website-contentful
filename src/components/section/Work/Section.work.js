import React from 'react';
import COLORS from '@constants/colors';

const SectionWork = ({data}) => (
    <section className="work section-padding">
        <div className="container">
            <div className="row">
            <div className="col-5">
                <h2 className="title-underlined small">
                {data.title}
                <span style={{backgroundColor: COLORS[data.underlineColor]}}></span>
                </h2>
            </div>
            <div className="col-5">
                <p className="section-title">{data.text}</p>
            </div>
            </div>
        </div>
    </section>
);

export default SectionWork;