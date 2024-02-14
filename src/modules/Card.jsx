import React,{useState} from "react";

function Card({handleCardChosen, pokemon, isFlipped, handleFlipAllCards}) {

  return (
    <div key={pokemon.id} className={(isFlipped ? "flipped" : "") + " card"} onClick={() => {
       handleCardChosen(pokemon.id);
       handleFlipAllCards();
    }}>
      <div className="card-face card-front">
        <p className="cardName">{pokemon.name}</p>
        <img className="cardImg" src={pokemon.imageUrl} alt={pokemon.name} />
      </div>
      <div className="card-face card-back"></div>
    </div>
  )
}

export {Card};