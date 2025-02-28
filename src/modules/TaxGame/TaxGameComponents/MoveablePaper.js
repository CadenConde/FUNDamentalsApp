import React, { useState, useEffect } from "react";
import "../TaxGame.css";

const MoveablePaper = (props) => {
	//furthest papers can go left/right and up/down
	//(as a proportion of bounding box)
	const maxX = 0.95;
	const maxY = 0.9;

	const [position, setPosition] = useState({
		x: props.xPosition,
		y: props.yPosition,
	});
	const [isDragging, setIsDragging] = useState(false);
	const [isDraggingTouch, setIsDraggingTouch] = useState(false);
	const [startPos, setStartPos] = useState({ x: 0, y: 0 });

	//web-------------------------------------
	const handleMouseDown = (e) => {
		if (!isDraggingTouch) {
			setIsDragging(true);
			setStartPos({
				x: e.clientX - position.x,
				y: e.clientY - position.y,
			});
		}
	};

	const handleMouseMove = (e) => {
		if (!isDraggingTouch && !isDragging) return;
		setPosition({
			x: e.clientX - startPos.x,
			y: e.clientY - startPos.y,
		});
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	useEffect(() => {
		if (isDragging) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
			return () => {
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
			};
		}
	}, [isDragging]);
	// end web-------------

	// //mobile----------------------------------
	const handleTouchDown = (e) => {
		setIsDraggingTouch(true);
		setStartPos({
			x: e.touches[0].clientX - position.x,
			y: e.touches[0].clientY - position.y,
		});
		e.touches = [];
	};

	const handleTouchMove = (e) => {
		if (!isDraggingTouch && !isDragging) return;
		setPosition({
			x: e.touches[0].clientX - startPos.x,
			y: e.touches[0].clientY - startPos.y,
		});
		e.touches = [];
	};

	const handleTouchUp = () => {
		setIsDraggingTouch(false);
	};

	useEffect(() => {
		if (isDraggingTouch) {
			document.addEventListener("touchmove", handleTouchMove);
			document.addEventListener("touchend", handleTouchUp);
			return () => {
				document.removeEventListener("touchmove", handleTouchMove);
				document.removeEventListener("touchend", handleTouchUp);
			};
		}
	}, [isDraggingTouch]);
	//end mobile-------------

	//this clamps position to avoid weird interactions
	useEffect(() => {
		//this prevents being clamped before bounds are found
		if (props.bounds.width > 0 && props.bounds.height > 0) {
			//clamp to max
			if (
				props.bounds.width * maxX < position.x ||
				props.bounds.height * maxY < position.y
			) {
				setPosition({
					x:
						props.bounds.width * maxX < position.x
							? props.bounds.width * (maxX - 0.01)
							: position.x,
					y:
						props.bounds.height * maxY < position.y
							? props.bounds.height * (maxY - 0.01)
							: position.y,
				});
			}
			//clamp to min
			if (0 > position.x || 0 > position.y) {
				setPosition({
					x: 0 > position.x ? 0.01 : position.x,
					y: 0 > position.y ? 0.01 : position.y,
				});
			}
		}
	}, [position, props.bounds.width, props.bounds.height]);

	return (
		<div
			onMouseDown={(event) => {
				handleMouseDown(event);
				if (props.clickFunc) props.clickFunc(event);
			}}
			//mobile compatibility
			onTouchStart={(event) => {
				handleTouchDown(event);
				if (props.clickFunc) props.clickFunc(event);
			}}
			style={{
				// clamp so stays on the table/can't leave the screen
				left: `clamp(0px, ${position.x}px, ${props.bounds.width * maxX}px)`,
				top: `clamp(0px, ${position.y}px, ${props.bounds.height * maxY}px)`,
				width: `${props.width}px`,
				height: `${props.height}px`,
				userSelect: "none",
			}}
			className={
				isDragging || isDraggingTouch
					? "add-shadow moveable-paper" + " " + props.doctype
					: "moveable-paper" + " " + props.doctype
			}>
			{props.children}
		</div>
	);
};

export default MoveablePaper;
