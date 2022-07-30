//Pega a response da API e retorna
const fetchPokemon = async id => {
   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
   const data = await response.json();
   return data;
}

//Pega só os dados q desejo da response e retorna como um objeto
const getPokemonInfo = async id => {
   const pokemon = await fetchPokemon(id);
   const pokeInfo = {
      'name': pokemon.name,
      'id': pokemon.id,
      'types' : pokemon.types.map(type => {return type.type.name}),
      'img': pokemon.sprites['front_default']
   }
   return pokeInfo
}

//Cria os elementos HTML e coloca dentro da <main>
const renderPokemon = pokemon => {
   const name = pokemon.name;
   const id = pokemon.id;
   const img = pokemon.img;
   const types =  pokemon.types

   const pokeImg = document.createElement('img');
   pokeImg.src = img;
   pokeImg.alt = name;

   const link = document.createElement('a');
   link.href = './pokemon-individual/pokemon.html';
   link.appendChild(pokeImg);

   const pokeName = document.createElement('p');
   pokeName.innerText = `${id} - ${name}`;

   const pokeTypes = document.createElement('ul');
   for(const type of types){
      const pokeType = document.createElement('li');
      pokeType.innerText = type;
      pokeTypes.appendChild(pokeType);
   }

   const pokeDiv = document.createElement('div');
   pokeDiv.classList.add('pokemon');
   pokeDiv.appendChild(link);
   pokeDiv.appendChild(pokeName);
   pokeDiv.appendChild(pokeTypes);

   main.appendChild(pokeDiv);
}

const addLoadingMsg = () => {
   const p = document.createElement('p')
   p.id = 'loading';
   p.innerText = 'Loading...';
   main.appendChild(p);
   return p;
}

const removeLoadingMsg = (p) => {
   main.removeChild(p);
}

const main = document.querySelector('main');

const loadingMsg = addLoadingMsg();

//Pega todos os pokemón disponíveis e joga numa array de promises.
let pokePromises = [];
for(let i = 1; i <= 898; i++){
   pokePromises.push(getPokemonInfo(i));
}
//Resolve todas as promises
Promise.all(pokePromises)
// e passa para uma array de objetos.
.then(pokePromises => {
   let pokeObjects = [];
   for(const pokemon of pokePromises){
      pokeObjects.push(pokemon)
   }
   return pokeObjects
})
//Renderiza esses objetos na tela.
.then(pokeObjects => {
   removeLoadingMsg(loadingMsg);
   for(const pokemon of pokeObjects){
      renderPokemon(pokemon);
   }
});