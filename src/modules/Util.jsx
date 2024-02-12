
function shufflePokemonSet(pokemonData) {
  for (let i = pokemonData.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pokemonData[i], pokemonData[j]] = [pokemonData[j], pokemonData[i]];
  }
  return pokemonData;
}

export {shufflePokemonSet};