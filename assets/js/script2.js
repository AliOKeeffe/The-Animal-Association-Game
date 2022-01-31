let gameArea = document.getElementById('game-area');
let welcomeArea = document.getElementById('welcome-area');
let cardArea = document.getElementById('card-area');
let gameOver = document.getElementById('gameover');
let correctAnswers = 0;
let incorrectAttempts = 0;
let counter = document.getElementById('counter');



let gameContents = {
    farm: {
        rightAnimals: ['sheep', 'cow', 'pig', 'horse', 'donkey', 'cockeral', 'goat', 'dog', 'cat'],
        wrongAnimals: ['whale', 'dolphin', 'octopus', 'turtle', 'sloth', 'monkey', 'snake']
    },
    sea: {
        rightAnimals: ['whale', 'dolphin', 'octopus', 'turtle', 'seal', 'swordfish', 'shark', 'walrus', 'crab'],
        wrongAnimals: ['sheep', 'cow', 'pig', 'horse', 'sloth', 'monkey', 'snake'],
    },
    jungle: {
        rightAnimals: ['sloth', 'monkey', 'snake', 'treefrog', 'toucan', 'gorilla', 'panda'],
        wrongAnimals: ['whale', 'dolphin', 'octopus', 'horse', 'dog', 'cockeral', 'goat'],
    },
    safari: {
        rightAnimals: ['lion', 'elephant', 'crocodile', 'rhino', 'hippo', 'camel', 'zebra', 'giraffe', 'ostrich'],
        wrongAnimals: ['cow', 'pig', 'horse', 'sloth', 'dog', 'cockeral', 'goat'],
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
    document.getElementsByTagName('body')[0].style = 'background: #03cea4';

    if (level === 'hard') {
        cardArea.classList.replace('card-area', 'card-area-hard');
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
    
    let rightAnswerCount = (level == 'easy') ? 3 : 5;
    let wrongAnswerCount = (level == 'easy') ? 1 : 3;

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
    let level = document.getElementById("level-of-difficulty").value;

    let cardHtml = "";
    for (let animal of gameAnimals) {
        if (level === 'easy') {
            cardHtml += `<div class="card ${animal}">${animal}</div>`;
        } else {
            cardHtml += `<div class="card-hard ${animal}">${animal}</div>`;
        }
    }
    

    cardArea.innerHTML = cardHtml;

    let cards = document.querySelectorAll('.card, .card-hard');
    for (let card of cards) {
        card.addEventListener('click', selectCard);
    } 

    let scene = document.getElementById('scene-area');
    scene.classList.add(gameType);    
}

function selectCard() {
    if (currentRightAnimals.includes(this.textContent)) {

        this.classList.add('correct-card');
        correctAnswers += 1;
        this.removeEventListener('click', selectCard);

        let currentLevel = document.getElementById("level-of-difficulty").value;
        let correctTotal = (currentLevel === 'easy') ? 3 : 5;
        
        if (correctAnswers === correctTotal) {
                winGame();
        }
    } else {
        this.classList.add('incorrect-card');
        // alert('Incorrect, sorry! ' + this.textContent + ' is not a sea animal');
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

        // timer.innerHTML = `Timer: ${m} : ${s} : ${ms}`;
        timer.innerHTML = `Timer: ${m} : ${s}`;
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