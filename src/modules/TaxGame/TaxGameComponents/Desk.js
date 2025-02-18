import React, { useRef, useState, useLayoutEffect } from "react";
import MoveablePaper from './MoveablePaper'

const Desk = () => {
    const deskRef = useRef(null);
    const [deskBounds, setDeskBounds] = useState({ width: 0, height: 0 });
    

    //this gets and adjusts the dimensions of the usable area
    useLayoutEffect(() => {
        const updateBounds = () => {
        if (deskRef.current) {
            const { width, height, left, top } = deskRef.current.getBoundingClientRect();
            setDeskBounds({ width, height, left, top });
        }
        };

        updateBounds(); // Get initial size

        window.addEventListener("resize", updateBounds);
        return () => window.removeEventListener("resize", updateBounds);
    }, []);

  //will get from database
  const papers = [
    [10, 25, 500, 200, "green"],
    [50, 200, 600, 300, "red"],
    [60, 150, 300, 400, "orange"],
    [100, 100, 400, 300, "yellow"],
    [80, 50, 200, 400, "blue"]
  ];

  //initialize index stack for moveable papers
  let newStack = [];
  for (let i in papers) {
    newStack.push(i);
  }
  
  //create index stack for moveable papers
  const [paperStack, setPaperStack] = useState(newStack);

  //function to make last clicked movable paper be rendered last (on top)
  const bringToFront = (index) => {
    setPaperStack((prevStack) => [
      ...prevStack.filter((i) => i !== index), // Remove clicked paper
      index, // Add it to the end (making it render on top)
    ]);
  };

    return (
        <div
            className="Paper-Container"
            ref={deskRef}
            id="desk"
        >
            {/*Render all movable papers by order that they appear in the stack*/}
            {paperStack.map((index) => {
                const [x, y, width, height, bg] = papers[index];
                return (
                    <MoveablePaper
                        deskRef={deskRef}
                        bounds={deskBounds}
                        key={index}
                        xPosition={x + Math.random()*50}
                        yPosition={y + Math.random()*50}
                        width={width}
                        height={height}
                        bg={bg}
                        clickFunc={() => bringToFront(index)}
                    />    
                );
            })}
        </div>
    );
};

export default Desk;
