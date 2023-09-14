const NUM_CARD_IMAGES = 25;
const ROW_LABELS = ["A", "B", "C", "D", "E", "F", "G", "H"];

let sideLength = 4;
let pairs = (sideLength * sideLength) / 2;
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
let minutes = 1;
let seconds = 0;
let remainingTime = minutes * 60 + seconds;
let timerInterval;

function updateCounter() {
    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        displayGameOverPopup();
        return;
    }

    const currMinutes = Math.floor(remainingTime / 60);
    const currSeconds = remainingTime % 60;

    const formattedMinutes = currMinutes < 10 ? `0${currMinutes}` : currMinutes;
    const formattedSeconds = currSeconds < 10 ? `0${currSeconds}` : currSeconds;

    countElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
    remainingTime--;
}

function startTimer() {
    // Clear any existing interval to prevent multiple countdowns
    clearInterval(timerInterval);
    // Start the countdown
    timerInterval = setInterval(updateCounter, 1000);
}

function resetTimer() {
    // Reset the countdown timer
    clearInterval(timerInterval);
    remainingTime = totalTime;
}

function renderTimerManagement() {
    let options = `
        <h3 style="width: 100%;">Timer</h3>
        <div class="time-options">
            <select class="minute-selector" name="minutes" id="minutes" value="1" onchange="editMinutes(event)">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            ${" Minutes "}
            <select class="second-selector" name="seconds" id="seconds" value="0" onchange="editSeconds(event)">
                <option value="0">0</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
            </select>
            ${" Seconds"}
        </div>
    `;

    return options;
}

function editMinutes(e) {
    minutes = e.target.value;
    remainingTime = minutes * 60 + seconds;
    updateCounter();
}

function editSeconds(e) {
    seconds = e.target.value;
    remainingTime = minutes * 60 + seconds;
    updateCounter();
}

let gameMode = "freeplay";

function getModeSettings() {
    const modeOptions = document.getElementById("mode-options");
    modeOptions.innerHTML =
        '<h2 style="width: 100%; text-align: center;">Mode Options</h2>';
    switch (gameMode) {
        case "vs":
            modeOptions.innerHTML += vsOptions();
            break;
        case "countdown":
            break;
        case "freeplay":
        default:
    }
}

function changeMode(mode) {
    const selected = document.querySelector(
        ".mode-section .mode-choice.selected"
    );
    selected.classList.remove("selected");
    const newSelected = document.querySelector(
        ".mode-section .mode-choice#" + mode
    );
    newSelected.classList.add("selected");
    gameMode = mode;
    getModeSettings();
}

let players = ["Player 1", "Player 2"];

function addPlayer() {
    players.push(`Player ${players.length + 1}`);
    getModeSettings();
}

function removePlayer() {
    players.pop();
    getModeSettings();
}

function editPlayer(e, index) {
    players[index] = e.target.value;
}

function renderPlayerManagement() {
    //Player Options
    let options = '<h3 style="width: 100%;">Players</h3>';
    options += '<div class="player-list">';
    players.forEach((player, index) => {
        options += `<input class="player-name" type="text" id="Player-${index}" name="player-${index}" value="${player}" onchange="editPlayer(event, ${index})"/>`;
    });
    options +=
        '<button class="add-player-btn" type="button" onclick="addPlayer()">+ Add Player</button>';
    if (players.length > 2) {
        options +=
            '<button class="remove-player-btn" type="button" onclick="removePlayer()">- Remove Player</button>';
    }
    options += "</div>";

    return options;
}

function vsOptions() {
    let options = renderPlayerManagement();
    options += renderTimerManagement();

    return options;
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
        if (matched == pairs) {
            const cards = document.querySelectorAll(".card:not(.label)");
            cards.forEach((card) => {
                setTimeout(() => {
                    card.classList.add("jump");
                }, 400);
            });
            setTimeout(() => {
                return shuffleCard();
            }, 1200);
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
    let cards = document.getElementById("cards");
    cards.innerHTML = "";
    cards.style.width = `calc(100px * ${sideLength + 1})`;
    cards.style.height = `calc(100px * ${sideLength + 1})`;
    let arr = [];
    let arr2 = [];
    for (let i = 0; i < (sideLength * sideLength) / 2; i++) {
        arr.push((i % 25) + 1);
        arr2.push((i % 25) + 1);
    }
    const runes = arr.concat(arr2);
    runes.sort(() => (Math.random() > 0.5 ? 1 : -1));
    for (let row = 0; row < sideLength + 1; row++) {
        for (let col = 0; col < sideLength + 1; col++) {
            if (col == 0 && row == 0) {
                const card = document.createElement("li");
                card.classList.add("card", "label");
                card.style.width = `calc(100% / ${sideLength + 1} - 10px)`;
                card.style.height = `calc(100% / ${sideLength + 1} - 10px)`;
                document.getElementById("cards").appendChild(card);
            } else if (col == 0) {
                const card = document.createElement("li");
                card.classList.add("card", "label");
                card.innerHTML = `<h2>${ROW_LABELS[row - 1]}<h2>`;
                card.style.width = `calc(100% / ${sideLength + 1} - 10px)`;
                card.style.height = `calc(100% / ${sideLength + 1} - 10px)`;
                document.getElementById("cards").appendChild(card);
            } else if (row == 0) {
                const card = document.createElement("li");
                card.classList.add("card", "label");
                card.innerHTML = `<h2>${col}<h2>`;
                card.style.width = `calc(100% / ${sideLength + 1} - 10px)`;
                card.style.height = `calc(100% / ${sideLength + 1} - 10px)`;
                document.getElementById("cards").appendChild(card);
            } else {
                const card = document.createElement("li");
                card.classList.add("card");
                card.innerHTML += `
            <div class="view front-view">
                <img src="images/back_icon.svg" alt="icon">
            </div>
            <div class="view back-view">
                <img src="images/Rune-${
                    runes[(row - 1) * sideLength + (col - 1)]
                }.svg" alt="Rune ${runes[(row - 1) * sideLength + (col - 1)]}">
            </div>
        `;
                card.addEventListener("click", flipCard);
                card.style.width = `calc(100% / ${sideLength + 1} - 10px)`;
                card.style.height = `calc(100% / ${sideLength + 1} - 10px)`;
                document.getElementById("cards").appendChild(card);
            }
        }
    }
}

function changeBoardSize(size, id) {
    const selected = document.querySelector(
        ".game-options .board-size-container .board-size-option.selected"
    );
    selected.classList.remove("selected");
    const newSelected = document.querySelector(
        ".game-options .board-size-container .board-size-option#" + id
    );
    newSelected.classList.add("selected");
    sideLength = size;
    pairs = (sideLength * sideLength) / 2;
    shuffleCard();
}

function startGame() {
    shuffleCard();
    //hide options, show board, and start the game
}

function endGame() {
    //hide board, show options
}

shuffleCard();
getModeSettings();

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
