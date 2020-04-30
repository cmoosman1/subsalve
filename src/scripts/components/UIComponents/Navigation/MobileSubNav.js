import React from 'react'; 
import { Link } from 'react-router-dom'; 
import renderHTML from 'react-render-html';
import './MobileSubNav.scss' 
 
export default function MobileSubNav(props) { 
    const categoryPageData = props.pageData[0]; 
 
    return ( 
      <div className="sub-dropdown container"> 
        <div className="row"> 
          <div className="sub-nav-dropdown-header col-lg-12 col-md-12 col-sm-12"> 
            <div className="sub-dropdown-titles"> 
              <div className="sub-page-category" onClick={props.goBack}><i id="left-icon" className="fas fa-chevron-left" />{props.category}</div> 
              {props.category === "Products" ?  
              categoryPageData.children.map((page, i) => { 
                return ( 
                  <Link to={page.object_slug} key={i}> 
                  <div className="sub-pages" key={i}>{page.title}</div>   
                  </Link> 
                ) 
              }) 
              :  
              props.category === "Applications" ? ( 
                categoryPageData.children.map((page, i) => { 
                  return ( 
                  <Link to={page.object_slug} key={i}>                 
                    <div className="sub-pages" key={i}>{renderHTML(page.title)}</div>          
                  </Link> 
                    ) 
                  }) 
              ) 
                :  
                categoryPageData.children.map((page, i) => { 
                  return ( 
                    <Link to={page.object_slug} key={i}></Link> 
                  ) 
                })  
              } 
            </div> 
            <div className="sub-dropdown-footer"> 
              <Link to={props.category.toLowerCase()}> 
                See All {props.category} 
                <i className="fas fa-arrow-right sub-dropdown-icon" aria-hidden="true"></i> 
              </Link> 
            </div> 
          </div> 
        </div> 
      </div>  
    ) 
} 