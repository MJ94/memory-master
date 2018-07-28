/*
 * Create a list that holds all of your cards
 */

let cardDeck = document.querySelector(".deck");

let openCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/* Shuffle function from http://stackoverflow.com/a/2450976
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
} */

/*
 * set up the event listener for a card. If a card is clicked:
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

cardDeck.addEventListener("click", event => {
    const clickTarget = event.target;
    if (isClickValid(clickTarget)) {
        toggleCards(clickTarget);
        addToggledCard(clickTarget);

        if (openCards.length === 2) {
            checkMatch();
        }
    }
});

const toggleCards = clickTarget => {
    clickTarget.classList.toggle("open");
    clickTarget.classList.toggle("show");
};

const addToggledCard = clickTarget => {
    openCards.push(clickTarget);
};

const checkMatch = () => {
    if (
        openCards[0].firstElementChild.className ===
        openCards[1].firstElementChild.className
    ) {
        openCards[0].classList.toggle("match");
        openCards[1].classList.toggle("match");
        toggleCards(openCards[0]);
        toggleCards(openCards[1]);
        openCards = [];
    } else {
        setTimeout(() => {
            toggleCards(openCards[0]);
            toggleCards(openCards[1]);
            openCards = [];
        }, 1000);
    }
};

const isClickValid = clickTarget => {
    return (
        clickTarget.classList.contains('card') &&
        !clickTarget.classList.contains("match") &&
        openCards.length < 2 &&
        !openCards.includes(clickTarget)
    );
};