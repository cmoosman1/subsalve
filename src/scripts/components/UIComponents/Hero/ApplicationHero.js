import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

class ApplicationHero extends Component {
    render() {
    const pageFields = this.props.fields;
    const challengeSolutionOutcomeFields = this.props.challengeSolutionOutcomeFields;
        const Hero = styled.section`
        background-image: linear-gradient(to bottom, rgba(0, 8, 25, 0.5), rgba(0, 8, 25, 1.1)), url(${pageFields.heroImage});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        min-height: ${pageFields.heroMinHeight};
        object-fit: cover;
        z-index: -1;
        }
        p {
          font: 18px/2 'Open Sans', sans-serif;
        }
        .white {
            color: #fff;
        }
        @media screen and (max-width: 48.4375rem) {
          
        }
        @media screen and (max-width: 768px) {
         
        }
      `;
        
		return (
			<Hero>
				<div className="jumbotron jumbotron-fluid mb-0 hero-wrapper">
					<div className="container">
                        {pageFields.heroPageType &&
                            <Link to='/case-studies' className="btn-back-case-studies col-lg-12 col-md-12 col-sm-12">
                            <i className="fas fa-arrow-alt-left pr-3"></i>
                            BACK TO CASE STUDIES
                            </Link>
                        }
						<h1 className="hero-header-text">{pageFields.heroTitle}</h1>
                        <hr className="hero-title-underline"></hr>
                        <div className="row hero-center-text mt-5">
                            <span className="hero-sub-title-text" dangerouslySetInnerHTML={{ __html: pageFields.heroSubTitle}} />
                        </div>
                    </div>
				</div>
                {pageFields.heroPageType &&
                    <section className="case-breakdown-card-section">
                        <div className="CaseStudyBreakDown container">
                            <div className="row justify-content-center row-eq-height">
                                <div className="col case-breakdown-card">
                                    <div className="case-breakdown-body" style={{backgroundColor: '#66738d', border: 'solid 2px rgba(255, 255, 255, 0.1)'}}>
                                        <div className="case-breakdown-title">{challengeSolutionOutcomeFields.challenge_header}</div>
                                        <hr/>
                                        <div className="case-breakdown-description" dangerouslySetInnerHTML={{ __html: challengeSolutionOutcomeFields.challenge_copy}}/>
                                    </div>
                                </div>
                                <div className="col case-breakdown-card">
                                    <div className="case-breakdown-body" style={{backgroundColor: '#334467', border: 'solid 2px rgba(255, 255, 255, 0.1)'}}>
                                        <div className="case-breakdown-title">{challengeSolutionOutcomeFields.solution_header}</div>
                                        <hr/>
                                        <div className="case-breakdown-description" dangerouslySetInnerHTML={{ __html: challengeSolutionOutcomeFields.solution_copy}}/>
                                    </div>
                                </div>
                                <div className="col case-breakdown-card">
                                    <div className="case-breakdown-body" style={{backgroundColor: '#001641', border: 'solid 2px rgba(255, 255, 255, 0.1)'}}>
                                        <div className="case-breakdown-title">{challengeSolutionOutcomeFields.outcome_header}</div>
                                        <hr/>
                                        <div className="case-breakdown-description" dangerouslySetInnerHTML={{ __html: challengeSolutionOutcomeFields.outcome_copy}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                }
			</Hero>
        );
    }
}

export default ApplicationHero;