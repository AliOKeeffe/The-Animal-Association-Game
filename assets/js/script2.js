let gameArea = document.getElementById('game-area');
let welcomeArea = document.getElementById('welcome-area');

let gameContents = {
    farm: {
        rightAnimals: ['Sheep', 'Cow', 'Pig', 'Horse', 'Chicken', 'Cockeral', 'Goat'],
        wrongAnimals: ['Whale', 'Dolphin', 'Octopus', 'Turtle', 'Sloth', 'Monkey', 'Snake']
    },
    sea: {
        rightAnimals: ['Whale', 'Dolphin', 'Octopus', 'Turtle', 'Seahorse', 'Jellyfish', 'Crab'],
        wrongAnimals: ['Sheep', 'Cow', 'Pig', 'Horse', 'Sloth', 'Monkey', 'Snake'],
    }
}

let currentRightAnimals = [];
let currentWrongAnimals = [];

document.addEventListener("DOMContentLoaded", function () {
    // let buttons = document.getElementsByTagName('button');

    // for (let button of buttons) {
    //     button.addEventListener('click', function() {
    //         let gameType = this.getAttribute('data-game-type');
    //         runGame(gameType);
    //     })
    // }
})

function runGame(gameType) {
    welcomeArea.classList.add('hide');
    gameArea.classList.remove('hide'); 

    //make a deep copy of the gameContents object - as it is a nested object I used the below method as ... wouldn't work. 
    //see https://www.freecodecamp.org/news/copying-stuff-in-javascript-how-to-differentiate-between-deep-and-shallow-copies-b6d8c1ef09cd/
    let gameContentsCopy = JSON.parse(JSON.stringify(gameContents));
    let currentContents = gameContentsCopy[gameType];

    // Set global variables
    currentRightAnimals.push(...currentContents.rightAnimals);
    currentWrongAnimals.push(...currentContents.wrongAnimals);

    let animalArray = buildAnimalArray(currentContents.rightAnimals, currentContents.wrongAnimals);

    writeCards(animalArray);

}

function buildAnimalArray(rightAnimals, wrongAnimals) {
    let gameAnimals = [];
    for (let i = 0; i < 3; i++) {
        // Loop through animalsArray and get three random animals and push into newArray
        let rightIndex = Math.floor(Math.random() * rightAnimals.length);
        gameAnimals.push(rightAnimals[rightIndex]);
        // Remove animals pushed into newArray from the animalsArray2 so they cannot be selected more than once
        rightAnimals.splice(rightIndex, 1);
    }

    for (let i = 0; i < 2; i++) {
        let wrongIndex = Math.floor(Math.random() * wrongAnimals.length);
        gameAnimals.push(wrongAnimals[wrongIndex]);
        wrongAnimals.splice(wrongIndex, 1)
    }

    return gameAnimals;    
}

function writeCards(gameAnimals) {
    let cardHtml = "";
    for (let animal of gameAnimals) {
        cardHtml += `<div class="card ${animal}">${animal}</div>`;
    }
    
    let cardArea = document.getElementById('card-area');
    cardArea.innerHTML = cardHtml;

    let cards = document.getElementsByClassName('card');
    for (let card of cards) {
        card.addEventListener('click', selectCard);
    } 
}

function selectCard() {
    console.log(currentRightAnimals.includes(this.textContent) ? "correct" : "incorrect");
}

