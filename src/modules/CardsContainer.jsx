import React, {useState, useEffect} from "react";

import { shufflePokemonSet } from "./Util";
let timesRun = 0;

//set up 1 unpicked card and 5 random cards
function CardsContainer({handleCardChosen, selectedPokemon, flipped}) {

  console.log(flipped)
  timesRun++;
  console.log(timesRun);

  return (
    <div className="cardSet">
      {selectedPokemon.map((pokemon) => 
        <div key={pokemon.id} className={(flipped ? "flipped" : "") + " card"} onClick={() => {handleCardChosen(pokemon.id)
        }}>
          <div className="card-face card-front">
            <p className="cardName">{pokemon.name}</p>
            <img className="cardImg" src={pokemon.imageUrl} alt={pokemon.name} />
          </div>
          <div className="card-face card-back"></div>
        </div>
      )}
    </div>
  )
}

export {CardsContainer}