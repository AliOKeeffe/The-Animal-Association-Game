let gameArea = document.getElementById('game-area');
let welcomeArea = document.getElementById('welcome-area');
let gameOver = document.getElementById('gameover');
let correctAnswers = 0;
let incorrectAttempts = 0;
let counter = document.getElementById('counter');


let gameContents = {
    farm: {
        rightAnimals: ['Sheep', 'Cow', 'Pig', 'Horse', 'Chicken', 'Cockeral', 'Goat'],
        wrongAnimals: ['Whale', 'Dolphin', 'Octopus', 'Turtle', 'Sloth', 'Monkey', 'Snake']
    },
    sea: {
        rightAnimals: ['Whale', 'Dolphin', 'Octopus', 'Turtle', 'Seahorse', 'Jellyfish', 'Crab'],
        wrongAnimals: ['Sheep', 'Cow', 'Pig', 'Horse', 'Sloth', 'Monkey', 'Snake'],
    },
    jungle: {
        rightAnimals: ['Sloth', 'Monkey', 'Snake', 'Treefrog', 'Toucan', 'Parrot', 'Leopard'],
        wrongAnimals: ['Whale', 'Dolphin', 'Octopus', 'Horse','Chicken', 'Cockeral', 'Goat'],
    }
}

let currentRightAnimals = [];
let currentWrongAnimals = [];

// document.addEventListener("DOMContentLoaded", function () {
// })

function runGame(gameType) {

    let level = document.getElementById("level-of-difficulty").value;

    welcomeArea.classList.add('hide');
    gameArea.classList.remove('hide');

    if (level === 'hard') {
        gameArea.classList.replace('game-area', 'hard-game-area')
    } 

    //make a deep copy of the gameContents object - as it is a nested object I used the below method as ... wouldn't work. 
    //see https://www.freecodecamp.org/news/copying-stuff-in-javascript-how-to-differentiate-between-deep-and-shallow-copies-b6d8c1ef09cd/
    let gameContentsCopy = JSON.parse(JSON.stringify(gameContents));
    let currentContents = gameContentsCopy[gameType];

    // Set global variables
    currentRightAnimals.push(...currentContents.rightAnimals);
    currentWrongAnimals.push(...currentContents.wrongAnimals);

    let animalArray = buildAnimalArray(currentContents.rightAnimals, currentContents.wrongAnimals, level);

    writeCards(animalArray, gameType);

    startTimer()
}

function buildAnimalArray(rightAnimals, wrongAnimals, level) {
    let gameAnimals = [];
    
    let rightAnswerCount = (level == 'easy') ? 3 : 6;
    let wrongAnswerCount = (level == 'easy') ? 2 : 4;

    for (let i = 0; i < rightAnswerCount; i++) {
        let rightIndex = Math.floor(Math.random() * rightAnimals.length);
        gameAnimals.push(rightAnimals[rightIndex]);
        rightAnimals.splice(rightIndex, 1);
    }

    for (let i = 0; i < wrongAnswerCount; i++) {
        let wrongIndex = Math.floor(Math.random() * wrongAnimals.length);
        gameAnimals.push(wrongAnimals[wrongIndex]);
        wrongAnimals.splice(wrongIndex, 1)
    }

    shuffleArray(gameAnimals);
    
    return gameAnimals;    
}

// Shuffle order of cards in gameAnimals array using the Fischer Yates Shuffle - https://javascript.info/task/shuffle 

function shuffleArray(gameAnimals) {
    for (let i = gameAnimals.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [gameAnimals[i], gameAnimals[j]] = [gameAnimals[j], gameAnimals[i]];
    }
}

function writeCards(gameAnimals, gameType) {
    document.getElementById('game-selected').innerHTML = gameType;

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
    if (currentRightAnimals.includes(this.textContent)) {

        this.classList.add('correct-card');
        correctAnswers += 1;
        this.removeEventListener('click', selectCard);

        let currentLevel = document.getElementById("level-of-difficulty").value;
        let correctTotal = (currentLevel === 'easy') ? 3 : 6;
        
        if (correctAnswers === correctTotal) {
                winGame();
        }
    } else {
        alert('Incorrect, sorry! ' + this.textContent + ' is not a sea animal');
        incorrectAttemptsCounter()
    }
}

function winGame () {
    let finalCount = document.getElementById('final-count');
    let finalTime = document.getElementById('final-time');

    gameOver.classList.remove('hide');
    finalCount.innerHTML = incorrectAttempts;
    finalTime.innerHTML = `${minutes} minutes and ${seconds} seconds`;

    // resetGame();
}

function incorrectAttemptsCounter() {
    incorrectAttempts++;
    counter.innerHTML = incorrectAttempts;
}

// start timer - credit to https://dev.to/shantanu_jana/create-a-simple-stopwatch-using-javascript-3eoo


let milliseconds = 00;
let seconds = 00; 
let minutes = 00;

function startTimer() {
    let timer = document.getElementById('timer');

    setInterval(function() {
        startCount();
    }, 10);
    
    function startCount () {
        milliseconds +=10;
        if (milliseconds == 1000) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds == 60) {
            seconds = 00;
            minutes++;
        }
        if (minutes == 30) {
            minutes = 0;
        }

        let m = minutes < 10 ? "0" + minutes : minutes;
        let s = seconds < 10 ? "0" + seconds : seconds;
        let ms = milliseconds < 100 ? "0" + milliseconds : milliseconds;

        timer.innerHTML = `Timer: ${m} : ${s} : ${ms}`;
    }
}

// function resetGame() {
    
//     let cardArea = document.getElementById('card-area');
//     cardArea.innerHTML = '';
  
//     // Reset Score
//     correctAnswers = 0 
//     incorrectAttempts = 0
//     counter.innerHTML = incorrectAttempts;
    
//     // Reset Timer
//     milliseconds = 00;
//     seconds = 00;
//     minutes = 00;
//     zeroPlaceholder = 0;

//     //Reset global variables
//     currentRightAnimals = [];
//     currentWrongAnimals = [];
// }