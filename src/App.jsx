import React, { useState, useEffect } from 'react'
import './App.css'
import { generateRandomCollection } from './modules/pokemonAPI'
import { CardsContainer } from './modules/CardsContainer';
import { GameManager } from './modules/GameManager';

function App() {
  const [score, setScore] = useState(0);

  //add point to score
  function addScore() {
    setScore((previousScore) => (previousScore + 1))
    console.log("added score");
  }

  return (
      
      <div className="container">
        
        <div className="header">
          <h1>Poke Memory Game</h1>
          <h3>score: {score}</h3>
          <h3>high score:</h3>
        </div>
        <div className="body-container">
          <GameManager 
          addScore={addScore}
          />
          <div className="tutorialBar">
            <h4>Try to pick all 100 gen 1 pokemon without picking the same one twice!</h4>
          </div>
          <div className="card-container">
            <div className="card">Card1</div>
            <div className="card">Card2</div>
          </div>
        </div>
        <div className="footer">Footer Stuff</div>
      </div>
  )
}

export default App
