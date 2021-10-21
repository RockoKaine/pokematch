// maybe make levels, 2 cards, 4 cards, 8, 16, 32...

const main = document.getElementById('main');
let randomPokemonArr = [];
let newNumArr = [];
let pickArr = [];
let roundStarted = false;
let turns = 0;
let matches = 0;
const pokeCry = document.getElementById('poke-cry');
const resetBtn = document.getElementById('reset-btn');
let cardsCount = 4;
let level = 1;
resetBtn.addEventListener('click', ()=>{
  main.innerHTML = "";
      turns = 0;
      matches = 0;
      matchesCount.innerHTML = `Matches <br>${matches} `;
      turnsCount.innerHTML = `Turns <br>${turns} `;
  kanto();
});



let matchesCount = document.getElementById('matches');
matchesCount.innerHTML = `Matches <br>${matches} `;
let turnsCount = document.getElementById('turns');
turnsCount.innerHTML = `Turns <br>${turns} `;

const kanto = async () =>{
  
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();
    const pokeData = data.results;
    
    randomnessArray(pokeData);
    let shuffled = shuffledUp(randomPokemonArr);
    for(let i = 0; i < cardsCount; i++){   
        getData(shuffled[i]);
    }       
 
}

const getData = async (pokemon)=>{
    let url = pokemon.url;
    const response = await fetch(url);
    const urlData = await response.json();

    main.innerHTML += `
                          <div class="pokecard-holder" name="${urlData.name}" onclick="checkMatch(this)">
                            <div class="pokecard-inner" >
                              <div class="pokecard-front ${urlData.types[0].type.name}-type" >
                                <h3>${urlData.name}</h3>
                                <img class="poke-img" src="${urlData.sprites.front_default}">
                                <h3>${urlData.id}</h3>
                              </div>
                              
                              <div class="pokecard-back">
                                <div class="pokeball"> 
                                  <div class="pokeball-top"></div>
                                  <div class="pokeball-bottom"></div>
                                  <div class="pokeball-center">
                                    <div class="pokeball-btn"></div>
                                  </div>
                                </div>
                              </div>
                              
                            </div>
                          </div>
                        
                        `;

    let pokeCards = document.getElementsByClassName('pokecard-front');
    var btns = document.getElementsByClassName('poke-img');
    for(var i = 0; i < btns.length; i++) {
      pokeCards[i].addEventListener('click', function () {
        // this is where my error is
        let firstPick = this.getAttribute('name');
        let pokeHolder = [];
        pokeHolder.push(firstPick);
        if(pokeHolder[0] === pokeHolder[1]){
          console.log('Winner winner chicken dinner');
        }
      });
    } 
}

function checkMatch(e){
  pokeCry.src = `./incs/pokeCries/${e.getAttribute('name')}.mp3`
  pokeCry.play();
  pickArr.push(e);
  console.log(pickArr);
  pickArr[0].style.pointerEvents = "none";
  if(pickArr.length === 2){
    if(pickArr[0].getAttribute('name') === pickArr[1].getAttribute('name')){
      pickArr[1].style.pointerEvents = "none";
      matches++;
      matchesCount.innerHTML = `Matches <br>${matches} `;
      turns++;
      turnsCount.innerHTML = `Turns <br>${turns} `;
      alert('Winner Winner! Chicken Dinner!');
      pickArr = [];
      main.innerHTML = '';
      kanto();
    } else {
      turns++;
      turnsCount.innerHTML = `Turns <br>${turns} `;
      pickArr[0].style.pointerEvents = null;
      pickArr = [];

    }
  }
  
}

    
function randomnessArray(arr){
    if(randomPokemonArr.length >= cardsCount ) return;
    let newNumber = Math.floor(Math.random() * 152);
  
    if(newNumArr.indexOf(newNumber) < 0){
        newNumArr.push(newNumber);
        randomPokemonArr.push(arr[newNumber]);
        randomPokemonArr.push(arr[newNumber]);
    }
    randomnessArray(arr);
    
}


function shuffledUp(arr) {
  let newPos,
      temp;
  for(let i = arr.length -1; i > 0; i--){
    newPos = Math.floor(Math.random() * (i+1));
    temp = arr[i];
    arr[i] = arr[newPos];
    arr[newPos] = temp;
  }
  return arr;
}




kanto();





