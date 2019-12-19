import React from 'react';

const SectionServices = ({forwardRef}) => (
    <section className = "services section-padding" ref={forwardRef}>
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <h2 className = "services__title">Fullstack Engineering</h2>
                    <p className= "services__description">We’ll assemble an experienced platform team, specifically tailored to your project needs, to help you launch your product, site or campaign.</p>
                    <div className = "services__item">
                        <h3 className = "services__item__title">Platform Teams</h3>
                        <div className = "services__subitem">
                            <ul className = "services__subitem__list">
                                <li className = "services__subitem__list__item">Agency or Product Support</li>
                                <li className = "services__subitem__list__item">Platform Engineering</li>
                                <li className = "services__subitem__list__item">Product Management</li>
                            </ul>
                        </div>
                        <div className = "services__subitem">
                            <h4 className = "services__subitem__title">Average engagement</h4>
                            <ul className = "services__subitem__list">
                                <li className = "services__subitem__list__item">3 mo / 6 mo / Annual</li>
                            </ul>
                        </div>
                    </div> 
                    <div className = "services__item">
                        <h3 className = "services__item__title">Fixed Scope Projects</h3>
                        <div className = "services__subitem">
                            <ul className = "services__subitem__list">
                                <li className = "services__subitem__list__item">Technical Design & Discovery</li>
                                <li className = "services__subitem__list__item">Rapid MVP, Prototype Development</li>
                                <li className = "services__subitem__list__item">Short Term B2C Projects</li>
                            </ul>
                        </div>
                        <div className = "services__subitem">
                            <h4 className = "services__subitem__title">Average engagement</h4>
                            <ul className = "services__subitem__list">
                                <li className = "services__subitem__list__item">Average 8-18 weeks</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-2"></div>
                <div className="col-4">
                <h2 className = "services__title">Technology Consulting</h2>
                    <p className= "services__description">Our technology experts will partner with your client teams to identify roadblocks, key business opportunities and recommend technical frameworks.</p>
                    <div className = "services__item">
                        <h3 className = "services__item__title">Digital Platform Management</h3>
                        <div className = "services__subitem">
                            <ul className = "services__subitem__list">
                                <li className = "services__subitem__list__item">Discovery & Strategy for Platform</li>
                                <li className = "services__subitem__list__item">Engagements</li>
                            </ul>
                        </div>
                        <div className = "services__subitem">
                            <h4 className = "services__subitem__title">Average engagement</h4>
                            <ul className = "services__subitem__list">
                                <li className = "services__subitem__list__item">1–2 weeks</li>
                            </ul>
                        </div>
                    </div> 
                    <div className = "services__item">
                        <h3 className = "services__item__title">Startup Platform Definition</h3>
                        <div className = "services__subitem">
                            <ul className = "services__subitem__list">
                                <li className = "services__subitem__list__item">Strategy & Solution Architecture</li>
                                <li className = "services__subitem__list__item">Detailed Technical Design</li>
                                <li className = "services__subitem__list__item">Whitepaper Development</li>
                            </ul>
                        </div>
                        <div className = "services__subitem">
                            <h4 className = "services__subitem__title">Average engagement</h4>
                            <ul className = "services__subitem__list">
                                <li className = "services__subitem__list__item">1–2 months per Track</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default SectionServices;
