import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import MoveablePaper from "./MoveablePaper";

const Desk = (props) => {
	const deskRef = useRef(null);
	const [deskBounds, setDeskBounds] = useState({ width: 0, height: 0 });

	//this gets and adjusts the dimensions of the usable area
	useLayoutEffect(() => {
		const updateBounds = () => {
			if (deskRef.current) {
				const { width, height, left, top } =
					deskRef.current.getBoundingClientRect();
				setDeskBounds({ width, height, left, top });
			}
		};

		updateBounds(); // Get initial size

		window.addEventListener("resize", updateBounds);
		return () => window.removeEventListener("resize", updateBounds);
	}, []);

	//initialize index stack for moveable papers
	let newStack = [];
	const [paperStack, setPaperStack] = useState(newStack);

	useEffect(() => {
		// console.log(props.papers);
		newStack = [];
		for (let i in props.papers) {
			newStack.push(i);
		}
		setPaperStack(newStack);
	}, [props.papers]); // <- add empty brackets here

	//function to make last clicked movable paper be rendered last (on top)
	const bringToFront = (index) => {
		setPaperStack((prevStack) => [
			...prevStack.filter((i) => i !== index), // Remove clicked paper
			index, // Add it to the end (making it render on top)
		]);
	};

	return (
		<div className="Paper-Container" ref={deskRef} id="desk">
			{/*Render all movable papers by order that they appear in the stack*/}
			{paperStack.map((index) => {
				const [doctype, content1, content2, content3] = props.papers[index];

				return (
					<MoveablePaper
						deskRef={deskRef}
						bounds={deskBounds}
						key={index}
						xPosition={200 + Math.random() * 100}
						yPosition={100 + Math.random() * 100}
						doctype={doctype}
						clickFunc={() => bringToFront(index)}>
						<h2>{doctype}</h2>
						<p>{content1}</p>
						<p>{content2}</p>
						<p>{content3}</p>
					</MoveablePaper>
				);
			})}
		</div>
	);
};

export default Desk;
