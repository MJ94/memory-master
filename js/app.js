let cardDeck = document.querySelector(".deck");
let openCards = [];
let moves = 0;
let clockId;
let clockOff = true;
let time = 0;
let matched = 0;
const TOTAL_PAIRS = 8;


// Shuffle function modified from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

cardDeck.addEventListener("click", event => {
    const clickTarget = event.target;
    if (isClickValid(clickTarget)) {
        toggleCards(clickTarget);
        addToggledCard(clickTarget);
        if (clockOff) {
            startTimer();
            clockOff = false;
        }

        if (openCards.length === 2) {
            addMove();
            checkScore();
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
        matched++;
        if (matched === TOTAL_PAIRS) {
            gameOver();
        }
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

const shuffleDeck = () => {
    const cardsToShuffle = Array.from(document.querySelectorAll(".card"));
    const shuffledCards = shuffle(cardsToShuffle);
    for (card of shuffledCards) {
        cardDeck.appendChild(card);
    }
};

shuffleDeck();

const addMove = () => {
    moves++;
    const movesText = document.querySelector(".moves");
    if (moves === 1) {
        movesText.innerHTML = `${moves} Move`
    } else {
            movesText.innerHTML = `${moves} Moves`
        }
    };

const hideStar = () => {
    const stars = document.querySelectorAll(".stars li");
    for (star of stars) {
        if (star.style.display !== "none") {
            star.style.display = "none";
            break;
        }
    }
};

const countStars = () => {
    const stars = document.querySelectorAll(".stars li");
    let numOfStars = 0;
    for (star of stars) {
        if (star.style.display !== 'none') {
            numOfStars++;
        }
    }
    return numOfStars;
};

const checkScore = () => {
    if (moves === 15 || moves === 22) {
        hideStar();
    }
};

const startTimer = () => {
    clockId = setInterval(() => {
        time++;
        showTime();
    }, 1000);
};

const stopTimer = () => {
    clearInterval(clockId)
};

const showTime = () => {
    const clock = document.querySelector(".clock");
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (seconds < 10) {
        clock.innerHTML = `${minutes}:0${seconds}`;
    } else {
        clock.innerHTML = `${minutes}:${seconds}`;
    }
};

const toggleModal = () => {
    const modal = document.querySelector(".modal_background");
    modal.classList.toggle("hide");
};

const writeToModal = () => {
    const timeStat = document.querySelector(".modal_time");
    const clockTime = document.querySelector(".clock").innerHTML;
    const movesStat = document.querySelector(".modal_moves");
    const starsStat = document.querySelector(".modal_stars");

    timeStat.innerHTML = `Time: ${clockTime}`;
    movesStat.innerHTML = `Moves: ${moves}`;
    starsStat.innerHTML = `Stars: ${countStars()}`;

};

const gameOver = () => {
    stopTimer();
    writeToModal();
    toggleModal();
};