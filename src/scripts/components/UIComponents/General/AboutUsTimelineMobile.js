import React, {Component} from 'react';
import styled from 'styled-components';

export default class AboutUsTimelineMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: this.props.timelineData,
      activeIndex: 0
    }
  }

  prevIndex = () => {
    if (this.state.activeIndex !== 0) {
      this.setState({activeIndex: this.state.activeIndex - 1})
    } else {null}
  }
  nextIndex = () => {
    if(this.state.activeIndex === this.props.fields.length - 1) { 
      null 
    } else {
      this.setState({activeIndex: this.state.activeIndex + 1})
    }
  }

  render() {
    const events = this.props.fields;
    const eventImages = events.reduce((newArr, i) => {
      newArr.push([i.left_images, i.right_image])
      return newArr;
    }, []);
    const eventMediaSingle = events.filter(i => i.single_image).map(i => i.single_image);
    const eventSummary = events.map(i => i.description);
    const eventYear = events.map(i => i.year);
    const eventTitle = events.map(i => i.title);
    const activeIndex = this.state.activeIndex
 
    const AboutUsMobileCarousel = styled.div `
      background: #001641;
      user-select: none; 

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
       overflow-x: hidden;
       padding: 20px 0;
     }

    .timeline-area ol {
      width: 100%;
      transition: all 1s;
      margin:0;
      padding:0;
      display:flex;
      justify-content: space-between;
    }

    .timeline-area ol li {
      list-style:none;
      position: relative;
      text-align:center;
      flex-grow: 1;
      flex-basis: 0;
      padding: 0 5px;
    }

    .timeline-area ol .timeline-badge-active:before {
      content:"";
      width:10px;
      height:10px;
      display:block;
      border-radius:50%;
      background: #001641;
      border: 2px solid #fff200; 
      margin:0 auto 5px auto;
    }
    .timeline-area ol .timeline-badge-inactive:before {
      content:"";
      width:10px;
      height:10px;
      display:block;
      border-radius:50%;
      background: #001641;
      border: 2px solid #4c5c7a; 
      margin:0 auto 5px auto;
    }
    .timeline-area ol li:not(:last-child)::after {
        content: "";
        width: calc(100% - 17px);
        height: 2px;
        display: block;
        background: #4c5c7a;
        margin: 0;
        position: absolute;
        top: 4px;
        left: calc(50% + 8px);
    }
    img {
    width: 100%;
    object-fit: contain;
    overflow: hidden;
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
      margin-left: 43px;
    }

    .timeline-subtitle {
      font-size: 28px;
      font-weight: bold;
      line-height: 1.71;
      letter-spacing: normal;
      color: #ffffff;
      margin-left: 43px;
      margin-bottom: 22px;
    }
    .timeline-controls {
      display: flex;
      margin-top: 20px;
      justify-content: center;
      height: 125px;
      color: #ffffff;
      .timeline-prev i, .timeline-next i {
        border: 2px solid #fff200;
        border-radius: 50%;
        padding: 7px;
        cursor: pointer;
      }
      .prev-disabled i {
        border: 2px solid #4c5c7a;
        border-radius: 50%;
        padding: 7px;
      }
      .next-disabled i {
        border: 2px solid #4c5c7a;
        border-radius: 50%;
        padding: 7px;
      }
      .timeline-next i {
        /* border: 2px solid #fff200; */
        border-radius: 50%;
        padding: 7px;
      }
      .timeline-prev, .prev-disabled {
        padding-right: 15px;
      }
    }
    `
    return (
      <AboutUsMobileCarousel>
        <div className="timeline-container">
          <div className="timeline-title">
            Our History
            <hr/>
          </div>
          <div className="timeline-area">
            <ol>
            {events.map((i, key) => {
              return(
                <li key={key} className={activeIndex >= key ? 'timeline-badge-active' : 'timeline-badge-inactive'} onClick={() => this.setState({activeIndex: key})}></li>
                )
            })}
              {/* <li className={activeIndex >= 0 ? 'timeline-badge-active' : 'timeline-badge-inactive'}></li>
              <li className={activeIndex >= 1 ? 'timeline-badge-active' : 'timeline-badge-inactive'}></li>
              <li className={activeIndex >= 2 ? 'timeline-badge-active' : 'timeline-badge-inactive'}></li>
              <li className={activeIndex >= 3 ? 'timeline-badge-active' : 'timeline-badge-inactive'}></li>
              <li className={activeIndex >= 4 ? 'timeline-badge-active' : 'timeline-badge-inactive'}></li> */}
            </ol>
            {console.log(this.props.timelineData)}
          </div>
          <div className="timeline-info-section">
            <div className="timeline-year">{eventYear[`${this.state.activeIndex}`]}</div>
            <div className="timeline-subtitle">{eventTitle[`${this.state.activeIndex}`]}</div>
            <div className="timeline-image-section container">  
            {!events[this.state.activeIndex].single_image
            ?
              <div className="row">
                <div className="timeline-img1 col-6 pr-0 pl-0"><img src={eventImages[`${this.state.activeIndex}`][0]} alt="" /></div>
                <div className="timeline-img2 col-6 pr-0 pl-0"><img src={eventImages[`${this.state.activeIndex}`][1]} alt="" /></div>
              </div>
            :
            <div className="row">
                <div className="timeline-img1 col-12 pr-0 pl-0" style={{overflow:'hidden', maxHeight: '300px'}}>
                  <img src={eventMediaSingle} alt="" />
                </div>
              </div>
            }   
              <div className="row">
                <div className="timeline-summary col">{eventSummary[`${this.state.activeIndex}`]}</div>
              </div>




            </div>
          </div>
          <div className="timeline-controls">
            <div className={activeIndex > 0 ? 'timeline-prev' : 'prev-disabled'} aria-label="Previous slide"><i className="far fa-long-arrow-alt-left" onClick={this.prevIndex}></i></div>
            <div className={activeIndex === events.length - 1 ? 'next-disabled' : 'timeline-next'} aria-label="Next slide"><i className="far fa-long-arrow-alt-right" onClick={this.nextIndex}></i></div>
          </div>
        </div>
      </AboutUsMobileCarousel>
    )
  }
}