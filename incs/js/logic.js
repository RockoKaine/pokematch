const main = document.getElementById('main');
let randomPokemonArr = [];
let newNumArr = [];
let pickArr = [];
let roundStarted = false;


const kanto = async () =>{
  
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();
    const pokeData = data.results;
    
    randomnessArray(pokeData);
    let shuffled = shuffledUp(randomPokemonArr);
    // Dont know why I was double shuffling, but it seems to create a not so random array order
    // Keeping it just in case I somehow break my code.
    // shuffled = shuffledUp(shuffled);
    for(let i = 0; i < 32; i++){   
        getData(shuffled[i]);
    }       
 
}

const getData = async (pokemon)=>{
    let url = pokemon.url;
    const response = await fetch(url);
    const urlData = await response.json();

    main.innerHTML += `<div class="card ${urlData.types[0].type.name}-type" name="${urlData.name}" onclick="checkMatch(this)">
                        <h3>${urlData.name}</h3>
                        <img class="poke-img" src="${urlData.sprites.front_default}">
                        <h3>#${urlData.id}</h3>
                        </div>`;

    let pokeCards = document.getElementsByClassName('card');
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
  pickArr.push(e);
  console.log(pickArr);
  pickArr[0].style.pointerEvents = "none";
  if(pickArr.length === 2){
    if(pickArr[0].getAttribute('name') === pickArr[1].getAttribute('name')){
      pickArr[1].style.pointerEvents = "none";
      alert('Winner Winner! Chicken Dinner!');
      pickArr = [];
    } else {
      pickArr[0].style.pointerEvents = null;
      pickArr = [];

    }
  }
  
}

    
function randomnessArray(arr){
    if(randomPokemonArr.length >= 32) return;
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





