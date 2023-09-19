import * as timer from "timer.js";
import {
    NUM_CARD_IMAGES,
    ROW_LABELS,
    FP_DESC,
    VS_DESC,
    CD_DESC,
    SPRINT_DESC
} from "constants.js";

function startGame() {
    shuffleCard();
    if (gameMode == "vs") {
        playerInfo.style.display = "flex";
        renderScoreCards();
        renderCurrentPlayer();
    }
    //hide options, show board, and start the game
    settings.style.display = "none";
    board.style.display = "flex";
    startTimer();
}

function generateVSGOText() {
    let highScore = 0;
    let winners = [];
    playerScores.forEach((value) => {
        highScore = highScore < value ? value : highScore;
    });
    playerScores.forEach((value, index) => {
        if (value == highScore) {
            winners.push(players[index]);
        }
    });

    let text = "";

    if (winners.length > 1) {
        text += `It was a tie between ${winners.length} players with a score of ${highScore}!`;
        text += "<ul>";
        winners.forEach((name) => {
            text += `<li>${name}</li>`;
        });
        text += "<ul>";
    } else {
        text += `${winners[0]} won with a score of ${highScore}!`;
    }

    return text;
}

function renderGameOverModal() {
    const modal = document.getElementById("game-over-modal");
    const modalText = document.getElementById("game-over-text");
    switch (gameMode) {
        case "vs":
            modalText.innerHTML = generateVSGOText();
            break;
        case "countdown":
            modalText.innerHTML = `You matched ${totalMatched} pairs in ${
                minutes < 10 ? `0${minutes}` : minutes
            }:${seconds < 10 ? `0${seconds}` : seconds}!`;
            break;
        case "sprint":
            modalText.innerHTML = `You cleared the ${sideLength}x${sideLength} board in ${getFormattedRemainingMinutes()}:${getFormattedRemainingSeconds()}!`;
            break;
        case "freeplay":
            modalText.innerHTML = `You played for ${getFormattedRemainingMinutes()}:${getFormattedRemainingSeconds()}. You got ${totalMatched} matches.`;
            break;
        default:
            modalText.innerHTML = "Error game over message.";
    }

    modal.style.display = "flex";
}

function cleanGameState() {
    playerScores.forEach((_, index) => {
        playerScores[index] = 0;
    });
    playerIndex = 0;
    totalMatched = 0;
}

function endGame() {
    const modal = document.getElementById("game-over-modal");
    modal.style.display = "none";
    playerInfo.style.display = "none";
    settings.style.display = "flex";
    board.style.display = "none";
    cleanGameState();
    resetTimer();
}

getModeDescription();
getModeSettings();
