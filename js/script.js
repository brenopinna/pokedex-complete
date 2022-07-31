import { fetchPokemon } from './global.js'

const main = document.querySelector('main');
const loadingMsg = addLoadingMsg();

let pokePromises = [];
for(let i = 1; i <= 898; i++){
   pokePromises.push(getPokemonInfo(i));
}

Promise.all(pokePromises)
.then(pokePromises => {
   let pokeObjects = [];

   for(const pokemon of pokePromises){
      pokeObjects.push(pokemon)
   }

   removeLoadingMsg(loadingMsg);
   for(const pokemon of pokeObjects){
      renderPokemon(pokemon);
   }

   const pokeImgs = document.querySelectorAll('.pokemon a');

   pokeImgs.forEach(pokemon => {
      pokemon.addEventListener('click', () => {
         const pokeParent = pokemon.parentNode;
         let pokeId = pokeParent.querySelector('#id').innerText;
         localStorage.setItem('pokemonId', pokeId);
      })
   });
   
})

async function getPokemonInfo(id){
   const pokemon = await fetchPokemon(id);
   const pokeInfo = {
      'name': pokemon.name,
      'id': pokemon.id,
      'types' : pokemon.types.map(type => {return type.type.name}),
      'img': pokemon.sprites['front_default']
   }
   return pokeInfo
}

function renderPokemon(pokemon){
   const name = pokemon.name;
   const id = pokemon.id;
   const img = pokemon.img;
   const types =  pokemon.types

   const pokeImg = document.createElement('img');
   pokeImg.src = img;
   pokeImg.alt = name;

   const link = document.createElement('a');
   link.href = './pokemon-page/pokemon.html';
   link.appendChild(pokeImg);

   const pokeId = document.createElement('span');
   pokeId.id = 'id';
   pokeId.innerText = id;

   const pokeName = document.createElement('p');
   pokeName.appendChild(pokeId);
   pokeName.innerHTML += ` - ${name}`;

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

function addLoadingMsg(){
   const p = document.createElement('p')
   p.id = 'loading';
   p.innerText = 'Loading...';
   main.appendChild(p);
   return p;
}

function removeLoadingMsg(p){
   main.removeChild(p);
}