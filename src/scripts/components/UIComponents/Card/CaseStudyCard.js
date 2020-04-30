import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';


function CaseStudyCard({fields})  {   
   
        return (
            <div className="card mr-3 mb-3" style={{width: '22rem', backgroundColor: '#001641', borderRadius: 'none', border: 'none;'}}>
                <img className="card-img-top" src={fields.acf.card_image} alt="Card image cap" style={{maxHeight: '233px', minHeight: '233px'}}/>
                <div className="card-body">
                    <h5 className="card-title" style={{color: '#ffffff', fontSize: '32px'}}>
                        {fields.acf.case_study_title}
                    </h5>
                    <hr className="case-study-hr" style={{border: 'solid 1px #ededed', width: '100%'}}/>
                    <p className="card-text" style={{color: '#ffffff', fontSize: '12px', textTransform: 'upper-case'}}>{fields.acf.case_study_subheader}</p>
                    <p style={{color: '#ffffff', fontSize: '14px'}}>{fields.acf.case_study_copy}</p>
                    <div className="btn-wrapper">
                        <Link to={`/${fields.acf.card_url.post_name}`} className="btn subsalve-case-study-button">{fields.acf.case_study_link_text}</Link>
                    </div>
                </div>
            </div>
        );
   
}

export default CaseStudyCard;