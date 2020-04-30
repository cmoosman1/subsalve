import React, { Component } from 'react';
import styled from 'styled-components';

export default class AboutUsDesktopTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: this.props.timelineData,
      singleImage: null,
      activeIndex: 0,
    }
  }

  prevIndex = () => {
    if (this.state.activeIndex !== 0) {
      this.setState({ activeIndex: this.state.activeIndex - 1 })
    } else { null }
  }

  nextIndex = () => {
    if (this.state.activeIndex === this.state.events.length - 1) {
      null
    } else {
      this.setState({ activeIndex: this.state.activeIndex + 1 })
    }
  }

  setCurrentIndex = (key) => {
    this.setState({
      activeIndex: key
    })
  }

  render() {
    const events = this.props.timelineData;
    const eventImages = events.reduce((newArr, i) => {
      newArr.push([i.left_images, i.right_image])
      return newArr;
    }, []);
    const eventMediaSingle = events.filter(i => i.single_image).map(i => i.single_image);
    const eventSummary = events.map(i => i.description);
    const eventYear = events.map(i => i.year);
    const eventTitle = events.map(i => i.title);
    const activeIndex = this.state.activeIndex;
    
    const AboutUsDesktopTimeline = styled.div`
      background: #001641;
      user-select: none; 
      min-height: 950px;
      max-height: 1200px;

      .timeline-title {
        font-size: 36px;
        font-weight: bold;
        line-height: 1.33;
        text-align: center;
        color: #ffffff;
        padding-top: 60px;

        hr {
          width: 80px;
          height: 4px;
          background-color: #fff200;
        }
      }
     .timeline-area {
       padding: 0 0;
     }

    .timeline-list {
      top: 0;
      bottom: 0;
      position: absolute;
      content: " ";
      width: 2px;
      background: #4c5c7a;
      left: 50%;
      margin-left: 27.5px;
    }

    .timeline-area ol {
      height: 109%;
      width: 100%;
      transition: all 1s;
      margin:0;
      padding:0;
      margin-top: 70px;
      justify-content: space-between;
      top: 0;
      bottom: 0;
      position: absolute;
      content: " ";
      width: 2px;
      background: #4c5c7a;
      right: 6%;
    }

    .timeline-area ol li {
      list-style:none;
      position: relative;
      padding-bottom: 70px;
      left: -9px;
      top: -21px;
    }

    .timeline-area ol .timeline-badge-active:before {
      content:"";
      width:20px;
      height:20px;
      display:block;
      border-radius:50%;
      background: #001641;
      border: 2px solid #fff200; 
      margin:0 auto 5px auto;
    }
    .timeline-area ol .timeline-badge-inactive:before {
      content:"";
      width:20px;
      height:20px;
      display:block;
      border-radius:50%;
      background: #001641;
      border: 2px solid #4c5c7a; 
      margin:0 auto 5px auto;
    }

    img {
      width: 100%;
      object-fit: contain;
    }
    .timeline-summary {
      background-color: #ffffff;
      padding: 30px 20px;
      font-size: 16px;
      line-height: 1.63;
      height: 250px;
      text-align: left;
    }
    .timeline-year {
      font-size: 12px;
      font-weight: bold;
      letter-spacing: 1px;
      color: #fff200; 
    }

    .timeline-subtitle {
      font-size: 28px;
      font-weight: bold;
      line-height: 1.71;
      letter-spacing: normal;
      color: #ffffff;
      margin-bottom: 9px;
      margin-top: -8px;
    }
    .timeline-year-left {
      font-size: 12px;
      letter-spacing: 1px;
      color: #fff200;
      position: relative;
      left: -43px;
      top: 7px;
    }

    .timeline-subtitle-left {
      font-size: 14px;
      letter-spacing: normal;
      color: #ffffff;
      position: absolute;
      top: 27px;
      left: -102px;
      width: 89px;
      text-align: right;
    }
    .timeline-controls {
      display: flex;
      justify-content: center;
      float: right;
      margin-bottom: 33px;
      color: #ffffff;
      .timeline-prev i, .timeline-next i {
        border: 2px solid #fff200;
        border-radius: 50%;
        text-align: center;
        padding: 8px;
        width: 35px;
        height: 35px;
      }
      .prev-disabled i {
        border: 2px solid #4c5c7a;
        border-radius: 50%;
        text-align: center;
        padding: 8px;
        width: 35px;
        height: 35px;
      }
      .next-disabled i {
        border: 2px solid #4c5c7a;
        border-radius: 50%;
        text-align: center;
        padding: 8px;
        width: 35px;
        height: 35px;
      }
      .timeline-next i {
        border: 2px solid #fff200;
        border-radius: 50%;
        text-align: center;
        padding: 8px;
        width: 35px;
        height: 35px;;
      }
      .timeline-prev, .prev-disabled {
        padding-right: 15px;
      }
    }
    `
    return (
      <AboutUsDesktopTimeline>
        <div className="timeline-container container">
          <div className="timeline-title">
            Our History
            <hr />
          </div>
          <div className="row">
            <div className="timeline-area col-2">
              <div className="timeline-controls">
                <div className={activeIndex > 0 ? 'timeline-prev' : 'prev-disabled'} aria-label="Previous slide"><i className="far fa-long-arrow-alt-up" onClick={this.prevIndex}></i></div>
                <div className={activeIndex === events.length - 1 ? 'next-disabled' : 'timeline-next'} aria-label="Next slide"><i className="far fa-long-arrow-alt-down" onClick={this.nextIndex}></i></div>
              </div>
              <ol className="timelime-list">
                {events.map((i, key) => {
                  return (
                    <li className="timeline-info-left" key={key}>
                      <div className="timeline-year-left" onClick={() => this.setState({activeIndex: key})}>{i.year}</div>
                      <div className="timeline-subtitle-left" onClick={() => this.setState({activeIndex: key})}>{i.title}</div>
                      {/* <div className={activeIndex >= key ? 'timeline-badge-active' : 'timeline-badge-inactive'} onClick={() => this.setCurrentIndex(key)}></div> */}
                      <div className={activeIndex >= key ? 'timeline-badge-active' : 'timeline-badge-inactive'} onClick={() => this.setState({activeIndex: key})}></div>
                    </li>
                  )
                })}
              </ol>
            </div>
          <div className="timeline-info-section col-10">
            <div className="timeline-year">{eventYear[`${this.state.activeIndex}`]}</div>
            <div className="timeline-subtitle">{eventTitle[`${this.state.activeIndex}`]}</div>
            <div className="timeline-image-section container">
              {!this.state.events[this.state.activeIndex].single_image 
              ? 
              <div className="row">
                <div className="timeline-img1 col-6 pr-0 pl-0">
                  <img src={eventImages[`${this.state.activeIndex}`][0]} alt="" />
                </div>
                <div className="timeline-img2 col-6 pr-0 pl-0">
                  <img src={eventImages[`${this.state.activeIndex}`][1]} alt="" />
                </div>
              </div>
              :
              <div className="row">
                <div className="timeline-img1 col-12 pr-0 pl-0">
                  <img src={eventMediaSingle} alt="" />
                </div>
              </div>
              }
              <div className="row">
                <div className="timeline-summary col">{eventSummary[`${this.state.activeIndex}`]}</div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </AboutUsDesktopTimeline>
    )
  }
}