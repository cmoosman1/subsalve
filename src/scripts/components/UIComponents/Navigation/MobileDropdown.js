import React, { Component } from 'react'; 
import { Link } from 'react-router-dom'; 
import styled from 'styled-components'; 
import SubNavFooter from './SubNavFooter'; 
import MobileSubNav from './MobileSubNav'; 

 
 
export default class MobileDropDown extends Component { 
  constructor() { 
    super(); 
    this.state = { 
      showMobileSubNav: false, 
      category: '', 
      pageData: [] 
    }; 
  } 
 
  toggleMobileSubNav(category) { 
    let filteredPageData = this.props.pageData.filter(i => i.title === category); 
      this.setState({ 
        showMobileSubNav: !this.state.showMobileSubNav, 
        category: category,  
        pageData: filteredPageData, 
      }) 
  } 
  render() { 
    const pageData = this.props.pageData; 
    const Dropdown = styled.div` 
      
    background: #000819;  
    width: 100%; 
    height: 100%;  
    z-index: 10; 
    margin-top: 10px; 
    right: 0;  
    position: sticky;  
    min-height: 900px;
    
    @media(max-width: 375px) { 
      max-width: 375px;
    } 
 
    .dropdown-header { 
      margin-top: 30px; 
 
      .dropdown-titles { 
        text-align: center; 
    
        .page-title { 
        font-size: 18px; 
        font-weight: bold; 
        letter-spacing: 1.5px; 
        line-height: 1.23; 
        color: #ffffff; 
        text-decoration: none; 
        text-transform: uppercase; 
        padding-bottom: 20px; 
 
        i.fas { 
          color: #fff200; 
          width: 10px; 
          height: 6px; 
          float: right; 
        } 
        } 
      } 
 
      hr { 
        width: 60px; 
        height: 4px; 
        background-color: #fff200; 
        margin-top: 5px; 
        float: left; 
      } 
    } 
 
    .page-title, .page-link { 
      background: #000819;  
      color: #ffffff; 
      font-size: 15px; 
      line-height: 1.25; 
      letter-spacing: 1.33px; 
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
      border: none; 
      padding: 5px; 
    } 


    .page-title a {
      color: #ffffff;
    }
    .dropdown-info-row { 
      padding-top: 40px; 
      .download-btn { 
        width: 280px; 
        height: 40px; 
        border-radius: 50px; 
        background-color: #fff200; 
        color: #000819; 
        font-weight: bold; 
        line-height: 1.29; 
        letter-spacing: 1.08px; 
        text-align: center; 
        font-size: 15px; 
        padding: 17px 30px 18px 40px; 
        margin-top: 40px; 
      } 
      .social-title { 
        margin-top: 60px; 
        font-size: 18px; 
        font-weight: bold; 
        font-style: normal; 
        font-stretch: normal; 
        line-height: normal; 
        letter-spacing: 1.5px; 
        text-align: center; 
        color: #ffffff; 
      } 
      .social-icons { 
        margin-top: 26px; 
        i.fab { 
          font-size: 48px; 
          margin-right: 20px; 
          color: #0076be; 
          padding-left: 14px; 
        } 
      } 
    } 
  ` 
    return ( 
      <Dropdown> 
        <div className="container"> 
          <div className="row"> 
            <div className="dropdown-header col-lg-12 col-md-12 col-sm-12"> 
              {!this.state.showMobileSubNav ?  
              <div className="dropdown-titles"> 
                {pageData.map((page, i) => { 
                  if (page.title === "Products" || page.title === "Applications") { 
                    return ( 
                      <div className="page-title" key={i} onClick={() => this.toggleMobileSubNav(page.title)}> 
                        {page.title}
                        <i key={i} className="fas fa-chevron-right"/> 
                      </div> 
                    ) 
                  } else { 
                    return ( 
                      <div className="page-title"> 
                        <Link to={page.object_slug} key={i}> 
                          {page.title} 
                        </Link> 
                      </div> 
                    ) 
                  } 
                })} 
                <div className="dropdown-info-row"> 
                  <Link to="#" className="download-btn">DOWNLOAD CATALOG</Link> 
                  <div className="social-title">FOLLOW US</div> 
                  <div className="social-icons"> 
                    <i className="fab fa-facebook"></i> 
                    <i className="fab fa-linkedin-in"></i> 
                  </div> 
                </div> 
              </div> 
              : 
                <MobileSubNav pageData={this.state.pageData} category={this.state.category} goBack={this.props.goBack}/> 
            } 
            </div> 
          </div> 
        </div> 
      </Dropdown> 
    ) 
  } 
} 