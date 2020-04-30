import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import './CovidBanner.scss'

function CovidBanner({onClick}) {

    return (
        <div className="covid-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col p-3">
                        <h5 style={{fontSize: '1rem'}}>COVID-19 ALERT</h5>
                        <i onClick={onClick} className="far fa-times-circle covid-close"></i>
                        <div className="covid-text">
                        Subsalve USA and its <a href="https://performanceinflatables.com/" style={{color: '#fff200'}} target="_blank">Performance Inflatables</a> affiliate <a href="https://aef-performance.com" style={{color: '#fff200'}} target="_blank">AEF</a> are engaged in the fight against Covid-19. While continuing to supply our existing customers with essential products, in a matter of weeks we have developed high impact new products to supplement our existing products used in a variety of emergencies and national disasters.
In partnership with leading Universities, Research Hospitals and Tech companies we are supporting the development of clinical protocols to aid in the rapid deployment of the Subsalve Oxygen Treatment Hoods.
Please see our <Link to="/covid-19" style={{color: '#fff200'}}>Covid-19 products page</Link> for more information.
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default CovidBanner;