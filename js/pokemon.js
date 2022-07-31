import { fetchPokemon } from "./global.js"

const main = document.querySelector('main');

const capitalize = palavra => {
   return palavra.charAt(0).toUpperCase() + palavra.slice(1);
}

//Pega as informações q desejo sobre o pokemón.
const getPokeInfo = async id => {
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
/* 
<div id="dados">
   <p id="name">4 - Charmander</p>
   <div class="ul-container">
      <p class="ul-title">Status do Pokémon:</p>
      <ul id="stats">
         <li><img src="../images/pokebola.png" alt=""><span id="stat">Hp</span> - <span id="stat-value">123</span></li>
         <li><img src="../images/pokebola.png" alt=""><span id="stat">Hp</span> - <span id="stat-value">123</span></li>
         <li><img src="../images/pokebola.png" alt=""><span id="stat">Hp</span> - <span id="stat-value">123</span></li>
      </ul>
   </div>
   <div class="ul-container">
      <p class="ul-title">Tipos:</p>
      <ul id="types">
         <li><img src="../images/pokebola.png" alt="">Fire</li>
      </ul>
   </div>
</div>
*/

const renderPokemon = async pokeInfo => {
   const data = await pokeInfo; 
   const name = data.name;
   const id = data.id;
   const front = data.front;
   const back = data.back;
   const stats = returnBattleStats(data.stats); //funcionando
   const types = data.types;

   document.title = name;

   //parte das imagens
   const imagesContainer = document.createElement('div');
   imagesContainer.id = 'images';

   const frontContainer = document.createElement('div');
   frontContainer.classList.add('img');

   const imgFront = document.createElement('img');
   imgFront.src = front;
   imgFront.alt = `${name} front`;

   const backContainer = document.createElement('div');
   backContainer.classList.add('img');

   const imgBack = document.createElement('img');
   imgBack.src = back;
   imgBack.alt = `${name} back`;
   
   frontContainer.appendChild(imgFront);
   backContainer.appendChild(imgBack);
   
   //parte dos dados
   const dadosContainer = document.createElement('div');
   dadosContainer.id = 'dados';
   
   const p = document.createElement('p');
   p.id = 'name';
   p.innerText = `${id} - ${name}`;
   dadosContainer.appendChild(p);
   //até aq ta funcionando

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

   //só os appendChild mesmo
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

const pokeId = localStorage.getItem('pokemonId')
const pokeInfo = getPokeInfo(pokeId)

renderPokemon(pokeInfo);