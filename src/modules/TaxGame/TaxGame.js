import React, { useActionState } from "react";
import "./TaxGame.css";
import Desk from "./TaxGameComponents/Desk";
import Folder from "./TaxGameComponents/Folder";
import PreScreen from "./TaxGameComponents/PreScreen";
import { useState, useEffect } from "react";
import Summary from "./TaxGameComponents/Summary";

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

	//calculate correct answer
	let answers = [];
	for (let i in scenes) {
		//answer = [name, ssn, sname or "", sssn or "", income, deduction amount, withholdings]
		let answer = [];

		// name/ssn
		answer.push(scenes[i][1]);
		answer.push(scenes[i][2]);

		//spouse
		if (scenes[i][0] >= 1) {
			answer.push(scenes[i][5]);
			answer.push(scenes[i][6]);
		} else {
			answer.push("");
			answer.push("");
		}

		//income
		if (scenes[i][0] >= 1) {
			answer.push(scenes[i][3]);
		} else {
			answer.push(scenes[i][3] + scenes[i][7]);
		}

		//withholdings
		if (scenes[i][0] >= 1) {
			answer.push(scenes[i][4]);
		} else {
			answer.push(scenes[i][4] + scenes[i][8]);
		}

		answers.push(answer);
	}

	const papers = [];
	//[ [doctype, # of content lines, content, content2, ....], [color, ....]]
	for (let i in scenes) {
		//"paper" stores all the papers for one scene, "papers" stores the scenes
		let paper = [];
		//defaults
		paper.push(["Social-Sec-Card", scenes[i][2], scenes[i][1]]);
		paper.push(["Drivers-License", scenes[i][1]]);
		paper.push([
			"W-2",
			scenes[i][1],
			"Yearly Income: $" + scenes[i][3],
			" Yearly Withholdings: $" + scenes[i][3],
		]);
		//add spouse info
		if (scenes[i][0] >= 1) {
			paper.push(["Social-Sec-Card", scenes[i][6], scenes[i][5]]);
			paper.push(["Drivers-License", scenes[i][5]]);
			paper.push([
				"W-2",
				scenes[i][5],
				"Yearly Income: $" + scenes[i][7],
				" Yearly Withholdings: $" + scenes[i][8],
			]);
		}
		//add receipt
		if (scenes[i][0] >= 2) {
			let myReceipt = [];
			myReceipt.push("Receipt");
			for (let j = 0; j < scenes[i][9].length / 3; j++) {
				myReceipt.push(scenes[i][9][j * 3] + " - $" + scenes[i][9][j * 3 + 1]);
			}
			paper.push(myReceipt);
		}
		papers.push(paper);
	}

	const [inGame, setInGame] = useState(false);
	const [scenario, setScenario] = useState(0);
	const [diff, setDiff] = useState(scenes[scenario][0]);
	const [addSummary, setAddSummary] = useState(false);
	const [info, setInfo] = useState("");
	const [translateBack, setTranslateBack] = useState(false);

	const onPlayGame = () => {
		setInGame(true);
	};

	//update scenario
	useEffect(() => {
		if (scenario < scenes.length) {
			setDiff(scenes[scenario][0]);
		}
	}, [scenario]);

	// On Submit Logic
	const onSubmitFile = (submittedInfo) => {
		// info = [ssn,name,filingStatus,spouseName,spouseSSN,deductionType,deductionAmount,income,taxWithheld]
		setInfo(submittedInfo);
		setAddSummary(true);
	};

	//update scenario
	useEffect(() => {
		if (addSummary === false && info != "") {
			setTranslateBack(true);
			setTimeout(() => setTranslateBack(false), 50);
			console.log("translateBack updated");
			if (scenario < scenes.length - 1) {
				setScenario(scenario + 1);
			} else {
				alert("you win!");
			}
		}
	}, [addSummary, info]);

	return (
		<div className="Tax-Game-Container">
			{inGame === false ? <PreScreen goToGame={onPlayGame} /> : ""}

			{addSummary === true ? (
				<Summary
					submittedInfo={info}
					answer={answers[scenario]}
					removeFunc={setAddSummary}
				/>
			) : (
				""
			)}

			{/* temporary debugging tool */}
			<div>
				<label>Scenario: (Current = {scenario})</label>
			</div>
			{/* end debugger */}

			{/* Input form logic */}
			<Folder
				difficulty={diff}
				onSubmit={onSubmitFile}
				translate={translateBack}
			/>

			<div className="desk">
				{/* contains movable papers */}
				<Desk difficulty={diff} papers={papers[scenario]} />
			</div>
		</div>
	);
};

export default TaxGame;
