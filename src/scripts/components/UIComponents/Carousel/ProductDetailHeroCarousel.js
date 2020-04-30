import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Swiper from 'react-id-swiper';
export default class ProductDetailHeroCarousel extends Component {

  componentDidUpdate() {
    this.swiperInit();
  }
  
  render() {
    const pageFields = this.props.pageFields;
    const slides = pageFields.sliderImages;

    const Hero = styled.section `
      background-color: #000819;
      height: 100%;
      padding-top: 10px;

      a .fa-arrow-alt-left {
        color: #495965;
      }

      a .fa-arrow-alt-left:hover {
        color: #0b8cdb;
      }

      .hero-container {
        padding-bottom: 15px;

        @media (max-width: 1000px) {
          padding: 0;
        }

        @media (max-width: 550px) {
          padding: 0;
        } 
      }
      
      .hero-header {
        .back-btn {
          width: 246px;
          height: 22px;
          font-weight: bold;
          font-size: 15px;
          letter-spacing: 1.2px;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 57px;
          text-align: center;
          text-decoration: none;

          i {
            padding-right: 5px;
          }
        }

        .hero-titles {
          font-size: 48px;
          font-weight: bold;
          line-height: 1.5;
          letter-spacing: 2px;
          text-align: center;
          color: #ffffff;
          padding-bottom: 36px;

          @media (max-width: 1000px) {
            padding-top: 35px;
            font-size: 20px;
          }

          @media (max-width: 550px) {
            font-size: 24px;
          }
        }
        hr {
          width: 60px;
          height: 4px;
          background-color: #fff200;
        }
      }
    `
 
    const params = {
      slidesPerView: 3,
      spaceBetween: 115,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      renderPrevButton: () => <button className="swiper-button-prev list-inline-item pr-5" role="button" aria-label="Previous slide"><i className="far fa-long-arrow-alt-left"></i></button>,
      renderNextButton: () => <button className="swiper-button-next list-inline-item pr-5" role="button" aria-label="Next slide"><i className="far fa-long-arrow-alt-right"></i></button>,
    }
    const Carousel = styled.div `
    .swiper-container {
      width: 100%;
      min-height: 660px;

    .swiper-slide, .swiper-slide-duplicate, .swiper-slide-prev {
      width: auto;
      height: auto;
      min-width: 262px;
      min-height: 262px;
      margin-top: 132px !important;
      .content {
        min-width: 284px;
        min-height: 293px;
        
        img {
          width:auto;
          height:auto;
          max-width: 271px;
          max-height: 262px;
        }

        p {
          opacity: 0;
        }
      }
    }
    .swiper-slide-active {
      width: auto;
      height: auto;
      min-width: 262px;
      min-height: 262px;
      margin-right: 0px !important;
      .content {

        img {
          width:auto;
          height:auto;
          max-width: 271px;
          max-height: 262px;
        }
        p {
          opacity: 0;
        }
      }
    }
    .swiper-slide-next {
      margin-right: 0px !important;
      margin-top: 0px !important;
      min-width: 554px;
      min-height: 482px;
      .content {
        min-width: 420px;
        min-height: 420px;
        padding-left: 15px;

        img {
          min-height: 484px;
          max-width: 100%;
          object-fit: contain;
        }

        p {
          width: 555px;
          font-size: 16px;
          line-height: 2;
          text-align: center;
          color: #ffffff;
          opacity: 1;
          padding-top: 10px;
        }
      }
    }
    .swiper-pagination {
        bottom: 65px;
        left: 0;
        width: 100%;
      .swiper-pagination-bullet {
        width: 18px;
        height: 18px;
        display: inline-block;
        border-radius: 100%;
        border: solid 2px rgba(135, 138, 143, 0.5);
        opacity: 1;
      }
      .swiper-pagination-bullet-active {
        opacity: 1;
        background: #fff200;
      }
    }    
    .swiper-button-prev, .swiper-button-next {
      i.far {
        color: #fff;
        padding: 14px;
      }
    }
    .swiper-button-next {
      border-radius: 50%;
      background-image: none; 
      background: #000819;
      border: solid #fff200;
      top: 80%;
      width: 50px;
      height: 50px;
      outline: none; 
      margin-right: 33%;
    }
    .swiper-button-prev {      
      border-radius: 50%;
      background-image: none;  
      background: #000819;
      border: solid #fff200;
      top: 80%;
      width: 50px;
      height: 50px;
      outline: none;
      margin-left: 33%;

      @media (max-width: 768px) {
        left: 68%;
      }
    }
    
  }

    `

    return (
      <Hero>
        <div className="hero-container container">
          <div className="hero-header row">
            <Link to='/products' className="back-btn col-lg-12 col-md-12 col-sm-12">
              <i className="fas fa-arrow-alt-left"></i>
              BACK TO PRODUCTS
            </Link>
            <div className="hero-titles col-lg-12 col-md-12 col-sm-12">
              <p dangerouslySetInnerHTML={{ __html: pageFields.pageTitle.toUpperCase()}} /> 
              <hr/>
            </div>
          </div>
        <Carousel>
            <Swiper {...params}>
            <div>
              <div className="content">
                <img src={slides.slideOne} className="" alt="SlideOne"/>
              </div>
            </div>
            <div>
              <div className="content">
                <img src={slides.slideTwo} className="" alt="SlideTwo"/>
              </div>
            </div>
            <div>
              <div className="content">
                <img src={slides.slideThree} className="" alt="SlideThree"/>
              </div>
            </div>
          </Swiper>
        </Carousel>
        </div>
      </Hero>
    )
  }
}