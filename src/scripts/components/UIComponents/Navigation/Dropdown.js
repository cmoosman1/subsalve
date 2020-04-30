import React, {Component} from 'react'; 
import { HashLink as Link } from 'react-router-hash-link';
import styled from 'styled-components'; 
import SubNavFooter from './SubNavFooter'; 
import renderHTML from 'react-render-html';
 
 
export default class DropDown extends Component {  
  render() { 
    const currentCategory = this.props.category; 
    const route = currentCategory.replace(/\s+/g, '-').toLowerCase(); 
    const pageData = this.props.pageData; 
    const Dropdown = styled.div ` 
      
    background: #000819;  
    width: 100%; 
    min-height: 400px;  
    z-index: 10; 
    margin-top: 67px; 
    left: 0;  
    position: absolute;  
 
    .dropdown-header { 
      margin-top: 60px; 
 
      .dropdown-title { 
        font-size: 26px; 
        font-weight: bold; 
        line-height: 1.23; 
        color: #ffffff; 
        text-decoration: none; 
        text-transform: capitalize; 
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
      overflow: hidden;
        text-overflow: ellipsis;
    } 

    .page-link:hover {   
      color: #ababab; 
    } 

    .highlight-text {
      color: #ffffff; 
      font-size: 14px;
      font-weight: normal; 
    }
  ` 
    return ( 
      <Dropdown> 
        <div className="container"> 
          <div className="row"> 
            <div className="dropdown-header col-lg-12 col-md-12 col-sm-12"> 
              <div className="dropdown-title"> 
                  {currentCategory === 'applications' ? (
										<span className="dropdown-title">
                      {currentCategory}  
										</span>
									) :
                  <Link 
                    to={`/${route}`} 
                    className="dropdown-title" 
                  > 
                    See All {currentCategory} {currentCategory &&  currentCategory == 'case studies' ? <span className="highlight-text">(* Asterisk indicates Under Construction Case Studies)</span> : '' }
                  </Link>
                } 
                </div> 
              <hr/> 
            </div> 
            </div> 
            <div className="menu-item-section row"> 
              <div className="menu-item col-3"> 
              {pageData.map((page) => {                      
                      return page.title.toLowerCase() === currentCategory ? ( 
                          <div className="" key={page.id}> 
                            {page.children.slice(0,5).map((title) => { 
                              return (   
                                  <div className="page-title" key={title.id}> 
                                    <Link  
                                      to={`/${title.object_slug}`} 
                                      className="page-link"  
                                      > 
                                      {renderHTML(title.title)}                                                  
                                    </Link> 
                                  </div>                   
                              ) 
                            })} 
                          </div> 
                      )                      
                    :  
                    null                                 
                })} 
              </div> 
              <div className="menu-item col-3"> 
              {pageData.map((page) => {                      
                      return page.title.toLowerCase() === currentCategory ? ( 
                          <div className="" key={page.id}> 
                            {page.children.slice(5,10).map((title) => { 
                              return (   
                                  <div className="page-title" key={title.id}> 
                                    <Link  
                                      to={`/${title.object_slug}`} 
                                      className="page-link"  
                                      > 
                                      {renderHTML(title.title)}                                                
                                    </Link> 
                                  </div>                   
                              ) 
                            })} 
                          </div> 
                      )                      
                    :  
                    null                                 
                })} 
              </div> 
              <div className="menu-item col-3"> 
              {pageData.map((page) => {                      
                      return page.title.toLowerCase() === currentCategory ? ( 
                          <div className="" key={page.id}> 
                            {page.children.slice(10,15).map((title) => { 
                              if(title.title == 'Liquid Containment'){
                                return (   
                                  <div className="page-title" key={title.id}> 
                                    <a   
                                      href="https://aef-performance.com/liquid-containment"
                                      className="page-link"
                                      target="_blank"  
                                      > 
                                      {renderHTML(title.title)}                                              
                                    </a> 
                                  </div>                   
                                )  
                              }
                              return (   
                                  <div className="page-title" key={title.id}> 
                                    <Link  
                                      to={`/${title.object_slug}`} 
                                      className="page-link"  
                                      > 
                                      {renderHTML(title.title)}                                              
                                    </Link> 
                                  </div>                   
                              ) 
                            })} 
                          </div> 
                      )                      
                    :  
                    null                                 
                })} 
              </div> 
              <div className="menu-item col-3"> 
                {pageData.map((page) => {                      
                      return page.title.toLowerCase() === currentCategory ? ( 
                          <div className="" key={page.id}> 
                            {page.children.slice(15,21).map((title) => { 
                              return (   
                                  <div className="page-title" key={title.id}> 
                                    <Link  
                                      to={`/${title.object_slug}`} 
                                      className="page-link"  
                                      > 
                                      {renderHTML(title.title)}                                            
                                    </Link> 
                                  </div>                   
                              ) 
                            })} 
                          </div> 
                      )                      
                    :  
                    null                                 
                })} 
              </div> 
              <SubNavFooter currentMenu={currentCategory}/>  
            </div> 
          </div> 
      </Dropdown> 
    ) 
  } 
}