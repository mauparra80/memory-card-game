import React, { useState, useEffect } from 'react'
import './App.css'
import { generateRandomCollection } from './modules/pokemonAPI'
import { CardsContainer } from './modules/CardsContainer';
import { GameManager } from './modules/GameManager';
import Logo from "./assets/Poke-Memory-Game_logo.png"

/*TODO
- on lose - show loss screen, reset points, reset chosen, set highschore?
- on win - show win screen, choose restart or (increase difficulty)
- on load - show animation
- Pretty UI
*/

function App() {
  return (
      
      <div className="container">
        <div className="header">
          <img src={Logo} alt="Pokemon Memory Game Logo" />
        </div>
        <div className="body-container">
          <GameManager />
          <div className="tutorialBar">
            <h4>Try to pick 20 random gen 1 pokemon without picking the same one twice!</h4>
          </div>
        </div>
        <div className="footer">Footer Stuff</div>
      </div>
  )
}
export default App
