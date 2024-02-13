import React, {useState, useEffect, useRef} from "react";

import { generateRandomCollection } from "./pokemonAPI";
import { CardsContainer } from "./CardsContainer";

// class Game {
//   constructor(cardset) {
//     this.currentScore = 0;
//     this.highScore = 0; //TODO: load this in
//     this.gameWin = false;
//     this.gameLose = false;
//     this.cardSet = []; //TODO: Load new card set
//     this.chosenCards = [];

//     function setCardSet(newSet) {
//       this.cardSet = newSet;
//     }
//   }
// }
// const game = new Game;

let isLoading = true;

function GameManager() {
  const [chosenIds, setChosenIds] = useState([]);
  const [pokemonData, setPokemonData] = useState(null);
  // const [isLoading, setisLoading] = useState(true);
  const initialRender = useRef(true);

  const [score, setScore] = useState(0);
  console.log("gameManager setting up")

  //add point to score
  function addScore() {
    setScore((previousScore) => (previousScore + 1))
    console.log("added score");
  }
  

  //called when card is clicked. checks if its right or wrong
  function handleCardChosen(chosenId) {
    console.log("card is clicked");
    if (chosenIds.includes(chosenId)) {
      //set game over
      console.log("game over!!")
    } else {
      //add card to chosenIds
      setChosenIds((previousIds) => ([...previousIds, chosenId]));
      addScore();
    }
  }

  const fetchData = async () => {
    try {
      console.log("pokemonAPI called");
      //call api and wait
      const data = await generateRandomCollection(20, 1, 150);
      setPokemonData(data);
    } catch (error) {
      console.error('API Error')
    } finally {
      isLoading = false;
    }
  };
  
  //loading until pokemonData is fetched
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      fetchData(); //invoke function. could be how we handle async functions inside components
    }
  },[]); //empty, runs once when component mounts


  return (
    <div>
      {isLoading? (
        <h1>Loading Game....</h1>
      ) : (
        <>
        <h1>Score: {score}</h1>
        <CardsContainer 
        pokemonData={pokemonData} 
        handleCardChosen={handleCardChosen} 
        chosenIds={chosenIds}
        />
        </>
      )}
    </div>
  )
}

export {GameManager};