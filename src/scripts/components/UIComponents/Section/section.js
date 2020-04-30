import React, {Component} from 'react';
import styled from 'styled-components';

class Section extends Component {
  render(){
    const fields = this.props.fields;
    const content = this.props.sectionContent;
    // component styles
    const Banner = styled.section`
      background-color: #000819;
      background-image: url(${fields.heroImage});
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      min-height: 1250px : ${fields.minHeight};
      max-width:100%;
      object-fit: cover;
      }
      p {
        font: 18px/2 'Open Sans', sans-serif;
      }
      .white {
          color: #fff;
      }
      @media screen and (max-width: 48.4375rem) {
        .container {
          padding: 80px 0;
        }
      }
      @media screen and (max-width: 767px) {
        background-image: url(${fields.heroMobileImage});
        background-size: contain;
        background-position: 50% -140px;
        padding-left: 15px;
        padding-right: 15px;

        .hero-title {
          font-family: Montserrat;
          font-size: 24px;
          font-weight: bold;
          font-style: normal;
          font-stretch: normal;
          line-height: 1.25;
          letter-spacing: normal;
          text-align: center;
          color: #001641;
        }

        .mobile-spacer {
          padding-top: 0!important;
          margin-top: 0!important;
        }

        .hero-description {
          padding-bottom: 3rem!important;
        }
      }

      @media screen and (max-width : 768px) { 
          background-image: url(${fields.heroImage});
          background-size: cover;
          background-position: 50% -350px;
          padding-left: 15px;
          padding-right: 15px;

          .hero-title {
            padding-top: 0 !important;
            margin-top: 0 !important;
          }

          .ipad-spacer {
            display: none;
          }

          .ipad-last-column {
            margin-left: 10rem;
          }
      }
    `;

    return (
      <Banner className="pb-5 ipad-home-section">
        <div>
            <div className="container">
                <div className="row">
                    <div className="col text-center mobile-spacer  mt-5 pt-3">
                      <h2 className="hero-title pt-5 mt-5 mobile-spacer">
                         {content.hero_header}
                      </h2>
                      <p className="hero-sub-title">
                        {content.hero_sub_title}
                      </p>
                    </div>
                </div>
                <div className="row mt-5 pt-5 hero-subheader-wrapper">
                    <div className="col-md-4 mt-5 pt-5 pl-5 hero-subheader-left-content-wrapper">
                        <hr className="hero-subheader-line mb-3" />
                        <h1 className="hero-subheader">{content.left_content_header}</h1>
                        <p className="lead hero-description pb-3">{content.left_content_copy}</p>
                    </div>
                    <div className="col-md-4 ipad-spacer"></div>
                    <div className="col-md-4 mt-5 pt-5 pl-5 ipad-last-column">
                        <hr className="hero-subheader-line mb-3" />
                        <h1 className="hero-subheader">{content.right_content_header}</h1>
                        <p className="lead hero-description pb-3">
                          {content.right_content_copy}<br/><br/>
                          <a href={`/${content.right_button_url.post_name}`} className="yellow-button  mt-5">{content.right_button_text}</a>
                        </p>
                    </div>
                </div>
          </div>
        </div>
      </Banner>
    );
  }
}

export default Section;