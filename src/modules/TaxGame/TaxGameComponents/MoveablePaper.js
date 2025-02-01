import React, { useState, useEffect } from 'react'
import "../TaxGame.css"


const MoveablePaper = (props) => {
  const [position, setPosition] = useState({ x: props.xPosition, y: props.yPosition });
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

  // Attach mouse move to the entire document so it doesn't stop when leaving the box
  

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
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${props.width}px`,
        height: `${props.height}px`,
        backgroundColor: `${props.bg}`,
        userSelect: "none"
      }}
      className={isDragging || isDraggingTouch ? "add-shadow moveable-paper" : "moveable-paper"}
    >
      Drag Me
    </div>
  );
  
}

export default MoveablePaper