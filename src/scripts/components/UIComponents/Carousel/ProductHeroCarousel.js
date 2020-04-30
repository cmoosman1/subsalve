import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Swiper from 'react-id-swiper';

export default class ProductHeroCarousel extends Component {
  state = {
    width: window.innerWidth
  }

  componentWillMount() {
    this.handleWindowSizeChange();
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({
      width: window.innerWidth
    })
  }

  render() {
    const isMobile = this.state.width <= 1200
    const Hero = styled.section `
      background-color: #000819;
      height: 100%;

      .hero-container {

        @media (max-width: 1000px) {
          padding: 0;
        }

        @media (max-width: 550px) {
          padding: 0;
        } 
      }
      
      .hero-header {
        .back-btn {
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
    const ProductDescription = styled.div `
     background-color: #495965;
     min-height: 343px;

     .title {
       padding-top: 51px;
       font-size: 16px;
       font-weight: bold;
       letter-spacing: 1.33px;
       color: rgba(255, 255, 255, 0.5);
      }
      
      .description {
        height: 216px;
        padding-top: 17px;
        padding-right: 45px;
        font-size: 17px;
        line-height: 1.8;
        letter-spacing: normal;
        color: #ffffff;
     }
    `

    const Guarantee = styled.div `
     min-height: 80px;
     background-color: #000819;

     .guarantee-section {
       display: flex;
       .title {
         padding-top: 18px;
         padding-bottom: 12px;
         font-size: 20px;
         line-height: 1.6;
         text-align: center;
         color: #ffffff;
  
         img {
           width: 47px;
           height: 47px;
           object-fit: contain;
           margin-right: 16px;
         }
       }
     }
    `
    const DesktopParams = {
      slidesPerView: 3,
      spaceBetween: 115,
      slidesPerGroup: 1,
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
      renderPrevButton: () => <i className="far fa-long-arrow-alt-left swiper-button-prev" aria-hidden="true"></i>,
      renderNextButton: () => <i className="far fa-long-arrow-alt-right swiper-button-next" aria-hidden="true"></i>
    }

    const MobileParams = {
      slidesPerView: 1,
      spaceBetween: 100,
      slidesPerGroup: 1,
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
      renderPrevButton: () => <i className="far fa-long-arrow-alt-left swiper-button-prev" aria-hidden="true"></i>,
      renderNextButton: () => <i className="far fa-long-arrow-alt-right swiper-button-next" aria-hidden="true"></i>
    }
    const DesktopCarousel = styled.div `
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
        padding-left: 5px;
        padding-right: 30px;
        
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
    
     .swiper-button-next {
       background: #000819;
       right: 37% !important;
       top: 87% !important;
       width: 50px;
       height: 50px;
    }
    .swiper-button-prev {
      background: #000819;
      left: 37% !important;
      top: 87% !important;
      width: 50px;
      height: 50px;    
    }

    i.far {
      font-size: 21px;
      color: #ffffff;
      border: 2px solid #fff200;
      border-radius: 50%;
      padding: 13px;
    }
  }

    `
    const MobileCarousel = styled.div `
    .swiper-container {
      width: 100%;
      min-height: 450px;

    .swiper-slide {
      .content {
        text-align: center;
        max-height: 268px;
       
        img {
          max-width: 271px;
          max-height: 262px;
        }

        p {
          font-size: 12px;
          line-height: 2;
          color: #ffffff;
          opacity: 1;
          padding-top: 10px;        
        }
      }
    }
    .swiper-pagination {
        bottom: 35px;
        left: 0;
        width: 100%;
      .swiper-pagination-bullet {
        width: 18px;
        height: 18px;
        display: inline-block;
        border-radius: 100%;
        border: solid 1px rgba(135, 138, 143, 0.5);
        opacity: 1;
      }
      .swiper-pagination-bullet-active {
        opacity: 1;
        background: #fff200;
      }
    }    
    
     .swiper-button-next {
       background: #000819;
       right: 26% !important;
       top: 90% !important;
       width: 37px;
       height: 37px;
    }
    .swiper-button-prev {
      background: #000819;
      left: 26% !important;
      top: 90% !important;
      width: 37px;
      height: 37px;    
    }

    i.far {
      color: #ffffff;
      border: 2px solid #fff200;
      border-radius: 50%;
      padding: 9px;
    }

    @media screen and (max-width: 1000px){
      i.fas {
        float: left !important;
      }
    }
  }

    `
    const slides = this.props.pageFields.sliderImages;
    const title = this.props.pageFields.pageTitle;
    return (
      <Hero>
        <div className="hero-container container">
          <div className="hero-header row">
            <Link to='/products' className="back-btn col-lg-12 col-md-12 col-sm-12">
              <i className="fas fa-arrow-alt-left"></i>
              BACK TO PRODUCTS
            </Link>
            <div className="hero-titles col-lg-12 col-md-12 col-sm-12">
              <p dangerouslySetInnerHTML={{ __html: title.toUpperCase()}} /> 
              <hr/>
            </div>
          </div>
          {!isMobile 
          ?
            <DesktopCarousel>
              <Swiper {...DesktopParams}>
                {slides.map((step, i) => {
                  return (
                    <div key={i}>
                      <div className="content">
                        <img src={step.image.url} className="" alt=""/>
                        <p className="">{step.image_name}</p>  
                      </div>
                    </div>
                  )
                })}
              </Swiper>
            </DesktopCarousel>
          : 
            <MobileCarousel>
              <Swiper {...MobileParams}>
                {slides.map((step, i) => {
                    return (
                      <div key={i}>
                        <div className="content">
                          <img src={step.image.url} className="" alt=""/>
                          <p className="">{step.image_name}</p>  
                        </div>
                      </div>
                    )
                  })} 
              </Swiper>
            </MobileCarousel>
          }
        </div>
      </Hero>
    )
  }
}