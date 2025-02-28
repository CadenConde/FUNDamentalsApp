import React from "react";

const PreScreen = (props) => {
	return (
		<div className="Pre-Screen">
			<h1>Welcome to Too Many Taxes! (name pending)</h1>
			<button onClick={() => props.goToGame()}>go to game</button>
		</div>
	);
};

export default PreScreen;
