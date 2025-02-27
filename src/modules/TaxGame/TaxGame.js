import React from "react";
import "./TaxGame.css";
import Desk from "./TaxGameComponents/Desk";
import Folder from "./TaxGameComponents/Folder";
import PreScreen from "./TaxGameComponents/PreScreen";
import { useState, useEffect } from "react";

// Difficulty (controls which content is shown)
/* 
Key:
0: no-spouse
1: spouse
2: itemized expenses
*/

const TaxGame = () => {
	// scenario logic
	let scenes = [
		//[difficulty, name, ssn, income, withholdings, S[pouse]name, Sssn, Sincome, Switholdings,[ExpenseName, cost, isDeductable,...]]
		[0, "John Smith", "123-45-6789", 50000, 2000],
		[
			1,
			"Jeff Smith",
			"123-45-6789",
			60000,
			3000,
			"Jenny Smith",
			"123-45-6789",
			90000,
			3000,
		],
		[
			2,
			"Joe Smith",
			"123-45-6789",
			70000,
			4000,
			"J*ssica Smith",
			"123-45-6789",
			60000,
			3000,
			["Hospital Bill", 30000, true],
		],
		[
			3,
			"Jeremy Smith",
			"123-45-6789",
			80000,
			5000,
			"Josephine Smith",
			"123-45-6789",
			60000,
			3000,
			["Cool Vacation", 100000, false],
		],
		[
			4,
			"Josh Smith",
			"123-45-6789",
			90000,
			6000,
			"Jeni Smith",
			"123-45-6789",
			60000,
			3000,
			[
				"Gambling Losses",
				30000,
				true,
				"Donation to Red Cross",
				40000,
				true,
				"Gold-Plated PS5",
				10000,
				false,
			],
		],
	];
	let answers = [
		//
		[],
		[],
		[],
		[],
		[],
	];

	const papers = [];
	//[ [color, doctype, # of content lines, content, content2, ....], [color, ....]]
	for (let i in scenes) {
		let paper = [];
		//defaults
		paper.push(["", "Social-Sec-Card", scenes[i][2], scenes[i][1]]);
		paper.push(["", "Drivers-License", scenes[i][1]]);
		paper.push([
			"",
			"W-2",
			scenes[i][1],
			"Yearly Income:" + scenes[i][3],
			" Yearly Withholdings:" + scenes[i][3],
		]);
		//add spouse info
		if (scenes[i][0] >= 1) {
			paper.push(["", "Social-Sec-Card", scenes[i][6], scenes[i][5]]);
			paper.push(["", "Drivers-License", scenes[i][5]]);
			paper.push([
				"",
				"W-2",
				scenes[i][5],
				"Yearly Income:" + scenes[i][7],
				" Yearly Withholdings:" + scenes[i][8],
			]);
		}
		papers.push(paper);
	}

	const [inGame, setInGame] = useState(false);
	const [scenario, setScenario] = useState(0);
	const [diff, setDiff] = useState(scenes[scenario][0]);
	const [addSummary, setAddSummary] = useState(false);

	const onPlayGame = () => {
		setInGame(true);
	};

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
			{inGame === false ? <PreScreen goToGame={onPlayGame} /> : ""}

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
				<Desk difficulty={diff} papers={papers[scenario]} />
			</div>
		</div>
	);
};

export default TaxGame;
