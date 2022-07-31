//Pega a response da API e retorna
export const fetchPokemon = async id => {
   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
   const data = await response.json();
   return data;
}

//Pega só os dados q desejo da response e retorna como um objeto
export const getPokemonInfo = async id => {
   const pokemon = await fetchPokemon(id);
   const pokeInfo = {
      'name': pokemon.name,
      'id': pokemon.id,
      'types' : pokemon.types.map(type => {return type.type.name}),
      'img': pokemon.sprites['front_default']
   }
   return pokeInfo
}
