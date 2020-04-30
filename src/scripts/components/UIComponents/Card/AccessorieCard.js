import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import './AccessoriesCard.scss';

function AccessorieCard({fields, pageView, title}) {
    return (
        <div className="col" style={{maxWidth: '260px', marginRight: '15px', marginBottom: '50px' }}>
            <div className="row">
                {pageView && 
                
                    <div className="col" style={{paddingLeft: '0'}}>
                        <img className="accessories-image-wrapper" src={fields.acf.image.url} alt="accessories"  alt="Icon"/>
                    </div>
                }
                {!pageView &&
                <Link to={`/${fields.acf.link_url.post_name}`}>
                    <div className="col" style={{paddingLeft: '0'}}>
                        <img className="accessories-image-wrapper" src={fields.acf.image.url} alt="accessories"  alt="Icon"/>
                    </div>
                </Link>
                }
            </div>
            <div className="row" style={{maxWidth: '260px'}}>
                <div className="col accessories-link">
                    <h4 className="accessorie-title-text mt-3">
                        {fields.acf.type}
                    </h4>
                    {!title &&
                        <Link to={`/${fields.acf.link_url.post_name}`}>SEE MORE</Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default AccessorieCard;