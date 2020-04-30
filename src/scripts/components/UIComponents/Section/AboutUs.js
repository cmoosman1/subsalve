import React from 'react';
import {Link} from 'react-router-dom';


function AboutUs({fields}) {
  
    return (  
        <div className="container">
            <div className="row">
                <span className="about-mission mb-3">OUR MISSION</span>
                <p dangerouslySetInnerHTML={{ __html: fields.content.rendered}}/>
            </div>
        </div>
    )
}
export default AboutUs;