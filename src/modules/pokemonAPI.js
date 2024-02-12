
class Pokemon {
  constructor({id, name, sprites}) {
    this.id = id;
    this.name = name;
    this.imageUrl = sprites.other['official-artwork'].front_default;
    this.key = id;
  }
}

async function fetchPokemonData(id){
  try{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { mode: 'cors' });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    //wait for response data and return it.
    const data = await response.json();
    return data;

  } catch (error) {
    console.log(error);
    return null;
  }
}

//generate random collection of pokemon ids given info
function generateRandomIds(size, minIndex, maxIndex) {
  const uniqueIntegers = new Set();
  //get amount of numbers beween indexs
  const range = maxIndex - minIndex + 1;

  while(uniqueIntegers.size < size) {
    uniqueIntegers.add(Math.floor(Math.random() * range) + minIndex);
  }

  //wonder why retrun array instead of set.
  return Array.from(uniqueIntegers);
}

async function generateRandomCollection(size, minIndex, maxIndex) {
  const randomIds = generateRandomIds(size, minIndex, maxIndex);

  const pokemonCollection = [];
  //same as forEach
  for (const id of randomIds) {
    const pokemonData = await fetchPokemonData(id);
    const pokemon = new Pokemon(pokemonData);
    pokemonCollection.push(pokemon);
  }

  return pokemonCollection;
}

export {generateRandomCollection};