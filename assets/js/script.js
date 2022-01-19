// Wait for the DOM to finish loading before running the game
// Get the buttom elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function(){
            console.log("you pressed a button")
        }) 
    };

    runGame();
})

// For each element in animalsArray, creat a div with the name of the animal and add it to the DOM
function runGame(){
    let animalsArray = ['Cat', 'Dog', 'Mouse', 'Monkey'];
    let card = '';

    for (let animal of animalsArray) {
        card += `<div class="card">${animal}</div>`; 
    }

    let cardArea = document.getElementById('card-area');
    cardArea.innerHTML = card;
}

// let cards = document.getElementsByClassName('card');

// for (let card of cards) {
//     card.addEventListener('click', function(){
//         alert("you clicked the right card");
//         console.log('hello');
//     }) 
// };



// Requirements:
// - need to know when the page has loaded (event listener)
// - Animals array populated with the desired animals
// - need to loop through the animals array and create a div containing the name of the animal
// - Write the divs to the DOM (propend the divs to the card area)




// - should I load a scene when the page loads or have a start button?