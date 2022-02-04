let gameArea = document.getElementById('game-area');
let welcomeArea = document.getElementById('welcome-area');
let instructions = document.getElementById("instructions-area");
let selectionArea = document.getElementById("selection-area");
let cardArea = document.getElementById('card-area');
let scoreArea = document.getElementById('score-area');
let infoBar = document.getElementById('info-bar');
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
        rightAnimals: ['lion', 'elephant', 'crocodile', 'rhino', 'hippo', 'zebra', 'giraffe', 'ostrich'],
        wrongAnimals: ['cow', 'pig', 'horse', 'sloth', 'dog', 'cockeral', 'goat'],
    }
};

let currentRightAnimals = [];
let currentWrongAnimals = [];

let seconds = 0; 
let minutes = 0;
let finalScore = 0;

document.addEventListener("DOMContentLoaded", function () {

    // document.getElementById("jungle-button").addEventListener('click', runGame("jungle"));
    // document.getElementById("sea-button").addEventListener('click', runGame("sea"));
    // document.getElementById("farm-button").addEventListener('click', runGame("farm"));
    // document.getElementById("safari-button").addEventListener('click', runGame("safari"));

    let instructionsBtn = document.getElementById('instructions-btn');
    instructionsBtn.addEventListener('click', function() {
        instructions.classList.remove('hide');
        welcomeArea.classList.add('hide');
    })

    // let playBtns = document.getElementsByClassName('play-btn');
    // for (i of playBtns) {
    //     i.addEventListener('click', function() { 
    //         selectionArea.classList.remove('hide');
    //         welcomeArea.classList.add('hide');
    //         infoBar.classList.remove('hide');
    //         gameOver.classList.add('hide');
    //     });
    // }

    let playBtn = document.getElementById('play-btn');
    playBtn.addEventListener('click', function() { 
        selectionArea.classList.remove('hide');
        welcomeArea.classList.add('hide');
        infoBar.classList.remove('hide');
    });

    document.getElementById("jungle-button").addEventListener('click', function() {
        runGame("jungle");
    });
    document.getElementById("farm-button").addEventListener('click', function() {
        runGame("farm");
    });
    document.getElementById("safari-button").addEventListener('click', function() {
        runGame("safari");
    });
    document.getElementById("sea-button").addEventListener('click', function() {
        runGame("sea");
    }); 
});

function runGame(gameType) {

    let level = document.querySelector('input[type = radio]:checked').value;

    selectionArea.classList.add('hide');
    gameArea.classList.remove('hide');
    document.getElementsByTagName('body')[0].style = 'background: #61BBA7';

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

    startTimer();
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
        wrongAnimals.splice(wrongIndex, 1);
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
    let level = document.querySelector('input[type = radio]:checked').value;

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

    let scene = document.getElementById('scene-background');
    scene.classList.add(gameType);    
}

function selectCard() {
    if (currentRightAnimals.includes(this.textContent)) {

        this.classList.add('correct-card');
        correctAnswers += 1;
        this.removeEventListener('click', selectCard);

        let currentLevel = document.querySelector('input[type = radio]:checked').value;
        let correctTotal = (currentLevel === 'easy') ? 3 : 5;
        
        if (correctAnswers === correctTotal) {
                winGame();
        }
    } else {
        this.classList.add('incorrect-card');

        // Credit: https://www.sitepoint.com/delay-sleep-pause-wait/
        // wait more than 0.5 seconds (the CSS animation time...) then remove the class `incorrect-card`
        setTimeout(() => { this.classList.remove('incorrect-card') }, 550);

        // alert('Incorrect, sorry! ' + this.textContent + ' is not a sea animal');
        incorrectAttemptsCounter();
    }
}

function winGame () {
    let finalCount = document.getElementById('final-count');
    let finalTime = document.getElementById('final-time');
    let currentLevel = document.querySelector('input[type = radio]:checked').value;
    let level = document.getElementById('level');

    gameArea.classList.add('hide');
    scoreArea.classList.add('hide');
    gameOver.classList.remove('hide');
    finalCount.innerHTML = incorrectAttempts;

    let timeString = '';
    if (minutes) {
        timeString += `${minutes} minutes and `;
    }
    timeString += `${seconds} second`;
    timeString += seconds > 1 ? 's' : '';
    finalTime.innerHTML = timeString;

    finalScore = seconds;
    
    level.innerHTML = currentLevel;
    // resetGame();

    // Create form submission / listener
    document.getElementById('submit-score').addEventListener('click', function() {
        // get the scoreboard data from localstorage, turn it into JSON
        let leaderBoardScores = JSON.parse(localStorage.getItem('leaderBoard')) || [];

        // build the object
        newScore = {
            name: document.getElementById('username').value, // Q: What if there's no name?
            // score: finalScore,
            score: Math.floor(Math.random() * 100),
        };        

        // push it onto the array we got from localStorage
        leaderBoardScores.push(newScore);

        // sort
        leaderBoardScores.sort((a,b) => b.score - a.score);

        // splice
        leaderBoardScores.splice(3);

        // save it to localStorage
        localStorage.setItem('leaderBoard', JSON.stringify(leaderBoardScores));

        // @TODO take the listener off the submit score button
    });

}

function incorrectAttemptsCounter() {
    incorrectAttempts++;
    counter.innerHTML = incorrectAttempts;
}

// start timer - credit to https://dev.to/shantanu_jana/create-a-simple-stopwatch-using-javascript-3eoo

function startTimer() {
    let timer = document.getElementById('timer');

    setInterval(function() {
        startCount();
    }, 1000);
    
    function startCount () {
        seconds += 1;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes == 30) {
            minutes = 0;
        }

        let m = minutes < 10 ? "0" + minutes : minutes;
        let s = seconds < 10 ? "0" + seconds : seconds;

        timer.innerHTML = `${m} : ${s}`;
    }
}

// function resetGame() {
    
//     let cardArea = document.getElementById('card-area');
//     cardArea.innerHTML = '';
  
//     // Reset Score
//     correctAnswers = 0 a
//     incorrectAttempts = 0
//     counter.innerHTML = incorrectAttempts;
    
//     // Reset Timer
//     seconds = 00;
//     minutes = 00;
//     zeroPlaceholder = 0;

//     //Reset global variables
//     currentRightAnimals = [];
//     currentWrongAnimals = [];
// }