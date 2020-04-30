import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import './ProductCard.scss'


function ProductCard({fields})  {   
    let cardURL = fields.acf.card_url.post_name;
    if(!cardURL){
        cardURL = '/';
    } 
    if(fields.slug === 'quikwalls' || 
        fields.slug === 'oasis-ldu' || 
        fields.slug === 'auxiliary-power-unit-kit'){
        return (
            <div>
                <a href='https://aef-performance.com' target='_blank'>
                    <div className="card mr-1 card-wrapper mb-5">
                        <p className="card-img-top mt-3"
                            dangerouslySetInnerHTML={{ __html: fields.acf.product_icon }}
                        />
                        {console.log(fields.acf.card_url.post_name)}
                        <div className="card-body">
                            <h5 className="mt-auto card-title">
                                {fields.acf.product_title}
                            </h5>
                            <p className="mt-auto card-content">
                                SEE PRODUCT DETAIL
                            </p>
                        </div>
                    </div>
                </a>
            </div>
        );
    }
    else{
            return (
                <Link to={cardURL}>
                    <div className="card mr-1 card-wrapper mb-5">
                        <p className="card-img-top mt-3" 
                            dangerouslySetInnerHTML={{ __html: fields.acf.product_icon}}    
                        />
                        <div className="card-body">
                            <h5 className="mt-auto card-title">
                                {fields.acf.product_title}
                            </h5>
                            <p className="mt-auto card-content">
                                {fields.acf.product_link}
                            </p>
                        </div>
                    </div>
                </Link>
            );
        }
    }
export default ProductCard;