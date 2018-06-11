/*
 * Create a list that holds all of your cards
 */

let cardList = document.querySelectorAll(".card");
let cardsClassList = [];
let openBlueCards = [];
let timeOut = 1200;
let moves = 0;

// get all card clasess
cardList.forEach(function(element) {cardsClassList.push(element.firstElementChild.className)});
console.log(cardsClassList)

// shufle cards classes
var newCardsClassList = shuffle(cardsClassList);
console.log(newCardsClassList)

// assaign classes to card elements
cardList.forEach(function(element, index) {
    console.log(element.firstElementChild.className, index)
    element.firstElementChild.className = newCardsClassList[index]
});



// add event listener to each card
cardList.forEach(function(element) {
    element.addEventListener("click", function() {

        // if there are less then 2 blue cards
        if (openBlueCards.length < 2) {

            // flip card faceup = change calass
            element.classList.add('open', 'show');

            // add open card to openBlueCards list
            openBlueCards.push(element);
        }
        // if there are two blue cards open
        if (openBlueCards.length === 2) {
            if (areCardsEqual()) {
                forEachBlueCardSetClass("card match"); 
            } else {
                setTimeout(function () {forEachBlueCardSetClass("card")}, timeOut);                
            }
        }
    });
});

function areCardsEqual() {
    return openBlueCards[0].firstElementChild.className === openBlueCards[1].firstElementChild.className;
};
        
function forEachBlueCardSetClass(str) {
    for (card in openBlueCards) { openBlueCards[card].className = str }
    openBlueCards = [];
    updateMoves();
};

function updateMoves() {
    moves++;
    document.querySelector(".moves").innerHTML = moves;
};
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
