import React from 'react'
import { useState } from 'react'
import './TaxGame.css'
import MoveablePaper  from './TaxGameComponents/MoveablePaper'


const TaxGame = () => {

  //will get from database
  const papers = [
    [400, 200, 500, 500, "green"],
    [600, 400, 600, 300, "red"],
    [200, 200, 300, 400, "orange"],
    [500, 500, 400, 500, "yellow"],
    [300, 100, 200, 400, "blue"]
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
    <div className="Tax-Game-Container">

      {/*Render all movable papers by order that they appear in the stack*/}
      {paperStack.map((index) => {
        const [x, y, width, height, bg] = papers[index];
        return (
          <MoveablePaper
            key={index}
            xPosition={x}
            yPosition={y}
            width={width}
            height={height}
            bg={bg}
            clickFunc={() => bringToFront(index)}
          />
        );
      })}
      
    </div>
  );
}

export default TaxGame