import React from 'react'; 
import './SubNavFooter.scss'; 
import {Link} from 'react-router-dom'; 
 
export default function SubNavFooter({currentMenu}) { 
  if (currentMenu === 'products') { 
    return ( 
      <div className="sub-nav-footer-wrapper col-12"> 
        <div className="row">           
          <div className="sub-nav-footer-item col-2"> 
              <Link to="/accessories" className="sub-nav-footer-text"> 
                See Accessories 
               <i className="fas fa-arrow-right sub-nav-menu-item-fas"></i> 
              </Link> 
          </div> 
          <div className="sub-nav-footer-item-right sub-nav-left-border col-9"> 
            <Link to="/contact" className="sub-nav-footer-text-right sub-nav-right-text-spacer"> 
              See Custom Solutions 
             <i className="fas fa-arrow-right sub-nav-menu-item-fas"></i> 
            </Link> 
          </div> 
        </div> 
      </div> 
    ) 
  } else if (currentMenu === "applications") { 
    return ( 
      <div className="sub-nav-footer-wrapper-alt col-12"> 
        <div className="sub-nav-footer-item-alt"> 
          <Link to="/accessories" className="sub-nav-footer-text"> 
                See Accessories 
              <i className="far fa-arrow-right sub-nav-menu-item-fas"></i> 
          </Link> 
        </div> 
      </div> 
    ) 
  } else { 
    return (null) 
  } 
} 
