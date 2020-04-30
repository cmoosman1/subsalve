import React, { Component } from 'react';
import styled from 'styled-components';
// import {Link} from 'react-router-dom';
import Swiper from 'swiper/dist/js/swiper.js';

export default class NewsCarouselMobile extends Component {
  componentDidMount() {
    const swiper = new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
    });
  }

  render() {
    const pageFields = this.props.pageFields;
    const Card = styled.div` 
      .news-card-above-title { 
        height: 16px;
        font-size: 13px;
        font-weight: bold;
        letter-spacing: 1.08px;
        color: #a09f9c;
        padding-left: 50px;
        padding-top: 35px;

        @media (min-width: 500px) and (max-width: 1000px) {
          font-size: 12px;
          letter-spacing: 1px;
          padding-left: 30px;
          padding-top: 15px;
        }
      }

      .news-card-title {
        height: 95px;
        font-size: 16px;
        font-weight: bold;
        line-height: 1.4;
        letter-spacing: normal;
        color: #252627;
        padding-left: 50px;
        padding-right: 40px;
        margin-bottom: 15px;
        margin-top: 10px;
        overflow: hidden;
        text-overflow: ellipsis;

        @media (min-width: 500px) and (max-width: 1000px) {
          font-size: 18px;
          line-height: 1.33;
          padding-left: 30px;
          width: 265px;
        }

      }

      .news-card-button {
        width: 191px;
        height: 43px;
        border-radius: 50px;
        border: solid 2px #fff200;
        background-color: rgba(37, 38, 39, 0);
        margin-left: 50px; 

        i.far {
          font-size: 0.8rem;
          margin-left: 0.3rem;
        }
        
        a {
          width: 109px;
          height: 17px;
          font-size: 11px;
          font-weight: bold; 
          letter-spacing: 1.08px;
          text-align: center;
          color: #404040;
        }
        
        @media (min-width: 500px) and (max-width: 1000px) {
          margin-left: 30px;
        }
      }
      
    `;

    const NewsSection = styled.section`
      background-color: #000819;
      height: 548px;
      

      .news-controls {
        color: #ffffff;
        user-select: none;

        .news-title {
          width: 173px;
          height: 72px;
          font-size: 48px;
          line-height: 1.5;
          color: #ffffff;

          @media(max-width: 1000px) {
            margin-left: 16px;
          }
        }

      }
      hr {
        width: 60px;
        border: 1px solid #878a8f;
      }

      .control-area {
        display: flex;
        margin-top: 80px;
      }

      .news-categories, .carousel-controls {
        padding-top: 33px;
      }
      
      .controls {
        margin-left: 400px;
      }

      .list-inline-item {
        margin-top: 25px;

        @media(max-width: 1000px) {
          margin-top: 0px;
        } 
      }

      .circle-red {
        width: 18px;
        height: 18px;
        background: #fff200;
        border-radius: 50%;
        margin-right: 10px;
      }

      .circle-gray {
        width: 18px;
        height: 18px;
        background: #878a8f;
        border-radius: 50%;
        margin-right: 10px;
      }

      #circles {
        padding-top: 6px;
        padding-left: 20px;
      }

      #arrows {
        margin-top: 15px;
      }
      .swiper-container {
        overflow: visible;
      }

      .swiper-slide-active {
        width: 290px !important;   
        opacity: 1 !important;
        height: 300px;
        background-color: #ffffff;
        color: #252627;
        box-shadow: 0 2px 20px 0 rgba(37, 38, 39, 0.2);
        margin-left: 15px !important;
        margin-top: -1px;
        margin-bottom: -1px;
        // change border left to either article or press release color from wordpress data
        border-left: 10px solid #fff200 !important;
      }
      .swiper-slide-next {
        width: 290px !important;   
        opacity: 0.35 !important;
        height: 300px;
        background-color: #ffffff;
        color: #252627;
        box-shadow: 0 2px 20px 0 rgba(37, 38, 39, 0.2);
        margin-left: -1px;
        margin-top: -1px;
        margin-bottom: -1px;
        // change border left to either article or press release color from wordpress data
        border-left: 10px solid #878a8f;
      }
      .swiper-slide {
        cursor: pointer;
        /* width: 290px !important;      */
        opacity: 0.5;
        height: 300px;
        background-color: #ffffff;
        color: #252627;
        box-shadow: 0 2px 20px 0 rgba(37, 38, 39, 0.2);
        margin-left: -1px;
        margin-top: -1px;
        margin-bottom: -1px;
        // change border left to either article or press release color from wordpress data
        border-left: 10px solid #878a8f;
        top: 0;
        transition: top ease 0.3s;
        
        :hover {
          box-shadow: 0 .5rem 1rem rgba(0,0,0,.15) !important;
          top: -10px;

          .news-card-button {
            border: solid 2px #ffffff;
            background-color: #fff200;

            i.far {
              font-size: 0.8rem;
              margin-left: 0.3rem;
              color: #ffffff;
            }
    
            a {
              color: #ffffff;
            }
          }
        }	
      }

      .swiper-slide-prev {
        opacity: 0;
      }

      .swiper-button-prev, .swiper-button-next {
        i.far {
          color: #fff;
        }
      }
      .swiper-button-next {
        border-radius: 25px;
        background-image: none; 
        background: #000819;
        border: solid #fff200;
        top: -22%;
        width: 50px;
        height: 50px;
        outline: none; 
      }
      .swiper-button-prev {      
        border-radius: 25px;
        background-image: none;  
        background: #000819;
        border: solid #fff200;
        top: -22%;
        left: 84%;
        width: 50px;
        height: 50px;
        outline: none;
      }
      #button-mobile-next {
        border-radius: 25px;
        background-image: none; 
        background: #000819;
        border: solid #fff200;
        right: 8%;
        left: auto;
        top: 57%;
        width: 50px;
        height: 50px;
        outline: none; 
      }
      #button-mobile-prev {      
        border-radius: 25px;
        background-image: none;  
        background: #000819;
        border: solid #fff200;
        left: 57%;
        top: 57%;
        width: 50px;
        height: 50px;
        outline: none;
      }
      .swiper-button-prev.swiper-button-disabled, .swiper-button-next.swiper-button-disabled {
        opacity: .35;
        cursor: auto;
        pointer-events: none;
        border: solid #878a8f;
    }
    `;
      return (
        <NewsSection>
          <div className="container">
            <div className="news-controls row">
              <ul className="list-inline col-lg-12 col-md-12">
                <div className="control-area">
                  <li className="list-inline-item-title"><h3 className="news-title">News</h3>
                    <div className="list-inline-item-group d-flex">
                      <div className="list-inline-item d-flex" id="circles">
                        <div className="circle-red"></div>
                        <p className="">Articles</p></div>
                      <div className="list-inline-item d-flex" id="circles">
                        <div className="circle-gray"></div>
                        <p className="">Press Releases</p></div>
                    </div>
                    <button className="swiper-button-next" id="button-mobile-next" role="button" aria-label="Next slide"><i className="far fa-long-arrow-alt-right"></i></button>
                    <button className="swiper-button-prev" id="button-mobile-prev" role="button" aria-label="Previous slide"><i className="far fa-long-arrow-alt-left"></i></button>
                  </li>
                </div>
              </ul>
            </div>
            <div className="swiper-container swiper-container-horizontal">
              <div className="swiper-wrapper">
                {pageFields.map((step, i) => {
                  return (
                    <Card key={i} className="swiper-slide" data-hash={i}>
                      <div className="news-card-above-title d-inline-block">{step.title.toUpperCase()}</div>
                      <div className="news-card-title d-inline-block">{step.subtitle}</div>
                      <div className="btn news-card-button"><a href={step.button_url} >{step.button_title}</a>
                        {
                          step.button_title === "GO TO ARTICLE"
                            ?
                            <i className="far fa-external-link-square-alt"></i>
                            :
                            (
                              null
                            )
                        }
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </NewsSection>
      )
  }
}