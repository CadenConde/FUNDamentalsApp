import React from "react";

const PreScreen = (props) => {
	return (
		<div className="Pre-Screen">
			<h1>Welcome to Tax Fundamentals (name pending)</h1>
			<button onClick={() => props.goToGame()}>go to game</button>
		</div>
	);
};

export default PreScreen;
