import React from 'react';


function CatalogCTA({fields}) {
    return (
        <div className="catalog-cta-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 pt-5 ipad-cta-spacer" style={{paddingLeft: '0'}}>
                        <h4 className="catalog-cta-text pb-5">
                            {fields.catalogTitle}
                        </h4>
                        <a href={fields.catalogLinkURL} className="base-yellow-button mt-5" role="button" target="_blank">{fields.catalogLinkText}</a>
                    </div>
                    <div className="col-md-6 pl-5 cta-text-wrapper">
                        <img className="cta-catalog-img" src={fields.catalogImage} alt="CatalogImage"/>
                        <div className="cta-catalog-half-circle top"></div>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default CatalogCTA;