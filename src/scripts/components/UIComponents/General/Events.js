import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

class Events extends Component {
  addToCalendar(event) {
    const route = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${event.event_title}&dates=${event.event_start}/${event.event_end}&details=${event.event_area}&location=${event.event_location}`;
    return route;
  }

  checkIfPast(eventDate) {
    let today = moment().toDate().toLocaleDateString()
    return moment(eventDate).isSameOrAfter(today)
  }

  render() {
    const fields = this.props.fields;
    const Events = styled.section`
      min-height: 320px;
      background-color: #ffffff;

      .upcoming-events {
        margin-top: 60px;

        .event-title {
          width: 437px;
          height: 48px;      
          font-size: 36px;
          font-weight: bold;
          line-height: 1.33;
          letter-spacing: normal;
          color: #252627;
        }

        hr {
          width: 80px;
          height: 4px;
          background-color: #fff200;
          float: left;
        }
      }
      
      .event-card {
        width: max-content;
        display: flex;
        border-right: 1px solid #dfe1df;
        padding-left: 47.5px;
        padding-right: 47.5px;
        
        @media (max-width: 992px) {
          padding-left: 1.25rem;
        }

        @media (max-width: 500px) {
          border-bottom: 1px solid #dfe1df;
          margin: 0px 35px 0px 35px;
        }
        
      }
      .event-card-3 {
        display: flex;
        border-right: 1px solid #dfe1df;
        padding-left: 47.5px;
        
        @media (max-width: 992px) {
          padding-left: 1.25rem;
        }

        @media (max-width: 500px) {
          border-bottom: 1px solid #dfe1df;
          margin: 0px 35px 0px 35px;
        }
        
      }
      
      .event-row {
        display: flex;
        width: auto;
        overflow-x: auto;
      }

      .circle {
          width: 77px;
          height: 77px;
          background: #878a8f;
          border-radius: 50%;
          margin-top: 1.25rem;
          color: #ffffff;
          text-align: center;
          padding-top: 7px;
          padding-left: 3px;

          .month {
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 2px;
          }

          .day {
            font-size: 30px;
            font-weight: bold;
            letter-spacing: 2px;
          }
      }

      .card-body {
        width: 100%;
        line-height: 1.5rem;
        min-width: 300px;
        .card-title {
          font-size: 14px;
          font-weight: bold;
          letter-spacing: 1px;
          color: #252627;
        }
        .card-subtitle, .card-text {
          font-size: 16px;
          line-height: 1.63;
          color: #252627;
        }
      }
      .card-body-3 {
        padding: 1.25rem;
        .card-title {
          font-size: 14px;
          font-weight: bold;
          letter-spacing: 1px;
          color: #252627;
          white-space: nowrap;
        }
        .card-subtitle, .card-text {
          font-size: 16px;
          line-height: 1.63;
          color: #252627;
        }
      }

      .add-to-cal {
        display: flex;
        color: #0076be;
        cursor: pointer;

        &-text {
          font-size: 16px;
        }

        i {
          font-size: 16px;
          position: relative;
          left: 7px;      
        }

        i:hover {
          color: #ababab;
        }

        a {
          color: #0076be;
        }

        a:hover {
          color: #ababab;
        }
      }

      .row.vl [class*='col']:not(:last-child):after {
        background: #dfe1df;
        width: 1px;
        content: "";
        display:block;
        position: absolute;
        top: 8px;
        bottom: 0;
        right: 0;
        max-height: 96px;

        @media (max-width: 500px) {
         background: none;
        }
      }

    `



    const sortedEvents = fields.sort(step => step.acf.event_start)
    const currentEvents = sortedEvents.filter(i => this.checkIfPast(i.acf.event_start))

    return (
      <Events>
        <div className="container">
          <div className="row">
            <div className="upcoming-events col-12">
              <div className="event-title">Upcoming Events</div>
              <hr />
            </div>
          </div>
          <div className={currentEvents.length <= 3 ? 'event-row-3 row vl' : 'event-row'}>
            {currentEvents.map((step, i) => {
              return (
                <div className={currentEvents.length <= 3 ? 'event-card-3 col-lg col-xs-12' : 'event-card'} key={i}>
                  <div className="event-date">
                    <div className="circle">
                      <div className="month">{step.acf.event_month}</div>
                      <div className="day">{step.acf.event_day}</div>
                    </div>
                  </div>
                  <div className={currentEvents.length <= 3 ? 'card-body-3' : 'card-body'}>
                    <div className="card-title">{decodeURIComponent(step.acf.event_title)}</div>
                    <div className="card-subtitle">{decodeURIComponent(step.acf.event_location)}</div>
                    <div className="card-text">{decodeURIComponent(step.acf.event_area)}</div>
                    <div className="add-to-cal">
                      <a href={this.addToCalendar(step.acf)} className="add-to-cal-text" target="_blank">Add to Calendar
            <i className="fal fa-calendar-plus"></i></a>
                    </div>
                  </div>
                </div>
              )
            }).reverse()}
          </div>
        </div>
      </Events>
    )
  }
};

export default Events;