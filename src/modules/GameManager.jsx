import React, {useState, useEffect, useRef} from "react";
import { generateRandomCollection } from "./pokemonAPI";
import { CardsContainer } from "./CardsContainer";
import { shufflePokemonSet } from "./Util";
import LossScreen from "./LossScreen";
import WinScreen from "./WinScreen";
import LoadingScreen from "./LoadingScreen";

let selectedPokemon = [];

function GameManager() {
  const [chosenIds, setChosenIds] = useState([]); //change every click unless loss
  const [pokemonData, setPokemonData] = useState([]); //no change after first
  const initialRender = useRef(true);
  const [score, setScore] = useState(0); 
  const [gameState, setGameState] = useState("loading");
  const [highScore, setHighScore] = useState(0);
  // const [flipped, setFlipped] = useState(false);

  //add point to score
  function addScore() {
    setScore((previousScore) => (previousScore + 1))
    console.log("added score");
  }

  function restartGame() {
    fetchData();
    setScore(0);
    setChosenIds([]);
  }
  
  //called when card is clicked. checks if its right or wrong
  function handleCardChosen(chosenId) {
    console.log("card is clicked");

    if (chosenIds.includes(chosenId)) {
      //set game over
      console.log("game over!!")
      setGameState("lost");
      return;
    }
    if (score < 19){
      //add card to chosenIds
      setChosenIds((previousIds) => ([...previousIds, chosenId]));
      selectedPokemon = selectPokemon(pokemonData,[...chosenIds,chosenId]);
      // setFlipped((previousFlipped) => !previousFlipped);
      addScore();
      
    } else {
      addScore();
      setGameState("won");
      console.log("you win!");
    }
  }

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score.toString());
    }
  },[score])

  //get pokeAPI data returns (20total, from 1, to 150) random poke
  const fetchData = async () => {
    try {
      console.log("pokemonAPI called");
      const data = await generateRandomCollection(20, 1, 150);
      setPokemonData(data);
      selectedPokemon = selectPokemon(data,[]);
    } catch (error) {
      console.error('API Error')
    } finally {
      setGameState("playing");
    }
  };

  useEffect(() => {
    const storedHighScore = localStorage.getItem('highScore');
    if(storedHighScore) {setHighScore(parseInt(storedHighScore,10));}
  }, []);
  
  //loading until pokemonData is fetched
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      fetchData(); //invoke function. could be how we handle async functions inside components
    }
  },[]); //empty, runs once when component mounts

  // function handleFlipAllCards() {
  //   setFlipped((previousFlipped) => !previousFlipped);
  // }


  return (
    <div>
      <div className="scores-container">
        <h1 className="score">Score: {score}</h1>
        <h1>High Score: {highScore}</h1>
      </div>
      {gameState === 'loading'? (
        <LoadingScreen />
      ) : gameState === 'playing' ? (
        <>
          <CardsContainer  
          handleCardChosen={handleCardChosen} 
          selectedPokemon={selectedPokemon}
          // isFlipped={flipped}
          // handleFlipAllCards={handleFlipAllCards}
          />
        </>
      ) : gameState === 'lost' ? (
        <LossScreen 
        score={score}
        restartGame={restartGame}
        />
      ) : gameState === 'won' && (
        <WinScreen 
        score={score}
        restartGame={restartGame}
        />
      )}
    </div>
  )
}

export {GameManager};

//its one rendition behind. maybe bec its outside
function selectPokemon(pokemonData, chosenIds) {
  //shuffle set and select 5
  const shuffledSet = shufflePokemonSet(pokemonData);
  let selectedPokemon = shuffledSet.slice(0,5);
  //add 1 more unchosen 
  for (const pokemon of pokemonData) {
    if (!chosenIds.includes(pokemon.id) && !selectedPokemon.some((p) => p.id === pokemon.id)) {
      selectedPokemon.push(pokemon);
      console.log("chosen ids so far are: ",chosenIds);
      console.log("new selected pokemon is: ", pokemon);
      break;
    }
  }
  // selectedPokemon = shufflePokemonSet(selectedPokemon);
  console.log("selectedPokemon returning from the selectPokemon function are: ", selectedPokemon);
  return selectedPokemon;
}