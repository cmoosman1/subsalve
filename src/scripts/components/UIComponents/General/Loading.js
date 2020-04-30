import React from 'react';

function Loading() {
    return (
        <div className="container">
			<div className="row text-center">
				<div className="col loading-icon" style={{marginTop: '35%'}}>
					<img className="loading-img" src="https://subsalvedev.wpengine.com/wp-content/uploads/2019/07/subsalve-only-badge-rgb.png"  alt="Spinner"/>
					<div className="pulse-ring"></div>
				</div>
			</div>
		</div>
    )
}

export default Loading;

