import { shufflePokemonSet } from "./Util";

//call api and set up pokemon cards
function CardsContainer({pokemonData, picked, handleCardChosen}) {
  const shuffledSet = shufflePokemonSet(pokemonData);

  //fileter pokemon data based on generated ranomdIds
  const selectedPokemon = shuffledSet.slice(0,6);

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