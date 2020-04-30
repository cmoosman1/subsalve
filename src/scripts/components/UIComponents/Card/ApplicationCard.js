import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import './ApplicationCard.scss';

function ApplicationCard({fields, customSolution}) {
    let cardURL = fields.acf.card_url.post_name;
    if(!cardURL){
        cardURL = '/';
    } 
    if(cardURL === 'liquid-containment'){
        cardURL = 'https://aef-performance.com/liquid-containment'
    }
    if(fields.title.rendered !== 'Custom Solutions'){
        return (
            <div className="product-card-wrapper mt-4">
                 {cardURL === 'https://aef-performance.com/liquid-containment' && 
                    <a href={cardURL} target="_blank">
                        <div className="container application-product-wrapper">
                            <div className="row">
                                <div className="col text-center product-icon" dangerouslySetInnerHTML={{ __html: fields.acf.product_icon}} />
                                <div className="col cta-text-wrapper">
                                    <h4 className="product-title-text mt-4 pl-3">
                                        {fields.acf.product_title}
                                    </h4>
                                    <div className="product-text mt-1 pl-3" dangerouslySetInnerHTML={{ __html: fields.acf.product_summary}} />
                                </div>
                                <div className="col" style={{maxWidth: '20px'}}>
                                    <i className="fas fas-product-arrow-link fa-arrow-right" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>  
                    </a>
                }
                {cardURL != 'https://aef-performance.com/liquid-containment' && 
                    <Link to={cardURL}>
                        <div className="container application-product-wrapper">
                            <div className="row">
                                <div className="col text-center product-icon" dangerouslySetInnerHTML={{ __html: fields.acf.product_icon}} />
                                <div className="col cta-text-wrapper">
                                    <h4 className="product-title-text mt-4 pl-3">
                                        {fields.acf.product_title}
                                    </h4>
                                    <div className="product-text mt-1 pl-3" dangerouslySetInnerHTML={{ __html: fields.acf.product_summary}} />
                                </div>
                                <div className="col" style={{maxWidth: '20px'}}>
                                    <i className="fas fas-product-arrow-link fa-arrow-right" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>  
                    </Link>
                }
            </div>
        )
    } else {
        return(        
            <div className="product-card-wrapper mt-4" style={{backgroundColor: `${customSolution.acf.background_color}`}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-xs-12 text-center mt-5 pt-5">
                            <h4 className="product-title-text mb-3 pl-3 text-white">
                                {customSolution.acf.product_title}
                            </h4>
                            <Link to="/contact" className="yellow-button mt-3">CONTACT US</Link>
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
}

export default ApplicationCard;