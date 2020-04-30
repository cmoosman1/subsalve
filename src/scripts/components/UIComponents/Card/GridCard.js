import React from 'react';
import {Link} from 'react-router-dom';
import './grid.scss';

function GridCard({fields}) {
  
    return ( 
        <div className="masonry-wrapper mobile-grid">
            <div className="masonry-container">
                <div className="top-section">
                    {fields.slice(0, 6).map((image, i) => {
                        return(
                            <img key={i} className={`grid-item grid-item-${i} img-${i}`} src={image.image}  alt="Grid Image"/>
                        )
                    })}
                </div>
                <div className="bottom-section">
                    {fields.slice(6, 12).map((image, i) => {
                        return(
                            <img key={i} className={`grid-item grid-bottom-item-${i} img-${i}`} src={image.image} alt="Grid Image"/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default GridCard;