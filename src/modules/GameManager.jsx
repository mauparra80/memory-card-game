import React, {useState, useEffect} from "react";

import { generateRandomCollection } from "./pokemonAPI";
import { CardsContainer } from "./CardsContainer";

class Game {
  constructor(cardset) {
    this.currentScore = 0;
    this.highScore = 0; //TODO: load this in
    this.gameWin = false;
    this.gameLose = false;
    this.cardSet = []; //TODO: Load new card set
    this.chosenCards = [];

    function setCardSet(newSet) {
      this.cardSet = newSet;
    }
  }
}
const game = new Game;

function GameManager({addScore}) {
  const [chosenIds, setChosenIds] = useState([]);

  //called when card is clicked. checks if its right or wrong
  function handleCardChosen(chosenId) {
    if (chosenIds.includes(chosenId)) {
      //set game over
      console.log("game over!!")
    } else {
      //add card to chosenIds
      setChosenIds((previousIds) => ([...previousIds, chosenId]));
      addScore();
    }
  }

  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  //loading until pokemonData is fetched
  useEffect(() => {
    console.log("check2");
    const fetchData = async () => {
      try {
        //call api and wait
        const data = await generateRandomCollection(20, 1, 150);
        setPokemonData(data);
      } catch (error) {
        console.error('API Error')
      } finally {

        setisLoading(false);
      }
    };
    fetchData(); //invoke function. could be how we handle async functions inside components
  }, []); //empty, runs once when component mounts


  return (
    <div>
      {isLoading? (
        <h1>Loading Game....</h1>
      ) : (
        <CardsContainer pokemonData={pokemonData} handleCardChosen={handleCardChosen} />
      )}
    </div>
  )
}

export {GameManager};