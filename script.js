const NUM_CARD_IMAGES = 25;
const ROW_LABELS = ["A", "B", "C", "D", "E", "F", "G", "H"];

const settings = document.getElementById("game-settings");
const board = document.getElementById("game-board");

let sideLength = 4;
let pairs = (sideLength * sideLength) / 2;
let totalMatched = 0;
let matched = 0;

const cardGrid = document.getElementById("cards");
let cardOne, cardTwo;
let disableDeck = false;

const counter = document.getElementById("counter");
const countElement = document.getElementById("count");
let minutes = 0;
let seconds = 0;
let remainingTime = minutes * 60 + seconds;
let timerInterval;

function setCounter() {
    const remainingMinutes = Math.floor(remainingTime / 60);
    const remainingSeconds = remainingTime % 60;

    const formattedMinutes =
        remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
    const formattedSeconds =
        remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    countElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

function countDown() {
    if ((gameMode == "countdown" || gameMode == "vs") && remainingTime <= 0) {
        clearInterval(timerInterval);
        endGame();
        return;
    }

    const remainingMinutes = Math.floor(remainingTime / 60);
    const remainingSeconds = remainingTime % 60;

    const formattedMinutes =
        remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
    const formattedSeconds =
        remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    countElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
    remainingTime--;
}

function countUp() {
    remainingTime++;
    const remainingMinutes = Math.floor(remainingTime / 60);
    const remainingSeconds = remainingTime % 60;

    const formattedMinutes =
        remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
    const formattedSeconds =
        remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    countElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

function editMinutes(min) {
    minutes = min;
    if (minutes < 1 && seconds < 1) {
        seconds = 15;
    }
    if (minutes == 10) {
        seconds = 0;
    }
    remainingTime = minutes * 60 + seconds;
    setCounter();
    getModeSettings();
}

function editSeconds(sec) {
    seconds = sec;
    remainingTime = minutes * 60 + seconds;
    setCounter();
    getModeSettings();
}

function startTimer() {
    counter.style.display = "block";
    clearInterval(timerInterval);
    timerInterval = setInterval(
        gameMode == "sprint" || gameMode == "freeplay" ? countUp : countDown,
        1000
    );
}

function resetTimer() {
    counter.style.display = "none";
    clearInterval(timerInterval);
    remainingTime = minutes * 60 + seconds;
    setCounter();
}

function renderTimerManagement() {
    let options = `
        <h3 style="width: 100%;">Timer</h3>
        <h5 style="width: 100%;">Minutes</h5>
        <div class="time-options">
        `;
    for (let i = 0; i < 11; i++) {
        options +=
            i == minutes
                ? `<div class="time-choice selected">${i}</div>`
                : `<div class="time-choice" onclick="editMinutes(${i})">${i}</div>`;
    }
    options += `
        </div>
        <h5 style="width: 100%;">Seconds</h5>
        <div class="time-options">
        `;
    if (minutes == 10) {
        options += '<div class="time-choice selected">0</div>';
    } else {
        for (let i = 0; i <= 45; i += 15) {
            if (minutes > 0 || i > 0) {
                options +=
                    i == seconds
                        ? `<div class="time-choice selected">${i}</div>`
                        : `<div class="time-choice" onclick="editSeconds(${i})">${i}</div>`;
            }
        }
    }
    options += "</div>";

    return options;
}

const playerInfo = document.getElementById("player-info");
let playerIndex = 0;
let players = ["Player 1", "Player 2"];
let playerScores = [0, 0];

function nextPlayer() {
    playerIndex = (playerIndex + 1) % players.length;
    renderScoreCards();
}

function addPlayer() {
    players.push(`Player ${players.length + 1}`);
    playerScores.push(0);
    getModeSettings();
}

function removePlayer() {
    players.pop();
    playerScores.pop();
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

function renderScoreCards() {
    const scoreContainer = document.getElementById("player-scores");
    scoreContainer.innerHTML = "";
    players.forEach((name, index) => {
        const scoreCard = document.createElement("li");
        scoreCard.innerHTML = `${name} | ${playerScores[index]}`;
        scoreCard.classList.add("score-card");
        if (index == playerIndex) {
            scoreCard.classList.add("selected");
        }
        scoreContainer.appendChild(scoreCard);
    });
}

let gameMode = "freeplay";

function vsOptions() {
    let options = renderPlayerManagement();
    options += renderTimerManagement();
    return options;
}

function countdownOptions() {
    let options = renderTimerManagement();
    return options;
}

function getModeSettings() {
    const modeOptions = document.getElementById("mode-options");
    modeOptions.innerHTML =
        '<h2 style="width: 100%; text-align: center;">Mode Options</h2>';
    switch (gameMode) {
        case "vs":
            modeOptions.innerHTML += vsOptions();
            break;
        case "countdown":
            modeOptions.innerHTML += countdownOptions();
            break;
        case "sprint":
        case "freeplay":
        default:
            modeOptions.innerHTML +=
                '<p style="width: 100%; text-align: center;">No options for this mode.</p>';
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
    if (mode == "freeplay" || mode == "sprint") {
        minutes = 0;
        editSeconds(0);
    } else if (remainingTime == 0) {
        editSeconds(15);
    }
    getModeSettings();
}

function displayGameOverPopup() {
    let winnerMessage = "Game Over!\n";

    alert(winnerMessage);
}

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
        playerScores[playerIndex]++;
        matched++;
        totalMatched++;
        if (matched == pairs) {
            const cards = document.querySelectorAll(".card:not(.label)");
            cards.forEach((card) => {
                setTimeout(() => {
                    card.classList.add("jump");
                }, 400);
            });

            if (gameMode == "sprint") {
                endGame();
            }

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
            nextPlayer();
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
        nextPlayer();
    }, 1200);
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let cards = document.getElementById("cards");
    cards.innerHTML = "";
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
            const card = document.createElement("li");
            if (col == 0 && row == 0) {
                card.classList.add("card", "label");
                card.style.width = `calc(100% / ${sideLength + 1} - 10px)`;
                card.style.height = `calc(100% / ${sideLength + 1} - 10px)`;
            } else if (col == 0) {
                card.classList.add("card", "label");
                card.innerHTML = `<h2>${ROW_LABELS[row - 1]}<h2>`;
                card.style.width = `calc(100% / ${sideLength + 1} - 10px)`;
                card.style.height = `calc(100% / ${sideLength + 1} - 10px)`;
            } else if (row == 0) {
                card.classList.add("card", "label");
                card.innerHTML = `<h2>${col}<h2>`;
                card.style.width = `calc(100% / ${sideLength + 1} - 10px)`;
                card.style.height = `calc(100% / ${sideLength + 1}`;
            } else {
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
            }
            cardGrid.appendChild(card);
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
    if (gameMode == "vs") {
        playerInfo.style.display = "flex";
        renderScoreCards();
    }
    //hide options, show board, and start the game
    settings.style.display = "none";
    board.style.display = "flex";
    startTimer();
}

function cleanGameState() {
    playerScores.forEach((_, index) => {
        playerScores[index] = 0;
    });
    playerIndex = 0;
}

function endGame() {
    playerInfo.style.display = "none";
    settings.style.display = "flex";
    board.style.display = "none";
    cleanGameState();
    resetTimer();
}
getModeSettings();
