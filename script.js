let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
let isButton1Highlighted = true;
let clickCount = 0;
let button1Clicked = false;
let button2Clicked = false;

const countElement = document.getElementById("count");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
let totalTime = 1 * 10; // 8 minutes in seconds
let remainingTime = totalTime;
let timerInterval;

let player1Name = "Player 1"; // Default name for player 1
let player2Name = "Player 2"; // Default name for player 2

function updateCounter() {
    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        displayGameOverPopup();
        return;
    }

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    countElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
    remainingTime--;
}

function displayGameOverPopup() {
    let winnerMessage = "Game Over!\n";
    if (score1 > score2) {
        winnerMessage += `Winner is ${player1Name} with a score of ${score1}`;
    } else if (score1 < score2) {
        winnerMessage += `Winner is ${player2Name} with a score of ${score2}`;
    } else {
        winnerMessage += "It's a tie!";
    }

    alert(winnerMessage);
}

startButton.addEventListener("click", function () {
    // Clear any existing interval to prevent multiple countdowns
    clearInterval(timerInterval);

    // Start the countdown
    timerInterval = setInterval(updateCounter, 1000);
});

resetButton.addEventListener("click", function () {
    // Reset the countdown timer
    clearInterval(timerInterval);
    remainingTime = totalTime;
    updateCounter();
    location.reload();
});

// Initialize the counter display
updateCounter();

function flipCard({ target: clickedCard }) {
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return (cardOne = clickedCard);
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
            cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;
        if (matched == 18) {
            const cards = document.querySelectorAll(".card");
            cards.forEach((card) => {
                setTimeout(() => {
                    card.classList.add("jump");
                }, 400);
                setTimeout(() => {
                    card.classList.remove("jump");
                }, 1200);
            });
            setTimeout(() => {
                return shuffleCard();
            }, 2000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        setTimeout(() => {
            cardOne.classList.add("jump");
            cardTwo.classList.add("jump");
        }, 400);

        setTimeout(() => {
            cardOne.classList.remove("jump");
            cardTwo.classList.remove("jump");
            cardOne = cardTwo = "";
            disableDeck = false;
        }, 1200);
        return;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    document.getElementById("cards").innerHTML = "";
    let arr = [];
    for (let i = 1; i <= (6 * 6) / 2; i++) {
        arr.push(i);
        arr.push(i);
    }
    arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
    arr.forEach((value) => {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML += `
            <div class="view front-view">
                <img src="images/back_icon.svg" alt="icon">
            </div>
            <div class="view back-view">
                <img src="images/Rune-${value}.svg" alt="Rune ${value}">
            </div>
        `;
        card.addEventListener("click", flipCard);
        document.getElementById("cards").appendChild(card);
    });
}

shuffleCard();

cards.forEach((card) => {
    card.addEventListener("click", flipCard);
});

button1.addEventListener("click", () => {
    if (!button1Clicked) {
        const name = prompt("Enter a name for Button 1:");
        if (name !== null) {
            player1Name = name;
            button1.textContent = name;
            button1Clicked = true;
            button1.disabled = true;
        }
    }
});

button2.addEventListener("click", () => {
    if (!button2Clicked) {
        const name = prompt("Enter a name for Button 2:");
        if (name !== null) {
            player2Name = name;
            button2.textContent = name;
            button2Clicked = true;
            button2.disabled = true;
        }
    }
});

document.addEventListener("click", () => {
    clickCount++;
    if (clickCount < 0) {
        if (isButton1Highlighted) {
            button1.classList.remove("highlight");
            button2.classList.add("highlight");
        } else {
            button1.classList.add("highlight");
            button2.classList.remove("highlight");
        }
        isButton1Highlighted = !isButton1Highlighted;
        clickCount = 0;
    }
});

button1.classList.add("highlight");

const incrementButton1 = document.querySelector(
    ".user-score .increment-button"
);
const decrementButton1 = document.querySelector(
    ".user-score .decrement-button"
);
const scoreValue1 = document.querySelector(".score-value_1");

const incrementButton2 = document.querySelectorAll(
    ".user-score .increment-button"
)[1];
const decrementButton2 = document.querySelectorAll(
    ".user-score .decrement-button"
)[1];
const scoreValue2 = document.querySelector(".score-value_2");

let score1 = 0;
let score2 = 0;

incrementButton1.addEventListener("click", () => {
    score1++;
    scoreValue1.textContent = score1;
});

decrementButton1.addEventListener("click", () => {
    if (score1 > 0) {
        score1--;
        scoreValue1.textContent = score1;
    }
});

incrementButton2.addEventListener("click", () => {
    score2++;
    scoreValue2.textContent = score2;
});

decrementButton2.addEventListener("click", () => {
    if (score2 > 0) {
        score2--;
        scoreValue2.textContent = score2;
    }
});
