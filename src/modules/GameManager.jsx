import React, {useState, useEffect, useRef} from "react";

import { generateRandomCollection } from "./pokemonAPI";
import { CardsContainer } from "./CardsContainer";
import { shufflePokemonSet } from "./Util";

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
  const [chosenIds, setChosenIds] = useState([]); //change every click unless loss
  const [pokemonData, setPokemonData] = useState([]); //no change after first
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const initialRender = useRef(true);
  const [score, setScore] = useState(0); 
  const [flipped, setFlipped] = useState(false);

  console.log("gameManager setting up")
  console.log("current selectedPokemon are ", selectedPokemon);

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
      setSelectedPokemon(selectPokemon(pokemonData, chosenIds));
      setFlipped((previousFlipped) => !previousFlipped)
      addScore();
    }
  }

  const fetchData = async () => {
    try {
      console.log("pokemonAPI called");
      //call api and wait
      const data = await generateRandomCollection(20, 1, 150);
      setPokemonData(data);
      setSelectedPokemon(selectPokemon(data, []));
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
        handleCardChosen={handleCardChosen} 
        selectedPokemon={selectedPokemon}
        flipped={flipped}
        />
        </>
      )}
    </div>
  )
}

export {GameManager};

function selectPokemon(pokemonData, chosenIds) {
  //shuffle set and select 5
  const shuffledSet = shufflePokemonSet(pokemonData);
  let selectedPokemon = shuffledSet.slice(0,5);
  //add 1 more unchosen 
  for (const pokemon of pokemonData) {
    if (!chosenIds.includes(pokemon.id) && !selectedPokemon.some((p) => p.id === pokemon.id)) {
      selectedPokemon.push(pokemon);
      break;
    }
  }
  selectedPokemon = shufflePokemonSet(selectedPokemon);

  console.log("selectedPokemon returning from the selectPokemon function are: ", selectedPokemon);
  return selectedPokemon;
}