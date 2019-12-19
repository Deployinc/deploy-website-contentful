import React, { Component, Fragment } from 'react';
import { ClientItem, Modal, ProjectDetails } from '../../index';

import virtue from '@assets/images/logos/virtue.png';
import continental from '@assets/images/logos/continental.png';
import taylormade from '@assets/images/logos/taylormade.png';
import hulu from '@assets/images/logos/hulu.png';
import rize from '@assets/images/logos/rize.png';
import vg from '@assets/images/logos/vg.png';
import red from '@assets/images/logos/red.png';
import misterrogers from '@assets/images/logos/mister_rogers.png';
import bet from '@assets/images/logos/bet.png';

import betProject from '@assets/images/cases/Android_BEt.jpg';
import virtueProject from '@assets/images/cases/iOS_virtue.jpg';
import continentalProject from '@assets/images/cases/mac_desktop_conti.jpg';
import virginProject from '@assets/images/cases/mac_desktop_virgin.jpg';
import huluProject from '@assets/images/cases/mac_laptop_hulu.jpg';
import redProject from '@assets/images/cases/mac_laptop_red.jpg';
import rogersProject from '@assets/images/cases/mac_desktop_rogers.jpg';
import taylormadeProject from '@assets/images/cases/Android_tmg.jpg';
import rizeProject from '@assets/images/cases/mac_laptop_rize.jpg';

const projects = [
  {
    id: 0,
    image: taylormadeProject,
    client: 'Client: Canvas United + TaylorMade',
    name: 'From web to native, driving success on the greens.',
    description: "Taylormade had seen success with its' web app for golfers on the course but it needed to go native - we took it there.",
    smallDescription: "Deploy engineers spent days on end testing this data-driven masterpiece on golf courses and in the lab to ensure accuracy and reliability for players. <br/> <br/>The native version of the Taylormade MyRoundPro application seamlessly blends complex game data with course overlays to deliver a killer app for any golfer.",
    technologies: ['iOS', 'Android', 'API Integration', 'Complex rendering', 'Maps integration']
  },
  {
    id: 1,
    image: rogersProject,
    client: 'Client: Mister Rogers’ Neighborhood',
    name: 'The 50 year Legacy Site.',
    description: "Deploy was proud to lead the build for this Webby Award winning content site celebrating 50 years of Mister Rogers' Neighborhood.",
    smallDescription: "Working with RED Interactive and Fred Rogers Company, our engineering team crafted a custom high performing Wordpress solution. <br/></br>The custom theme and underlying Brightcove media integration made key content and media easily re-usable across the site.",
    services: ['Full Build', 'Fixed Fee', 'Strategic Consulting'],
    technologies: ['Wordpress', 'AWS', 'Cloundfront', 'Custom JS Apps', 'Custom Theme']
  },
  {
    id: 2,
    image: huluProject,
    client: 'Client: Hulu',
    name: 'Making Wordpress work for the enterprise.',
    description: "Deploy supports Hulu across multiple engineering areas including internal platform development. <br/><br>The Hulu Press site is a news and marketing portal for the Hulu brand.",
    smallDescription: "The Hulu team needed a standalone publishing solution which would sit alongside the streaming platform technology.<br/> <br/>Deploy developed a custom Wordpress solution which integrated with the Hulu media library and marketing workflow.",
    services: ['Full Build', 'Fixed Fee', 'Strategic Consulting'],
    technologies: ['Wordpress', 'AWS', 'Cloundfront', 'API Integration', 'Custom Theme']
  },
  {
    id: 3,
    image: virginProject,
    client: 'Client: Virgin Galactic',
    name: 'De-coupled Wordpress for the stars.',
    description: "Teams from Deploy have worked with Virgin on several key projects related to their flagship web property.",
    smallDescription: "Deploy recently completed a back-end re-write of Virgin's website CMS. The CMS was converted from an existing custom Python application to a modern Wordpress implementation.<br/><br/>The de-coupled front-end is extremely fast and reliable while protecting the CMS server from public traffic.",
    services: ['Retained team', 'Platform enhancement & maintenance'],
    technologies: [ 'Wordpress', 'Python', 'Cloudfront', 'ReactJS', 'Gatsby']
  },
  {
    id: 4,
    image: rizeProject,
    client: 'Client: Rize',
    name: 'Saving - how ever you want.',
    description: "Deploy worked with Rize to bring their first generation product to life. <br/><br/>Rize is a micro-savings platform that allows you set your own goals and save at your own pace.",
    smallDescription: "The Rize application is a microservice architecture that manages automated savings and investment transactions through banking system integrations.",
    services: ['Long term', 'Retained team', 'Strategic consulting'],
    technologies: ['JAVA', 'Angular', 'Plaid', 'API Integration', 'Data Warehouse']
  },
  {
    id: 5,
    image: continentalProject,
    client: 'Client: Continental',
    name: 'A tire for every vehicle in the world.',
    description: "Continental tires and it's subsidiaries are behind a lot more than tires when it comes to automotive technology. <br/><br/>Our team got behind the curtain to understand this automotive giant's consumer tire business key to success.",
    smallDescription: "Deploy engineers built the Drupal 7 solution for Continental which replaced an outdated static site.<br/><br/>The new site integrated a proprietary tire database with Google maps for a polished tire and store locator experience to drive consumers from online to in-store.",
    technologies: ['Drupal', 'API Integration', 'Custom workflow', 'Ratings integration', 'Maps integration']
  },
  {
    id: 6,
    image: betProject,
    client: 'Client: BET',
    name: 'A UI framework for every kind of content.',
    description: "BET needed a partner to develop an integration-ready UI component system that could be easily integrated with AEM for a major redesign effort.",
    smallDescription: "The front-end UI component system delivered by Deploy included functional JS components, stub data and documentation.<br/><br/>UI component system development for modern browser applications is a core competency.",
    services: ['UI component system development']
  },
  {
    id: 7,
    image: virtueProject,
    client: 'Client: Virtue Labs',
    name: 'Direct to consumer sales success on Magento.',
    description: "Deploy worked closely with Virtue to launch their brand online and continue to manage their platform today.",
    smallDescription: "The Magento 2 solution is hosted on Magento cloud and features a custom theme from the ground-up with unique order, promo and pricing behavior.</br/><br/>The store features a subscription model and integrates customer support, shipment tracking and other advanced features.",
    technologies:  ['Magento2', '3PL Integration', 'Payment Integration', 'Custom promotions', 'Custom pricing', 'Custom order experience']
  },
  {
    id: 8,
    image: redProject,
    client: 'Client: RED',
    name: 'Nickelodeon TMNT Mutant Madness',
    description: "RED is one of Deploy's oldest clients. We've worked on everything from mutant match-ups to cryptocurrency with our partners @ RED.",
    smallDescription: "TMNT Mutant madness was a march madness themed tournament where fans could create a bracket and square off mutant to mutant.<br/><br/>Winning mutants allowed fans to get special downloads and fan material.",
    services: ['Ongoing exclusive partnership'],
    technologies: ['ReactJS', 'AWS Cloudfront', 'API Integration', 'LaravelPHP']
  },

];

class Clients extends Component {

  state = {
    modal0: false,
    modal1: false,
    modal2: false,
    modal3: false,
    modal4: false,
    modal5: false,
    modal6: false,
    modal7: false,
    modal8: false,
  }

  openModal = (modal) => {
    gtag('event', 'CaseStudyModal', {
      event_category: 'opened'
    });
    this.setState({[modal]: true});
  }

  onModalClose = (modal) => {
    this.setState({[modal]: false});
  }

  renderProjectModal = (project) => (
    <Modal key={project.id} active={this.state[`modal${project.id}`]} onModalClose={this.onModalClose}>
      <ProjectDetails project={project} onModalClose={this.onModalClose} />
    </Modal>
  )

  render() {
    const { forwardRef } = this.props;

    return(
      <Fragment>
        <section className="clients" ref={forwardRef}>
          <div className="container">
            <div className="row">
              <div className="col-1"></div>
              <div className="col-8">
                <div className="clients__logos">
                  <ClientItem logo={virtue} width="227" projectImg={virtueProject} name="Virtue" onClick={() => this.openModal('modal7')} />
                  <ClientItem logo={hulu} projectImg={huluProject} name="Hulu" onClick={() => this.openModal('modal2')} />
                  <ClientItem logo={misterrogers} width="250" projectImg={rogersProject} name="Mister Rogers" onClick={() => this.openModal('modal1')} />
                  <ClientItem logo={bet} width="160" projectImg={betProject} name="BET" onClick={() => this.openModal('modal6')}/>
                  <ClientItem logo={red} width="200" projectImg={redProject} name="Red" onClick={() => this.openModal('modal8')} />
                  <ClientItem logo={continental} projectImg={continentalProject} name="Continental" onClick={() => this.openModal('modal5')}/>
                  <ClientItem logo={vg} width="140" projectImg={virginProject} name="Virgin Galactic" onClick={() => this.openModal('modal3')} />
                  <ClientItem logo={taylormade} projectImg={taylormadeProject} name="Taylormade" onClick={() => this.openModal('modal0')} />
                  <ClientItem logo={rize} width="200" projectImg={rizeProject} name="Rize" onClick={() => this.openModal('modal4')} />
                </div> 
              </div>
            </div>
          </div>
        </section>

        {
          projects.length > 0 && projects.map(project => this.renderProjectModal(project))
        }
      </Fragment>
    );
  }
}

export default Clients;
