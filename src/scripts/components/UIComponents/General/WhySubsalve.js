import React from 'react';
import {Link} from 'react-router-dom';
import './WhySubsalve.scss';

function WhySubsalve({fields}) {
    return (
        <div>
            <div className="row align-items-center justify-content-center">
                {fields.map((card) => {
                    return(
                        <div className="col-md-6 text-center"> 
                            <p dangerouslySetInnerHTML={{ __html: card.section_icon}}/>
                            <p className="why-titles mb-3">{card.section_header}</p>
                            <p className="why-content mb-5 pr-5 pl-5" dangerouslySetInnerHTML={{ __html: card.section_content}}/>
                        </div>
                    )
                })}
            </div> 
        </div>
    );
}
export default WhySubsalve;