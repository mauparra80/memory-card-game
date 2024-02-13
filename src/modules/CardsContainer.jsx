import React, {useState, useEffect} from "react";

import { shufflePokemonSet } from "./Util";

//set up 1 unpicked card and 5 random cards
function CardsContainer({pokemonData, chosenIds, handleCardChosen}) {

  const shuffledSet = shufflePokemonSet(pokemonData);
  let selectedPokemon = shuffledSet.slice(0,5);
  console.log(shuffledSet);

  for (const pokemon of pokemonData) {
    if (!chosenIds.includes(pokemon.id) && !selectedPokemon.some((p) => p.id === pokemon.id)) {
      console.log(pokemon);
      selectedPokemon.push(pokemon);
      break;
    }
  }

  selectedPokemon = shufflePokemonSet(selectedPokemon);


  // const [selectedPokemon, setSelectedPokemon] = useState([]);

  // console.log(pokemonData);
  // console.log(chosenIds);

  // //shuffle deck and pick 5 random cards
  // useEffect(() => {
  //   const shuffledSet = shufflePokemonSet(pokemonData);
  //   const selected = shuffledSet.slice(0,5);
  //   console.log("the selected pokemon are",selected);
  //   setSelectedPokemon(selected);
  // }, [])
  
  // //add 1 unchosen card
  // useEffect(() => {
  //   for (const pokemon of pokemonData) {
  //     if (!chosenIds.includes(pokemon.id) && !selectedPokemon.some((p) => p.id === pokemon.id)) {
  //       console.log(pokemon);
  //       setSelectedPokemon((prevSelected) => [...prevSelected, pokemon]);
  //       break;
  //     }
  //   }
  // }, []);

  return (
    <div className="cardSet">
      {selectedPokemon.map((pokemon) => 
        <div key={pokemon.id} className="card" onClick={() => handleCardChosen(pokemon.id)}>
          <p>{pokemon.name}</p>
          <img src={pokemon.imageUrl} alt={pokemon.name} />
        </div>
      )}

      


      {/* {pokemonData.map((pokemon) => 
        <div key={pokemon.id} className='card'>
          <p>{pokemon.name}</p>
          <img src={pokemon.imageUrl} alt={pokemon.name} />
        </div>
      )} */}
    </div>
  )
}

export {CardsContainer}