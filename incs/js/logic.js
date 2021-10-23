const main = document.getElementById('main');
let isArrow = true;
let randomPokemonArr = [];
let newNumArr = [];
let pickArr = [];
let roundStarted = false;
let turns = 0;
let matches = 0;
const pokeCry = document.getElementById('poke-cry');
const easyBtn = document.getElementById('easy-btn');
const mediumBtn = document.getElementById('medium-btn');
const hardBtn = document.getElementById('hard-btn');
const resetBtn = document.getElementById('reset-btn');
const toggleInfoBtn = document.getElementById('toggle-info');
let cardsCount = 32;
let level = 1;
let matchesCount = document.getElementById('matches');
let turnsCount = document.getElementById('turns');




// Event Listeners
resetBtn.addEventListener('click', ()=>{
  resetBoard();
});

easyBtn.addEventListener('click', ()=>{
  cardsCount = 8;
  resetBoard();
});
mediumBtn.addEventListener('click', ()=>{
  cardsCount = 24;
  resetBoard();
});
hardBtn.addEventListener('click', ()=>{
  cardsCount = 32;
  resetBoard();
});


// Toggling The side bar and the arrow. Only When screen hits < 1000px

toggleInfoBtn.addEventListener('click', ()=>{
  document.getElementById('game-info').classList.toggle('toggle-margin');
  if(isArrow){
    toggleInfoBtn.style.marginLeft = "335px";
    toggleInfoBtn.innerHTML = `<img class="toggle-btn"src="./incs/x.png" alt="">`;
    isArrow = false;
  } else {
    toggleInfoBtn.style.marginLeft = "0px";
    toggleInfoBtn.innerHTML = `<img class="toggle-btn"src="./incs/arrow.png" alt="">`;
    isArrow = true;
  }
});








const kanto = async () =>{
  // interacting with the poke api to generate data
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();
    const pokeData = data.results;

    // Creating an array of x amount of pokemon
    function randomnessArray(arr){
      if(randomPokemonArr.length >= cardsCount ) return;
      let newNumber = Math.floor(Math.random() * 151) + 1;
    
      if(newNumArr.indexOf(newNumber) < 0){
          newNumArr.push(newNumber);
          randomPokemonArr.push(arr[newNumber]);
          randomPokemonArr.push(arr[newNumber]);
      }
      randomnessArray(arr);      
  }
  
  // Fully shuffle the array
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
    
  // creating an array of random choices from the api
    randomnessArray(pokeData);
    let shuffled = shuffledUp(randomPokemonArr);
    for(let i = 0; i < cardsCount; i++){   
        getData(shuffled[i]);

    }       
 
}

// genertaing the pokecards from the api's data
const getData = async (pokemon)=>{
    let url = pokemon.url;
    const response = await fetch(url);
    const urlData = await response.json();
    

    main.innerHTML += `
                          <div class="pokecard-holder" >
                            <div class="pokecard-inner" name="${urlData.name}" onclick="checkMatch(this)">
                              <div class="pokecard-front ${urlData.types[0].type.name}-type" >
                                <img class="poke-img" src="${urlData.sprites.front_default}">
                                <h3 id="poke-id-number">${urlData.id}</h3>
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
  // Setting the audio element src for the pokemon cries
  pokeCry.src = `./incs/pokeCries/${e.getAttribute('name')}.mp3`
  // Plays the audio of pokemon that was flipped
  pokeCry.play();

  // Flip the card, push the element to the array, then deactivate the card!
  e.classList.toggle('card-flip');
  pickArr.push(e);
  pickArr[0].style.pointerEvents = "none";

  // Checcking to see if the array of picks has two items, then checking the 
  //two items to see if they are a match the update the score board

  // If there wasn't update board un-flip the cards and make the card active again
  if(pickArr.length === 2){
    if(pickArr[0].getAttribute('name') === pickArr[1].getAttribute('name')){

      pickArr[1].style.pointerEvents = "none";
      matches++;
      matchesCount.innerHTML = `Matches <br>${matches} `;
      turns++;
      turnsCount.innerHTML = `Turns <br>${turns} `;
      pickArr = [];

    } else {
      turns++;
      turnsCount.innerHTML = `Turns <br>${turns} `;
      pickArr[0].style.pointerEvents = null;
      main.style.pointerEvents= "none";
      setTimeout(()=>{
        pickArr[0].classList.toggle('card-flip');
        e.classList.toggle('card-flip');
        main.style.pointerEvents= null;
        pickArr = [];
      },3000);
    }
  }
  
}


// Function to reset the board and score
function resetBoard(){
  main.innerHTML = "";
  turns = 0;
  matches = 0;
  matchesCount.innerHTML = `Matches <br>${matches} `;
  turnsCount.innerHTML = `Turns <br>${turns} `;
  randomPokemonArr = [];
kanto();
}




kanto();





