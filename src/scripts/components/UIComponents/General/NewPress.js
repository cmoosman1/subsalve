import React, {Component} from 'react';
import styled from 'styled-components';
import Swiper from 'swiper/dist/js/swiper.js';
import NewsCarouselMobile from './NewsPressMobile';

class NewsPress extends Component {
  constructor() {
    super();
    this.state = {
      articleBorder: '',
      window: window.innerWidth
    }
  }

  componentWillMount() {
    this.handleWindowSizeChange();
  }

  componentDidMount() {
    this.swiperInit();
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentDidUpdate() {
    this.swiperInit();
  }
  
  swiperInit() {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 2,
      spaceBetween: 30,              
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
    });
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
    const isMobile = this.state.width <= 1000;
    const pageFields = this.props.pageFieldsData.card.details;
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
        height: 84px;
        font-size: 23px;
        font-weight: bold;
        line-height: 1.4;
        letter-spacing: normal;
        color: #252627;
        padding-left: 50px;
        padding-right: 40px;
        margin-bottom: 45px;
        margin-top: 10px;

        @media (min-width: 500px) and (max-width: 1000px) {
          font-size: 18px;
          line-height: 1.33;
          padding-left: 30px;
        }

      }

      .news-card-button {
        width: 220px;
        height: unset !important;
        border-radius: 50px;
        border: solid 2px #fff200;
        background-color: rgba(37, 38, 39, 0);
        margin-left: 50px; 
        padding: 15px;
        text-align: center;
        vertical-align: middle;

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

    const NewsSection = styled.section `
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
      }

      .circle-red {
        width: 18px;
        height: 18px;
        background: #fff200;
        border-radius: 50%;
        margin-right: 10px;

        @media (max-width: 768px) {
          display: none !important;
        }
      }

      .circle-gray {
        width: 18px;
        height: 18px;
        background: #0076be
        border-radius: 50%;
        margin-right: 10px;

        @media (max-width: 768px) {
          display: none !important;
        }
      }

      .mobile-header-elements {
        @media (max-width: 768px) {
          display: none !important;
        }
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
        width: 555px;
        opacity: 1 !important;
        height: 300px;
        background-color: #ffffff;
        color: #252627;
        box-shadow: 0 2px 20px 0 rgba(37, 38, 39, 0.2);
        margin-left: -1px;
        margin-top: -1px;
        margin-bottom: -1px;
        // change border left to either article or press release color from wordpress data
        border-left: 10px solid #fff200; !important;
      }
      .swiper-slide-next {
        width: 555px;
        opacity: 1 !important;
        height: 300px;
        background-color: #ffffff;
        color: #252627;
        box-shadow: 0 2px 20px 0 rgba(37, 38, 39, 0.2);
        margin-left: -1px;
        margin-top: -1px;
        margin-bottom: -1px;
        // change border left to either article or press release color from wordpress data
        border-left: 10px solid #0076be
      }
      .swiper-slide {
        cursor: pointer;
        width: 555px;        
        opacity: 0.5;
        height: 300px;
        background-color: #ffffff;
        color: #252627;
        box-shadow: 0 2px 20px 0 rgba(37, 38, 39, 0.2);
        margin-left: -1px;
        margin-top: -1px;
        margin-bottom: -1px;
        // change border left to either article or press release color from wordpress data
        border-left: 10px solid #0076be
        top: 0;
        transition: top ease 0.3s;
        
        :hover {
          box-shadow: 0 .5rem 1rem rgba(0,0,0,.15) !important;
          top: -10px;

          .news-card-button {
            color: #404040;
            border: solid 2px #ffffff;
            background-color: #fff200;

            i.far {
              font-size: 0.8rem;
              margin-left: 0.3rem;
              color: #0076be;
            }
    
            a:hover {
              color: #404040;
            }

          }

          .news-card-button {
            color: #404040;
          }
        } 


        @media (min-width: 500px) and (max-width: 1000px) {
          width: 283px !important;
        }
      }

      .swiper-button-prev, .swiper-button-next {
        i.far {
          color: #fff;
          position: relative;
          margin-top: 15px;
          margin-left: 15px;
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
        left: 87%;
        width: 50px;
        height: 50px;
        outline: none;

        @media (max-width: 768px) {
          left: 68%;
        }
      }
      .swiper-button-prev.swiper-button-disabled, .swiper-button-next.swiper-button-disabled {
        opacity: .35;
        cursor: auto;
        pointer-events: none;
        border: solid #878a8f;
    }
   
    `;
    const newsArray = pageFields.filter(step => step.type === "news");
    if (isMobile) {
      return (
        <NewsCarouselMobile pageFields={newsArray}/>
      ) 
    } else {
			return (
        <NewsSection>
              <div className="container">
              <div className="news-controls row">
              <ul className="list-inline col-lg-12 col-md-12 col-sm-2 col-xs-1">
                <div className="control-area">
                  <li className="list-inline-item-title"><h3 className="news-title">News</h3></li>
                  <li className="list-inline-item"><hr/></li>
                  <li className="list-inline-item d-flex" id="circles">
                  <div className="circle-red"></div>
                  <p className="">Articles</p></li>
                  <li className="list-inline-item d-flex" id="circles">
                  <div className="circle-gray"></div>
                  <p className="">Press Releases</p></li>
                  </div>
                </ul>
              </div>
              <div className="swiper-container swiper-container-horizontal">
                <div className="swiper-wrapper">
                {newsArray.map((step, i) => {
                    if(step.button_title === "GO TO ARTICLE"){
                      return (
                        <Card key={i} className="swiper-slide" data-hash={i} style={{borderLeft: '10px solid #fff200'}}>
                          <div className="news-card-above-title d-inline-block">{step.title.toUpperCase()}</div>
                            <div className="news-card-title d-inline-block">{step.subtitle}</div>
                            <div className="btn news-card-button"><a href={step.button_url} target="_blank">{step.button_title}</a>
                             <i className="far fa-external-link-square-alt"></i> 
                            </div>
                        </Card>
                      )}
                      else {
                        return (
                        <Card key={i} className="swiper-slide" data-hash={i} style={{borderLeft: '10px solid #0076be'}}>
                            <div className="news-card-above-title d-inline-block">{step.title.toUpperCase()}</div>
                            <div className="news-card-title d-inline-block">{step.subtitle}</div>
                            <div className="btn news-card-button"><a href={step.button_url} target="_blank">{step.button_title}</a>
                            </div>
                        </Card>

                        )
                      }
                    }
                  )}
                </div>
                <div className="swiper-button-next" role="button" aria-label="Next slide"><i className="far fa-long-arrow-alt-right"></i></div>
                <div className="swiper-button-prev" role="button" aria-label="Previous slide"><i className="far fa-long-arrow-alt-left"></i></div>
              </div>
              </div>
        </NewsSection> 
			);
    }
		}
  }

export default NewsPress;