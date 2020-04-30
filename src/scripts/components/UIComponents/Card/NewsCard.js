import React, {Component} from 'react';
import styled from 'styled-components';

class NewsCard extends Component {

  render() {
    const NewsSection = styled.section `
      background-color: #000819;
      padding-bottom: 40px;
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
        border: 1px solid #0076be;

        @media (max-width: 750px) {
          display: none;
        }
      }

      .control-area {
        display: flex;
        margin-top: 80px;
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
      }

      .circle-gray {
        width: 18px;
        height: 18px;
        background: #0076be;
        border-radius: 50%;
        margin-right: 10px;

      }
      .press-release {
        @media (max-width: 750px) {
          width: max-content;
        }
      }

      #circles {
        padding-top: 6px;
        padding-left: 20px;

        @media (max-width: 750px) {
          padding-left: 0px;
        }
      }
      
      .news-card-press {
        cursor: pointer;
        margin-right: 20px;     
        height: 300px;
        background-color: #ffffff !important;
        color: #252627;
        box-shadow: 0 2px 20px 0 rgba(37, 38, 39, 0.2);
        margin-left: -1px;
        margin-top: -1px;
        margin-bottom: 20px;
        // change border left to either article or press release color from wordpress data
        border-left: 10px solid #0076be !important;
        top: 0;
        transition: top ease 0.3s;      
        :hover {
          box-shadow: 0 .5rem 1rem rgba(0,0,0,.15) !important;
          top: -10px;
          transition: top ease 0.3s;
        
          .news-card-button {
            border: solid 2px #ffffff;
            background-color: #fff200;
        
            i.far {
              font-size: 0.8rem;
              margin-left: 0.3rem;
              color: #252627;
            }
        
          }
        }

        @media (max-width: 500px) {
          margin-left: 30px; 
          margin-right: 30px;
        }
      }	

      .news-card {
        cursor: pointer;
        margin-right: 20px;     
        height: 300px;
        background-color: #ffffff !important;
        color: #252627;
        box-shadow: 0 2px 20px 0 rgba(37, 38, 39, 0.2);
        margin-left: -1px;
        margin-top: -1px;
        margin-bottom: 20px;
        // change border left to either article or press release color from wordpress data
        border-left: 10px solid #fff200 !important;
        top: 0;
        transition: top ease 0.3s;      
        :hover {
          box-shadow: 0 .5rem 1rem rgba(0,0,0,.15) !important;
          top: -10px;
          transition: top ease 0.3s;
        
          .news-card-button {
            border: solid 2px #ffffff;
            background-color: #fff200;
        
            i.far {
              font-size: 0.8rem;
              margin-left: 0.3rem;
              color: #252627;
            }
        
          }
        }

        @media (max-width: 500px) {
          margin-left: 30px; 
          margin-right: 30px;
        }
      }	
  
        .news-card-above-title { 
          height: 16px;
          font-size: 13px;
          font-weight: bold;
          letter-spacing: 1.08px;
          color: #a09f9c;
          padding-left: 50px;
          padding-top: 35px;
          width: 100%;
  
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
            width: 265px;
          }
  
        }
  
        .news-card-button {
          width: 220px;
          height: 50px;
          padding: 15px;
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
            padding-bottom: 30px;
            font-size: 11px;
            font-weight: bold; 
            letter-spacing: 1.08px;
            text-align: center;
            color: #404040;
          }
          
          .news-card-button:hover {
            color: #404040;
          }
          
          a:hover {
            color: #404040;
          }
          @media (min-width: 500px) and (max-width: 1000px) {
            margin-left: 30px;
          }
        }

        @media (min-width: 992px) {
          .col-lg-6 {
              -ms-flex: 0 0 48% !important;
              flex: 0 0 48% !important;
              max-width: 48% !important;
          }
        }
        
    `;
    const newsArray = this.props.pageFields.card.details;
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
                    <p className="press-release">Press Releases</p></li>
                    </div>
                  </ul>
                </div>   
                <div className="row">
                  {newsArray.map((step, i) => {
                    if(step.button_title === "GO TO ARTICLE"){
                      return (
                          <div className="news-card col-lg-6 col-md-9 col-sm-12 col-xs-12" key={i} style={{borderLeft: '10px solid #fff200 !important'}}>
                            <div className="news-card-above-title d-inline-block">{step.title}</div>
                            <div className="news-card-title d-inline-block">{step.subtitle}</div>
                            <div className="btn news-card-button"><a href={step.button_url} target="_blank">{step.button_title}</a>
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
                          </div>
                      )}
                      else{
                        return(
                          <div className="news-card-press col-lg-6 col-md-9 col-sm-12 col-xs-12" key={i}>
                            <div className="news-card-above-title d-inline-block">{step.title}</div>
                            <div className="news-card-title d-inline-block">{step.subtitle}</div>
                            <div className="btn news-card-button"><a href={step.button_url} target="_blank">{step.button_title}</a>
                            </div>
                          </div>
                        )
                      }
                    })}
                  </div>      
              </div>
        </NewsSection> 
			);
		}
  }

export default NewsCard;