import React from "react";

const Summary = (props) => {
	return (
		<div className="Summary-Container">
			<button onClick={() => props.removeFunc(false)}>Next Scene!</button>
			You got {props.percent}% of the total return!
		</div>
	);
};

export default Summary;
