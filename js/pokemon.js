import { fetchPokemon } from "./global.js"

const main = document.querySelector('main');
const pokeId = localStorage.getItem('pokemonId')
const pokeInfo = getPokeInfo(pokeId)

renderPokemon(pokeInfo);

async function getPokeInfo(id){
   const pokemon = await fetchPokemon(id)

   const pokeInfo = {
      'name': capitalize(pokemon.name),
      'id': pokemon.id,
      'front': pokemon['sprites']['front_default'],
      'back': pokemon['sprites']['back_default'],
      'types': pokemon['types'].map(type => {return type.type.name}),
      'stats': 
         pokemon['stats'].map(stat => {
            return [stat['base_stat'],stat.stat.name]
         }),
   }
   return pokeInfo;
}

async function renderPokemon(pokeInfo){
   const data = await pokeInfo; 
   const name = data.name;
   const id = data.id;
   const front = data.front;
   const back = data.back;
   const stats = returnBattleStats(data.stats);
   const types = data.types;

   document.title = name;

   const imagesContainer = document.createElement('div');
   imagesContainer.id = 'images';

   const frontContainer = document.createElement('div');
   frontContainer.classList.add('img');

   const imgFront = document.createElement('img');
   imgFront.id = 'front';
   imgFront.src = front;
   imgFront.alt = `${name} front`;

   const backContainer = document.createElement('div');
   backContainer.classList.add('img');

   const imgBack = document.createElement('img');
   imgBack.id = 'back';
   imgBack.src = back;
   imgBack.alt = `${name} back`;
   
   frontContainer.appendChild(imgFront);
   backContainer.appendChild(imgBack);
   
   const dadosContainer = document.createElement('div');
   dadosContainer.id = 'dados';
   
   const p = document.createElement('p');
   p.id = 'name';
   p.innerText = `${id} - ${name}`;
   dadosContainer.appendChild(p);

   function returnUlContainer(title, array){
      const ulContainer = document.createElement('div');
      ulContainer.classList.add('ul-container');
   
      const ulTitle = document.createElement('p');
      ulTitle.classList.add('ul-title');
      ulTitle.innerText = title;
   
      const ul = document.createElement('ul');
   
      const img = document.createElement('img');
      img.src = "../images/pokebola.png";
   
      for(let element of array){
         const li = document.createElement('li');
         li.appendChild(img);
         if(array == types){
            li.innerHTML += element;
         }else if(array == stats){
            li.innerHTML += `${element[1]} - ${element[0]}`;
         }
         ul.appendChild(li);
      }
      ulContainer.appendChild(ulTitle)
      ulContainer.appendChild(ul);
   
      return ulContainer;
   }

   const typesContainer = returnUlContainer('Types: ', types)
   const battleStatsContainer = returnUlContainer('Stats: ', stats)

   imagesContainer.appendChild(frontContainer);
   imagesContainer.appendChild(backContainer);
   main.appendChild(imagesContainer);
   
   dadosContainer.appendChild(typesContainer);
   dadosContainer.appendChild(battleStatsContainer);
   main.appendChild(dadosContainer);
}

function returnBattleStats(stats){
   const hp = stats[0]
   hp[1] = 'HP'
   const attack = stats[1]
   attack[1] = 'ATK'
   const defense = stats[2]
   defense[1] = 'DEF'
   const speed = stats[5]
   speed[1] = 'SPD'
   
   return [hp, attack, defense, speed];
}

function capitalize(palavra){
   return palavra.charAt(0).toUpperCase() + palavra.slice(1);
}