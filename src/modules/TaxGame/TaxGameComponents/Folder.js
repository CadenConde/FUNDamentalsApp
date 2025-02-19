import React from 'react'
import { useState, useRef } from 'react';

const Folder = () => {
    const [ssn, setSSN] = useState("");
    const [name, setName] = useState("");   
    const [filingStatus, setFilingStatus] = useState("single");
    const [spouseName, setSpouseName] = useState("");
    const [spouseSSN, setSpouseSSN] = useState("");
    const [deductionType, setDeductionType] = useState("standard");
    const [deductionAmount, setDeductionAmount] = useState("");
    const [income, setIncome] = useState("");
    // dependants will be added later
    // const [dependents, setDependents] = useState(""); 
    const [taxWithheld, setTaxWithheld] = useState("");
    
    const folderRef = useRef(null);

    function clearForm(){ 
        setSSN("")
        setName("")
        setFilingStatus("single")
        setSpouseName("")
        setSpouseSSN("")
        setDeductionType("standard")
        setDeductionAmount("")
        setIncome("")
        setTaxWithheld("")
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        // alert(`The name you entered was: ${name}`)
        if (folderRef.current) {
            folderRef.current.style.transform = "translateX(-50vw)";
            folderRef.current.style.transition = "transform 0.5s ease-in-out"; // Smooth animation

            alert(
                "SSN:" + ssn + "\n" +
                "Name:" + name + "\n" +
                "Status:" + filingStatus + "\n" +
                "Spouse Name:" + spouseName + "\n" +
                "Spouse SSN:" + spouseSSN + "\n" +
                "Duduction Type:" + deductionType + "\n" +
                "Deduction:" + deductionAmount + "\n" +
                "Income:" + income + "\n" +
                "Withholding:" + taxWithheld + "\n"
            );


            setTimeout(() => {
                clearForm()
                folderRef.current.style.transform = "translateX(0)";
            }, 1000);
        }
    }

    return (
        <div className='folder' id="myFolder" ref={folderRef}>
            <form onSubmit={handleSubmit}>
                <div className='inner-folder'>
                    <h1> 1040 </h1>
                    <div>
                        <label>SSN:</label>
                        <input type="text" value={ssn} onChange={(e) => setSSN(e.target.value)} />
                    </div>

                    <div>
                        <label>Full Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
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

                    {/* Spouse Fields (only if married) */}
                    {filingStatus === "married" && (
                    <>
                        <div>
                        <label>Spouse Name:</label>
                        <input type="text" value={spouseName} onChange={(e) => setSpouseName(e.target.value)} />
                        </div>

                        <div>
                        <label>Spouse SSN:</label>
                        <input type="text" value={spouseSSN} onChange={(e) => setSpouseSSN(e.target.value)} />
                        </div>
                    </>
                    )}

                    {/* Income */}
                    <div>
                    <label>Income ($):</label>
                    <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
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

                    {/* Itemized Deduction Amount (only if itemized is selected) */}
                    {deductionType === "itemized" && (
                    <div>
                        <label>Itemized Deduction Amount ($):</label>
                        <input type="number" value={deductionAmount} onChange={(e) => setDeductionAmount(e.target.value)} />
                    </div>
                    )}

                    {/* Dependents (to be added later)
                    <div>
                        <label>Number of Dependents:</label>
                        <input type="number" value={dependents} onChange={(e) => setDependents(e.target.value)} />
                    </div> */}

                    {/* Tax Withheld */}
                    <div>
                        <label>Tax Withheld ($):</label>
                        <input type="number" value={taxWithheld} onChange={(e) => setTaxWithheld(e.target.value)} />
                    </div>                  
                </div>
                <input type="submit" className="file-button" value="File!"/>
            </form>
        </div>
    )
}

export default Folder