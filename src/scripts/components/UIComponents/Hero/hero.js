import React, {Component} from 'react';
import styled from 'styled-components';

class Hero extends Component {
    render() {
		const pageFields = this.props.pageFields;
        const Hero = styled.section`
        background-image: linear-gradient(to bottom, rgba(0, 8, 25, 0.5), rgba(0, 8, 25, 1.1)), url(${pageFields.heroImage});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        min-height: ${pageFields.heroMinHeight};
        object-fit: cover;
        z-index: -1;
        }
        p {
          font: 18px/2 'Open Sans', sans-serif;
        }
        .white {
            color: #fff;
        }
        @media screen and (max-width: 48.4375rem) {
          .container {
            padding: 80px 0;
          }
        }
        @media screen and (max-width: 768px) {
         
        }
      `;
        
		return (
			<Hero>
				<div className="jumbotron jumbotron-fluid mb-0 hero-wrapper">
					<div className="container">
						<h1 className="hero-header-text">{pageFields.heroTitle}</h1>
            <hr className="hero-title-underline"></hr>
            <div className="row hero-center-text mt-5">
                <span className="hero-sub-title-text" dangerouslySetInnerHTML={{ __html: pageFields.heroSubTitle}} />
            </div>
					</div>
				</div>
			</Hero>
        );
    }
}

export default Hero;