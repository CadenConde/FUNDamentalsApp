import React, { useState, useEffect } from 'react'
import "../TaxGame.css"


const MoveablePaper = (props) => {
  const [position, setPosition] = useState({ x: props.xPosition, y: props.yPosition });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    // Update position based on global mouse position
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Attach mouse move to the entire document so it doesn't stop when leaving the box
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

  return (
    <div
      onMouseDown={(event) => {
        handleMouseDown(event);
        if (props.clickFunc) props.clickFunc(event);
      }}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${props.width}px`,
        height: `${props.height}px`,
        backgroundColor: `${props.bg}`,
        userSelect: "none"
      }}
      className={isDragging ? "add-shadow moveable-paper" : "moveable-paper"}
    >
      Drag Me
    </div>
  );
  
}

export default MoveablePaper