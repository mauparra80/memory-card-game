import React, {useState, useEffect} from "react";
import { Card } from "./Card";
import { shufflePokemonSet } from "./Util";

let isFlipped = false;

//set up 1 unpicked card and 5 random cards
function CardsContainer({handleCardChosen, selectedPokemon}) {
isFlipped = !isFlipped;
console.log(isFlipped);

  return (
    <div className="cardSet">
      {selectedPokemon.map((pokemon) => 
        <Card key={pokemon.id} 
        pokemon={pokemon} 
        handleCardChosen={handleCardChosen}
        isFlipped={isFlipped}
        // handleFlipAllCards={handleFlipAllCards}
        />
      )}
    </div>
  )
}

export {CardsContainer}