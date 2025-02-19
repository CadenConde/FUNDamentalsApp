import React from 'react'
import './TaxGame.css'
import Desk from './TaxGameComponents/Desk'
import Folder from './TaxGameComponents/Folder'


const TaxGame = () => {
  return (
    // mostly visual containers
    <div className="Tax-Game-Container">
      <Folder />
      <div className='desk'>
        {/* contains movable papers */}
        <Desk />
      </div>
    </div>
  );
}

export default TaxGame