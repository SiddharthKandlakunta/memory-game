import { shuffleCard } from "./cards.js";
import { board, modal, modalText, playerInfo, settings } from "./constants.js";
import { GAME_STATE as gs } from "./gamestate.js";
import { renderCurrentPlayer, renderScoreCards } from "./players.js";
import { resetTimer, startTimer } from "./timer.js";

function startGame() {
    shuffleCard();
    if (gs.settings.mode == "vs") {
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
    gs.state.players.scores.forEach((value) => {
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

export function renderGameOverModal() {
    switch (gs.settings.mode) {
        case "vs":
            modalText.innerHTML = generateVSGOText();
            break;
        case "countdown":
            modalText.innerHTML = `You matched ${
                gs.state.totalMatched
            } pairs in ${
                gs.settings.timer.minutes < 10
                    ? `0${gs.settings.timer.minutes}`
                    : gs.settings.timer.minutes
            }:${
                gs.settings.timer.seconds < 10
                    ? `0${gs.settings.timer.seconds}`
                    : gs.settings.timer.seconds
            }!`;
            break;
        case "sprint":
            modalText.innerHTML = `You cleared the ${gs.settings.sideLength}x${gs.settings.sideLength} board in ${gs.state.timer.remainingMinutes}:${gs.state.timer.remainingSeconds}!`;
            break;
        case "freeplay":
            modalText.innerHTML = `You played for ${gs.state.timer.remainingMinutes}:${gs.state.timer.remainingSeconds}. You got ${gs.state.totalMatched} matches.`;
            break;
        default:
            modalText.innerHTML = "Error game over message.";
    }

    modal.style.display = "flex";
}

function cleanGameState() {
    const players = gs.state.players.names;
    gs.state = CLEAN_STATE;
    gs.state.players.names = players;
    const scores = players.map(() => {
        return 0;
    });
    gs.state.players.scores = scores;
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
