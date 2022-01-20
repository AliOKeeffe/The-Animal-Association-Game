let animalsArray = ['Cat', 'Dog', 'Mouse', 'Monkey', 'Sheep', 'Cow', 'Pig', 'Horse'];
let colorArray = ['Blue', 'Green', 'Purple', 'Orange', 'Yellow'];
let correctAnswers = 0;


// Wait for the DOM to finish loading before running the game
// Get the buttom elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function () {
            alert("you pressed a button");
        })
    }

    runGame();

    let cards = document.getElementsByClassName('card');

    for (let card of cards) {
        card.addEventListener('click', function () {
            cardSelection(card);
        });
    }
})

function cardSelection(card) {

    if (animalsArray.includes(card.textContent)) {

        card.classList.add('correct-card');
        correctAnswers += 1;

        if (correctAnswers == 3) {
            let modal = document.getElementById("modal");
            modal.style.visibility = "visible";
        }
    } else {
        alert('Incorrect, sorry! ' + card.textContent + ' is not an animal');
    }
}

// For each element in animalsArray, creat a div with the name of the animal and add it to the DOM
function runGame() {
    let animalsArray2 = [...animalsArray];
    let newArray = [];

    for (let i = 0; i < 3; i++) {
        // Loop through animalsArray and get three random animals and push into newArray
        let animalIndex = Math.floor(Math.random() * animalsArray2.length);
        newArray.push(animalsArray2[animalIndex]);
        // Remove animals pushed into newArray from the animalsArray2 so they cannot be selected more than once
        animalsArray2.splice(animalIndex, 1);
    }

    for (let i = 0; i < 2; i++) {
        let colors = Math.floor(Math.random() * colorArray.length);
        newArray.push(colorArray[colors]);
        colorArray.splice(colors, 1)
    }

    console.log(newArray);


    let cardHtml = '';
    for (let i of newArray) {
        cardHtml += `<div class="card">${i}</div>`;
    }

    let cardArea = document.getElementById('card-area');
    cardArea.innerHTML = cardHtml;
}





// Requirements:
// - need to know when the page has loaded (event listener)
// - Animals array populated with the desired animals
// - need to loop through the animals array and create a div containing the name of the animal
// - Write the divs to the DOM (propend the divs to the card area)




// - should I load a scene when the page loads or have a start button?

// add a counter for correct attempts if the counter is = 3 then pop up you have won the game!