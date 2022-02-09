let gameArea = document.getElementById('game-area');
let welcomeArea = document.getElementById('welcome-area');
let leaderBoardArea = document.getElementById('leaderboard-area');
let instructions = document.getElementById("instructions-area");
let selectionArea = document.getElementById("selection-area");
let cardArea = document.getElementById('card-area');
let scoreArea = document.getElementById('score-area');
let infoBar = document.getElementById('info-bar');
let gameOver = document.getElementById('gameover');
let correctAnswers = 0;
let incorrectAttempts = 0;
let counter = document.getElementById('counter');
let currentRightAnimals = [];
let currentWrongAnimals = [];
let seconds = 0; 
let minutes = 0;
let finalScore = 0;

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

document.addEventListener("DOMContentLoaded", function () {

    let leaderBoardBtn = document.getElementById('leaderboard-btn');
        leaderBoardBtn.addEventListener('click', function() {
            loadLeaderboard();
            leaderBoardArea.classList.remove('hide');
            welcomeArea.classList.add('hide');
        });

    let instructionsBtn = document.getElementById('instructions-btn');
    instructionsBtn.addEventListener('click', function() {
        instructions.classList.remove('hide');
        welcomeArea.classList.add('hide');
    });

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

/**
 * Get a selection of right and wrong animals for the current game
 */
function buildAnimalArray(rightAnimals, wrongAnimals, level) {
    let gameAnimals = [];
    
    // Determine the quantity of right and wrong animals to include in the current game depending on the level of difficulty selected
    let rightAnswerCount = (level == 'easy') ? 3 : 5;
    let wrongAnswerCount = (level == 'easy') ? 1 : 3;

    // Get a random selection of "right" animals to include in the current game. The number selected will depend on the level of difficulty selected
    for (let i = 0; i < rightAnswerCount; i++) {
        let rightIndex = Math.floor(Math.random() * rightAnimals.length);
        gameAnimals.push(rightAnimals[rightIndex]);
        // Remove the used animals each time to avoid duplication
        rightAnimals.splice(rightIndex, 1);
    }

    // Get a random selection of "wrong" animals to include in the current game. The number selected will depend on the level of difficulty selected
    for (let i = 0; i < wrongAnswerCount; i++) {
        let wrongIndex = Math.floor(Math.random() * wrongAnimals.length);
        gameAnimals.push(wrongAnimals[wrongIndex]);
        // Remove the used animals each time to avoid duplication
        wrongAnimals.splice(wrongIndex, 1);
    }

    shuffleArray(gameAnimals);
    
    return gameAnimals;    
}

/**
 * Shuffle the order of animals in the current game using the Fischer Yates Shuffle
 * Credit: https://javascript.info/task/shuffle 
 */

function shuffleArray(gameAnimals) {
    for (let i = gameAnimals.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [gameAnimals[i], gameAnimals[j]] = [gameAnimals[j], gameAnimals[i]];
    }
}

/**
 * Create the animal cards and write them to the DOM.
 */
function writeCards(gameAnimals, gameType) {
    // Write the name of the habitat selected to the DOM
    document.getElementById('game-selected').innerHTML = gameType;

    // Determine the level of difficulty selected
    let level = document.querySelector('input[type = radio]:checked').value;

    let cardHtml = "";
    // Create a card for each animal in the game animals array and add CSS class depending on level of difficulty selected
    for (let animal of gameAnimals) {
        if (level === 'easy') {
            cardHtml += `<div class="card ${animal}">${animal}</div>`;
        } else {
            cardHtml += `<div class="card-hard ${animal}">${animal}</div>`;
        }
    } 
    // Write the animal cards to the DOM
    cardArea.innerHTML = cardHtml;

    // Create listener for card selection
    let cards = document.querySelectorAll('.card, .card-hard');
    for (let card of cards) {
        card.addEventListener('click', selectCard);
    } 

    // Change the scene background to match the game type selected
    let scene = document.getElementById('scene-background');
    scene.classList.add(gameType);    
}

/**
 * Handle required actions when the user clicks on an animal card 
 */
function selectCard() {
    // Check is the selected card a "correct" selection
    if (currentRightAnimals.includes(this.textContent)) {
        this.classList.add('correct-card');
        // Increment the correct answers count
        correctAnswers++;

        // Don't allow the card to be selected again
        this.removeEventListener('click', selectCard);

        // Check the level of difficulty selected, if the total is correct then the user has won the game
        let currentLevel = document.querySelector('input[type = radio]:checked').value;
        let correctTotal = (currentLevel === 'easy') ? 3 : 5;
        if (correctAnswers === correctTotal) {
            winGame();
        }
    } else {
        // Fire the "incorrect" CSS animation
        this.classList.add('incorrect-card');

        // Credit: https://www.sitepoint.com/delay-sleep-pause-wait/
        // Wait more than 0.5 seconds (the CSS animation time...) then remove the class `incorrect-card`
        setTimeout(() => { this.classList.remove('incorrect-card');
        }, 550);

        // Increment the incorrect count, write it to the DOM
        incorrectAttempts++;
        counter.innerHTML = incorrectAttempts;
    }
}

/**
 * When the user wins the game show them their score and allow them to save it to the leaderboard
 */
function winGame() {
    let finalCount = document.getElementById('final-count');
    let finalTime = document.getElementById('final-time');
    let currentLevel = document.querySelector('input[type = radio]:checked').value;
    let level = document.getElementById('level');

    // Show the Game Over area
    gameArea.classList.add('hide');
    scoreArea.classList.add('hide');
    gameOver.classList.remove('hide');

    // Display the number of incorrect attempts
    finalCount.innerHTML = incorrectAttempts;

    // Display the final time
    let timeString = '';
    if (minutes) {
        timeString += `${minutes} minutes and `;
    }
    timeString += `${seconds} second`;
    timeString += seconds > 1 ? 's' : '';
    finalTime.innerHTML = timeString;

    // Declare variable for final score for leaderboard
    finalScore = seconds;
    
    // Display the level of difficulty
    level.innerHTML = currentLevel;

    // Create form submission / listener
    let submit = document.getElementById('submit-score');
    submit.addEventListener('click', addToLeaderboard);
}

function addToLeaderboard() {

    // exit if there's no name in the input
    let nameInput = document.getElementById('username');
    if (nameInput.value.trim() === '') {
        nameInput.style = 'border: 3px solid red';
        nameInput.classList.add('incorrect-card');
        return;
    }
    // get the scoreboard data from localstorage, turn it into JSON
    let leaderBoardScores = JSON.parse(localStorage.getItem('leaderBoard')) || [];

    // build the object
    let newScore = {
        name: nameInput.value, 
        score: finalScore,
    };        

    // push it onto the array we got from localStorage
    leaderBoardScores.push(newScore);
    // sort & splice the array to 3
    leaderBoardScores.sort((a,b) => a.score - b.score);
    leaderBoardScores.splice(3);
    // save it to localStorage
    localStorage.setItem('leaderBoard', JSON.stringify(leaderBoardScores));

    // take the listener off the submit score button
    this.removeEventListener('click', addToLeaderboard);

    loadLeaderboard();
    leaderBoardArea.classList.remove('hide');
    gameOver.classList.add('hide');
    let scene = document.getElementById('scene-background');
    scene.classList.remove('jungle', 'safari', 'sea', 'farm');  
    document.getElementsByTagName('body')[0].classList.add('main-image');
}

function loadLeaderboard() {
    // Get the wrapper element from the DOM
    let leaderBoardWrapper = document.getElementById('leaderboard-wrapper');
    // Get the leaderboard scores from localstorage
    let leaderBoardScores = JSON.parse(localStorage.getItem('leaderBoard'));
    if (leaderBoardScores) {
        // Build the list items
        let tableHtml = `
            <table class='leaderboard-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Seconds</th>
                    </tr>
                </thead>
                <tbody>
        `;
        for (let leaderBoardEntry of leaderBoardScores) {
            tableHtml += `
                <tr>
                    <td>${leaderBoardEntry.name}</td>
                    <td>${leaderBoardEntry.score}</td>
                </tr>
            `;
        }
        tableHtml += `
                </tbody>
            </table>
        `;

        // write to the dom
        leaderBoardWrapper.innerHTML = tableHtml;
        
    } else {
        leaderBoardWrapper.innerHTML = "<h3 class='select-level'>No scores yet.... Get playing!</h3>";
    }
}

// Start Timer - credit to https://dev.to/shantanu_jana/create-a-simple-stopwatch-using-javascript-3eoo
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