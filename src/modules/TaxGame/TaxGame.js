import React from "react";
import "./TaxGame.css";
import Desk from "./TaxGameComponents/Desk";
import Folder from "./TaxGameComponents/Folder";
import { useState, useEffect } from "react";

// Difficulty (controls which content is shown)
let initDiff = 4;
/* 
Key:
<3: no dependents
>=3: dependents
*/

const TaxGame = () => {
	// scenario logic
	let scenes = [
		//[difficulty]
		[0],
		[1],
		[2],
		[3],
		[4],
	];

	const [scenario, setScenario] = useState(0);
	const [diff, setDiff] = useState(scenes[scenario][0]);

	//update scenario
	useEffect(() => {
		if (scenario < scenes.length) {
			setDiff(scenes[scenario][0]);
		}
	}, [scenario]);

	//On Submit Logic
	const onSubmitFile = (submittedInfo) => {
		// info = [ssn,name,filingStatus,spouseName,spouseSSN,deductionType,deductionAmount,income,taxWithheld]
		alert(
			"SSN:" +
				submittedInfo[0] +
				"\n" +
				"Name:" +
				submittedInfo[1] +
				"\n" +
				"Status:" +
				submittedInfo[2] +
				"\n" +
				"Spouse Name:" +
				submittedInfo[3] +
				"\n" +
				"Spouse SSN:" +
				submittedInfo[4] +
				"\n" +
				"Duduction Type:" +
				submittedInfo[5] +
				"\n" +
				"Deduction:" +
				submittedInfo[6] +
				"\n" +
				"Income:" +
				submittedInfo[7] +
				"\n" +
				"Withholding:" +
				submittedInfo[8]
		);

		if (scenario < scenes.length - 1) {
			setScenario(scenario + 1);
		} else {
			alert("you win!");
		}
	};

	return (
		<div className="Tax-Game-Container">
			{/* temporary debugging tool */}
			<div>
				<label>
					Set Difficulty: (Current = {diff})
					<input
						type="number"
						value={diff}
						onChange={(e) => setDiff(Number(e.target.value))}
					/>
					Scenario: (Current = {scenario})
				</label>
			</div>
			{/* end debugger */}

			{/* Input form logic */}
			<Folder difficulty={diff} onSubmit={onSubmitFile} />
			<div className="desk">
				{/* contains movable papers */}
				<Desk difficulty={diff} />
			</div>
		</div>
	);
};

export default TaxGame;
