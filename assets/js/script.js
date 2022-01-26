// let animalsArray = {
//    Cat: { Name: 'Cat', Image: 'https://via.placeholder.com/150x150' },
//    Mouse: { Name: 'Mouse', Image: 'https://via.placeholder.com/150x150' },
//    Monkey: { Name: 'Monkey', Image: 'https://via.placeholder.com/150x150' },
//    Sheep: { Name: 'Sheep', Image: 'https://via.placeholder.com/150x150' },
//     // { Name: 'Cow', Image: 'https://via.placeholder.com/150x150' },
//     // { Name: 'Pig', Image: 'https://via.placeholder.com/150x150' },
//     // { Name: 'Horse', Image: 'https://via.placeholder.com/150x150' }
// }

// let animalsArray = ['Cat', 'Mouse', 'Monkey', 'Sheep', 'Cow', 'Pig', 'Horse'];

// let colorArray = ['Blue', 'Green', 'Purple', 'Orange', 'Yellow', 'Red', 'Black', 'Pink'];

let farmAnimals = ['Sheep', 'Cow', 'Pig', 'Horse', 'Chicken', 'Cockeral', 'Goat'];
let seaAnimals = ['Whale', 'Dolphin', 'Octopus', 'Squid', 'Seahorse', 'Jellyfish', 'Clownfish'];
let gameAnimals = [];
let gameType;

let correctAnswers = 0;
let incorrectAttempts = 0;
let gameOver = document.getElementById('gameover');
let restartbtn = document.getElementsByClassName('restart-game');
let counter = document.getElementById('counter');
let startbtn = document.getElementById('startbtn');
let homebtn = document.getElementsByClassName('home-button');
let gameArea = document.getElementById('game-area');
let welcomeArea = document.getElementById('welcome-area');
let finalCount = document.getElementById('final-count');
let finalTime = document.getElementById('final-time');




// Wait for the DOM to finish loading before running the game
// Get the buttom elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    // let buttons = document.getElementsByTagName('button');

    // // for (let button of buttons) {
    // //     button.addEventListener('click', function () {
    // //         alert("you pressed a button");
    // //     })
    // // }

    // startbtn.addEventListener('click', runGame);

    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function() {
            if(this.getAttribute('data-type') === 'home') {
                location.href = 'https://8000-aliokeeffe-kidsassociati-0wp5x4a93rd.ws-eu29.gitpod.io/';
            } else {
                gameType = this.getAttribute('data-type');
                runGame(gameType);
                
            }
        })
    }    
        
    // for (let i of homebtn) {
    //     i.addEventListener('click', function () {
    //         location.href = 'https://8000-aliokeeffe-kidsassociati-0wp5x4a93rd.ws-eu29.gitpod.io/';
    //     });
    // }

    for (let i of restartbtn) {
        i.addEventListener('click', function () {
            gameOver.classList.add('hide');
            resetGame();
        });
    }
    // runGame();

    
})

function runGame(gameType) {

    if (gameType === 'farm') {
        gameAnimals = createGameAnimals([...farmAnimals], [...seaAnimals]);
    } else if (gameType === 'sea') {
        gameAnimals = createGameAnimals([...seaAnimals], [...farmAnimals]);
    }

    writeCards(gameAnimals);

    welcomeArea.classList.add('hide');
    gameArea.classList.remove('hide');  
}

// Write a function that takes two arrays as parameters and returns a new array with 3 of one a 2 of the other.

function createGameAnimals(rightAnimals, wrongAnimals) {

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

    let cardHtml = '';
    for (let animal of gameAnimals) {
        cardHtml += 
        `<div class="card ${animal}">${animal}</div>`;
    }
    
    let cardArea = document.getElementById('card-area');
    cardArea.innerHTML = cardHtml;

    let cards = document.getElementsByClassName('card');
    
    for (let card of cards) {
        card.addEventListener('click', selectCard);
    } 
}

function selectCard() {
    let card = this; 
    if (gameType === 'farm') {
        if (farmAnimals.includes(card.textContent)) {
            card.classList.add('correct-card');
            correctAnswers += 1;
            card.removeEventListener('click', selectCard);

            if (correctAnswers == 3) {
                winGame();
            }
        } else {
            alert('Incorrect, sorry! ' + card.textContent + ' is not a farm animal');
            incorrectAttemptsCounter()
        }
    } else if (gameType === 'sea') {
        if (seaAnimals.includes(card.textContent)) {
            card.classList.add('correct-card');
            correctAnswers += 1;
            card.removeEventListener('click', selectCard);

            if (correctAnswers == 3) {
                winGame();
            }
        } else {
            alert('Incorrect, sorry! ' + card.textContent + ' is not a sea animal');
            incorrectAttemptsCounter()
        }
    }
}


function winGame () {
    gameOver.classList.remove('hide');
    finalCount.innerHTML = incorrectAttempts;
    finalTime.innerHTML = `${minutes} minutes and ${seconds} seconds`;

    resetGame();
}

//     console.log(this.getAttribute('data-type'))

//     // let cards = document.getElementsByClassName('card')
// }
//     // for (let card of cards) {
//         if (this.getAttribute('data-type') === 'farm') {
      
//             this.classList.add('correct-card');
//             correctAnswers += 1;
//             this.removeEventListener('click', selectCard);
    
//             if (correctAnswers == 3) {
//                 // gameover.style.visibility = "visible";
//                 gameOver.classList.remove('hide');
//                 finalCount.innerHTML = incorrectAttempts;
//                 finalTime.innerHTML = `${minutes} minutes and ${seconds} seconds`;
//             }
    
//             resetGame();
    
//         } else {
//             alert('Incorrect, sorry! ' + this.textContent + ' is not an animal');
//             incorrectAttemptsCounter()
//         }

// }
    // let animalsArray1 = Object.keys(animalsArray);

//     if (animalsArray.includes(card.textContent)) {

//         card.classList.add('correct-card');
//         correctAnswers += 1;
//         card.removeEventListener('click', selectCard);

//         if (correctAnswers == 3) {
//             // gameover.style.visibility = "visible";
//             gameOver.classList.remove('hide');
//             finalCount.innerHTML = incorrectAttempts;
//             finalTime.innerHTML = `${minutes} minutes and ${seconds} seconds`;
//         }

//         closeModal();

//     } else {
//         alert('Incorrect, sorry! ' + card.textContent + ' is not an animal');
//         incorrectAttemptsCounter()
//     }
// }








// For each element in animalsArray, creat a div with the name of the animal and add it to the DOM
// function runGame() {
//     welcomeArea.classList.add('hide');
//     gameArea.classList.remove('hide');

//     let animalsArray2 = [...animalsArray]
//     let colorArray2 = [...colorArray];
//     let newArray = [];

//     // let animalsArray2 = Object.values(animalsArray);

//     for (let i = 0; i < 3; i++) {
//         // Loop through animalsArray and get three random animals and push into newArray
//         let animalIndex = Math.floor(Math.random() * animalsArray2.length);
//         newArray.push(animalsArray2[animalIndex]);
//         // Remove animals pushed into newArray from the animalsArray2 so they cannot be selected more than once
//         animalsArray2.splice(animalIndex, 1);
//     }

//     for (let i = 0; i < 2; i++) {
//         let colorIndex = Math.floor(Math.random() * colorArray2.length);
//         newArray.push(colorArray2[colorIndex]);
//         colorArray2.splice(colorIndex, 1)
//     }

//     console.log(newArray);

//     shuffleArray(newArray); 

//     let cardHtml = '';
//     for (let animal of newArray) {
//         cardHtml += 
//         `<div class="card ${animal}">${animal}</div>`;
//     }

//     // let cardHtml = '';
//     // for (let animalObject of newArray) {
//     //     cardHtml += 
//     //     `<div class="card">
//     //         <img src="${animalObject.Image}">
//     //         ${animalObject.Name}
//     //     </div>`;
//     // }
    
//     let cardArea = document.getElementById('card-area');
//     cardArea.innerHTML = cardHtml;

//     let cards = document.getElementsByClassName('card');

//     for (let card of cards) {
//         card.addEventListener('click', selectCard);
//     }
    
//     startCount();
// }

// Shuffle order of cards in newArray using the Fischer Yates Shuffle - https://javascript.info/task/shuffle 

function shuffleArray(newArray) {
    for (let i = newArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
}

function incorrectAttemptsCounter() {
    incorrectAttempts++;
    counter.innerHTML = incorrectAttempts;
}

// remove styling for selected cards, set incorrect attempts back to zero, add back in click listeners

function resetGame() {
    
    let cardArea = document.getElementById('card-area');
    cardArea.innerHTML = '';
  
    correctAnswers = 0 
    incorrectAttempts = 0
    counter.innerHTML = incorrectAttempts;
    // Reset Timer
    milliseconds = 00;
    seconds = 00;
    minutes = 00;
    zeroPlaceholder = 0;

    runGame();

    let cards = document.getElementsByClassName('card');

    for (let card of cards) {
        card.addEventListener('click', selectCard);
    }
}

// start timer - credit to https://dev.to/shantanu_jana/create-a-simple-stopwatch-using-javascript-3eoo

let milliseconds = 00;
let seconds = 00; 
let minutes = 00;
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




// function closeModal() {
//     closeIcon.addEventListener("click", function() {
//         gameOver.classList.add('hide');
//         resetGame()
//     });
// }



// Requirements:
// - need to know when the page has loaded (event listener)
// - Animals array populated with the desired animals
// - need to loop through the animals array and create a div containing the name of the animal
// - Write the divs to the DOM (propend the divs to the card area)




// - should I load a scene when the page loads or have a start button?

// add a counter for correct attempts if the counter is = 3 then pop up you have won the game!