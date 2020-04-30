import React from 'react';
import {Link} from 'react-router-dom';


function MobileProductsNav({applications, caseStudies, onClick, products}) {
    return (
        <div className="mobile-sub-nav-wrapper-open">
            <div className="container">
                <div className="mobile-header-nav">
                    <i className="fas fa-chevron-left" 
                        style={{
                            fontSize: '22px',
                            marginRight: '15px',
                            marginTop: '5px', 
                            float: 'left'}}></i> 
                    <a href="#" onClick={() => {onClick}}>Applications</a>
                </div>
                <div className="mobile-sub-nav">
                    <ul>
                        {products.map((page) => {
                            return(
                                <li key={page.id}>
                                    <i className="fal fa-horizontal-rule"style={{marginRight: '10px'}} ></i> 
                                    <a href="#" onClick={() => {this.handleDropDown(page.id)}}>
                                        {page.title}
                                    </a>
                                </li>
                            )          
                        })} 
                    </ul>
                </div>
            </div>  
        </div>
    )
}

export default MobileProductsNav;
