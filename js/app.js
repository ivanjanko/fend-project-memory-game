/*
 * Create a list that holds all of your cards
 */

let cardsNodeList;
let cardsClassArray;
let openBlueCards = [];
let timeOut = 800;
let moves;
let stars = document.querySelector(".stars").innerHTML;
let matchedPairs;
//for timer
let seconds = 0;
let minutes = 0;
let timer;
let timeRunning = false;

gameStartAndReset()
addEventListener();

function gameStartAndReset() {
    getCards();
    shuffleClasses();
    assignNewClass();
    restoreMovesCount();
    restoreStars();
    matchedPairs = 0;
    stopTimer()
    
    
};

function allMatched()  {
    openModal();
    populateModal();
    stopTimer();
}

function getCards() {

    // get NodeList
    cardsNodeList =  document.querySelectorAll(".card")
    
    // get card clasess Array
    cardsClassArray =[];
    cardsNodeList.forEach(function(card) {
        cardsClassArray.push(card.firstElementChild.className)
    });
    return cardsClassArray;
}

function shuffleClasses() {

    // shufle cards classes
    shuffle(cardsClassArray);
}

function assignNewClass() {

    cardsNodeList.forEach(function(card, index) {
        // assaign new class to i elements
        card.firstElementChild.className = cardsClassArray[index]
        // assaign card class to li elements
        card.className = "card"
    })
};

function addEventListener() {
    
    // add event listener to each card
    cardsNodeList.forEach(function(card) {
        card.addEventListener("click", function() {
            cardClicked(card)
        })
    })

    // add event listenr on restart element
    document.querySelector(".restart").addEventListener('click', function(){
        gameStartAndReset()
    })
};

function cardClicked(blueCard) {
    openModal()
    // start the timer
    startTimer()

    // if there are less then 2 blue cards
    if (openBlueCards.length < 2) {

        // flip card faceup = change calass
        blueCard.classList.add('open', 'show');

        // add open card to openBlueCards list
        openBlueCards.push(blueCard);
    }
    // if there are two blue cards open
    if (openBlueCards.length === 2) {
        if (areCardsEqual()) {
            toggleClass("card match", openBlueCards);
        } else {
            setTimeout(function () {toggleClass("card", openBlueCards)}, timeOut);     
        }
        updateMovesCount();
        updateStars();
    }
    if (matchedPairs === 8) {
        allMatched();
    }
}

function areCardsEqual() {
    if (openBlueCards[0].firstElementChild.className === openBlueCards[1].firstElementChild.className) {
        matchedPairs++;
        return true;
    }
};
        
function toggleClass(str, cards) {
    for (card in cards) { cards[card].className = str }
    openBlueCards = [];
};

function updateMovesCount() {
    document.querySelector(".moves").innerHTML = ++moves;
};

function restoreMovesCount() {
    moves = 0;
    document.querySelector(".moves").innerHTML = moves;
};

function removeStar(){
    let star = document.querySelector(".fa-star");
    star.className = "fa fa-star-o";
}

function restoreStars(){
    document.querySelector(".stars").innerHTML = stars 
}

function updateStars() {
    if (moves === 5) {removeStar()}
    if (moves === 10) {removeStar()}
    if (moves === 15) {removeStar()}
};

// timer functions

function startTimer() {
    if (timeRunning == false) {
        timer = setInterval(insertTime, 1000);
        timeRunning = true;
    }
}
    
function stopTimer() {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    timeRunning = false;
    document.querySelector(".timer").innerHTML = ""
}
    
function insertTime() {
    seconds++;
    
    if (seconds < 10) { seconds = `0${seconds}`;}
    
    if (seconds >= 60) {
        minutes++;
        if (minutes < 10) { minutes = `0${minutes}`;}
        seconds = "00";
    }

    
    
    // display time
    document.querySelector(".timer").innerHTML = `${minutes} : ${seconds}`;
}
// modal
// get modal element
let modal = document.querySelector("#simpleModal");

// get open modal button
let modalButton = document.querySelector("#modalButton");

// get close modal button
let closeBtn = document.querySelector(".closeBtn");

// listen for play again click
modalButton.addEventListener('click', playAgain);

// listen for close click
closeBtn.addEventListener('click', closeModal);

// function open modal
function openModal() {
    modal.style.display = "block"
    populateModal()
}

// function close modal
function closeModal() {
    modal.style.display = "none"
}

// function populate modal
function populateModal() {
    document.querySelector(".starsModal").innerHTML = document.querySelector(".stars").innerHTML;
    document.querySelector(".movesModal").innerHTML = `${moves} Moves`;
    document.querySelector(".timeModal").innerHTML = `Time to complete  ${document.querySelector(".timer").innerHTML}`
}

function playAgain() {
    closeModal()
    gameStartAndReset()
}

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

