import React, {Component} from 'react';
import styled from 'styled-components';

class Card extends Component {
    render() {
		const componentFields = this.props.componentFields;
		const pageFields = this.props.pageFields;

		const Card = styled.div`
			top: 0;
			transition: top ease 0.3s;
			
			:hover {
				box-shadow: 0 .5rem 1rem rgba(0,0,0,.15) !important;
				top: -10px;
			}	
		`;

		const CardSideways = styled.div`
			top: 0;
			transition: top ease 0.3s;
			
			:hover {
				box-shadow: 0 .5rem 1rem rgba(0,0,0,.15) !important;
				top: -10px;
			}	
		`;

		const alignment = pageFields.alignment !== "default" ? pageFields.alignment : componentFields.alignment;

		const myarray = pageFields.details;

		if(pageFields.cardStyle == "vertical") {
			return (
				<div className="row my-5 card-deck">
					{myarray.map((step, i) => {
						return (
							<Card className={"card shadow-sm position-relative mb-4 text-"+alignment} key={i}>
								<img src={step.image} className="w-100" alt="Placeholder image"/>
								<div className="card-body">
									<h5 className="card-title">{step.title}</h5>
									<h5 className="card-subtitle text-muted">{step.subtitle}</h5>
									<p className="card-text">{step.copy}</p>
									<a href={step.button_url} className="btn btn-primary">{step.button_title}</a>
									{/* <br /> */}
									{/* <a href="#" className="card-link">Profile</a> */}
								</div>
							</Card>
						)
					})}
				</div>
			);
		} else if(pageFields.cardStyle == "sideways") {
			return (
				<div className="row my-5 card-deck">
					{myarray.map((step) => {
						return (
							<CardSideways className="card flex-md-row mb-4 shadow-sm h-md-250">
								<div className="card-body d-flex flex-column align-items-start">
									<strong className="d-inline-block mb-2">{step.aboveTitle}</strong>
									<h3 className="mb-0">
										{step.title}
										{/* <a className="text-dark" href="#">{step.title}</a> */}
									</h3>
									<div className="mb-1 text-muted">{step.subtitle}</div>
									<p className="card-text mb-auto">{step.copy}</p>
									<a href={step.buttonURL}>{step.buttonTitle}</a>
								</div>
								<img src={step.image} className="w-100" alt="Placeholder image" alt="Icon"/>
							</CardSideways>
						)
					})}
				</div>
			);
		}
    }
}

export default Card;

