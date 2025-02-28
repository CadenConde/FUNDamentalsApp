import React from "react";
import { useState, useRef, useEffect } from "react";

//temporary, remove when assets are replaced
import { IoMdPerson } from "react-icons/io";
// import { FaChildren } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";

const Folder = (props) => {
	const [activeTab, setActiveTab] = useState(1);

	const [ssn, setSSN] = useState("");
	const [name, setName] = useState("");
	const [filingStatus, setFilingStatus] = useState("single");
	const [spouseName, setSpouseName] = useState("");
	const [spouseSSN, setSpouseSSN] = useState("");
	const [deductionType, setDeductionType] = useState("standard");
	const [deductionAmount, setDeductionAmount] = useState("");
	const [income, setIncome] = useState("");
	// const [dependents, setDependents] = useState("");
	const [taxWithheld, setTaxWithheld] = useState("");

	const folderRef = useRef(null);

	const [isFormValid, setIsFormValid] = useState(false);

	// Validate form whenever relevant fields change
	useEffect(() => {
		const requiredFields = [
			ssn,
			name,
			income,
			taxWithheld,
			...(filingStatus === "married" ? [spouseName, spouseSSN] : []),
			...(deductionType === "itemized" ? [deductionAmount] : []),
		];

		setIsFormValid(requiredFields.every((field) => field.trim() !== ""));
	}, [
		ssn,
		name,
		spouseName,
		spouseSSN,
		income,
		deductionAmount,
		taxWithheld,
		filingStatus,
		deductionType,
	]);

	function clearForm() {
		setSSN("");
		setName("");
		setFilingStatus("single");
		setSpouseName("");
		setSpouseSSN("");
		setDeductionType("standard");
		setDeductionAmount("");
		setIncome("");
		setTaxWithheld("");
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if (folderRef.current) {
			folderRef.current.style.transform = "translateX(-50vw)";
			folderRef.current.style.transition = "transform 0.5s ease-in-out"; // Smooth animation

			let info = [
				ssn,
				name,
				filingStatus,
				spouseName,
				spouseSSN,
				deductionType,
				deductionAmount,
				income,
				taxWithheld,
			];

			//send info to parent
			props.onSubmit(info);
		}
	};

	//dont translate back until told
	useEffect(() => {
		console.log("translateBack: " + props.translate);
		if (props.translate === true) {
			clearForm();
			folderRef.current.style.transform = "translateX(0)";
		}
	}, [props.translate]);

	return (
		<div className="folder" id="myFolder" ref={folderRef}>
			{/* Tabs for switching sections */}
			<div className="tab-container">
				<div
					className={`tab ${activeTab === 1 ? "active" : ""}`}
					onClick={() => setActiveTab(1)}>
					<IoMdPerson size={32} />
				</div>

				{/* Testing disabling tabs based on scenario
                <div
                    className={`tab ${props.difficulty < 3 ? "disabled" : ""} ${activeTab === 2 ? "active" : ""}`}
                    onClick={props.difficulty < 3 ? undefined : () => setActiveTab(2)}
                >
                    <FaChildren size={32}/>
                </div> */}

				<div
					className={`tab ${activeTab === 3 ? "active" : ""}`}
					onClick={() => setActiveTab(3)}>
					<FaDollarSign size={32} />
				</div>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="inner-folder">
					<h1> 1040 </h1>
					<h3>
						{activeTab === 1
							? "Personal Info"
							: activeTab === 2
							? "Dependant Info"
							: "Tax Info"}
					</h3>

					{/* Personal/Marriage Info */}
					{activeTab === 1 && (
						<div>
							<div>
								<label>SSN:</label>
								<input
									type="text"
									value={ssn}
									onChange={(e) => setSSN(e.target.value)}
								/>
							</div>

							<div>
								<label>Full Name:</label>
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>

							{/* Filing Status */}
							<div>
								<label>Filing Status:</label>
								<div>
									<label>
										<input
											type="radio"
											value="single"
											checked={filingStatus === "single"}
											onChange={() => setFilingStatus("single")}
										/>
										Single
									</label>

									<label>
										<input
											type="radio"
											value="married"
											checked={filingStatus === "married"}
											onChange={() => setFilingStatus("married")}
										/>
										Married
									</label>
								</div>
							</div>

							{/* Spouse Fields (always present but disabled unless married) */}
							<div>
								<label>Spouse Name:</label>
								<input
									type="text"
									value={spouseName}
									onChange={(e) => setSpouseName(e.target.value)}
									disabled={filingStatus !== "married"}
								/>
							</div>

							<div>
								<label>Spouse SSN:</label>
								<input
									type="text"
									value={spouseSSN}
									onChange={(e) => setSpouseSSN(e.target.value)}
									disabled={filingStatus !== "married"}
								/>
							</div>
						</div>
					)}

					{/* Dependants Info */}
					{/* {activeTab === 2 && (
						<div>
							{/* Dependents /}
							<div>
								<label>Number of Dependents:</label>
								<input
									type="number"
									value={dependents}
									onChange={(e) => setDependents(e.target.value)}
								/>
							</div>
						</div>
					)} */}

					{activeTab === 3 && (
						<div>
							{/* all the * 1 forces a string to be treated like an int */}

							{/* Income */}
							<div>
								<label>Income (household if filing jointly) ($):</label>
								<input
									type="number"
									value={income}
									onChange={(e) => setIncome(e.target.value)}
								/>
							</div>

							{/* Deduction Selection */}
							<div>
								<label>Deduction Type:</label>
								<div>
									<label>
										<input
											type="radio"
											value="standard"
											checked={deductionType === "standard"}
											onChange={() => setDeductionType("standard")}
										/>
										Standard Deduction
									</label>

									<label>
										<input
											type="radio"
											value="itemized"
											checked={deductionType === "itemized"}
											onChange={() => setDeductionType("itemized")}
										/>
										Itemized Deduction
									</label>
								</div>
							</div>

							{/* Itemized Deduction Amount (always present but disabled unless itemized is selected) */}
							<div>
								<label>
									{deductionType === "itemized" ? "Itemized" : "Standard"}{" "}
									Deduction Amount ($):
								</label>
								<input
									type="number"
									value={deductionAmount}
									onChange={(e) => setDeductionAmount(e.target.value)}
								/>
							</div>

							{/* Tax Withheld */}
							<div>
								<label>Withholdings ($):</label>
								<input
									type="number"
									value={taxWithheld}
									onChange={(e) => setTaxWithheld(e.target.value)}
								/>
							</div>
						</div>
					)}
				</div>

				<input
					type="submit"
					className="file-button"
					value="File!"
					disabled={!isFormValid}
				/>
			</form>
		</div>
	);
};

export default Folder;
