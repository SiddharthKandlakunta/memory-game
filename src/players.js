import { currPlayer, scoreContainer } from "./constants.js";
import { GAME_STATE as gs } from "./gamestate.js";
import { getModeSettings } from "./mode.js";

export function nextPlayer() {
    gs.state.players.currIndex =
        (gs.state.players.currIndex + 1) % gs.state.players.names.length;
    renderScoreCards();
    renderCurrentPlayer();
}

export function addPlayer() {
    gs.state.players.names.push(`Player ${players.length + 1}`);
    gs.state.players.scores.push(0);
    getModeSettings();
}

export function removePlayer() {
    gs.state.players.names.pop();
    gs.state.players.scores.pop();
    getModeSettings();
}

export function editPlayer({ target }) {
    gs.state.players.names[target.id.split("-")[1]] = target.value;
}

export function renderPlayerManagement() {
    //Player Options
    let options = '<h3 style="width: 100%;">Players</h3>';
    options += '<div class="player-list">';
    gs.state.players.names.forEach((player, index) => {
        options += `<input class="player-name" type="text" id="Player-${index}" name="player-${index}" value="${player}" onchange="editPlayer(event, ${index})"/>`;
    });
    options +=
        '<button class="add-player-btn" id="add-player-button" type="button">+ Add Player</button>';
    if (gs.state.players.names.length > 2) {
        options +=
            '<button class="remove-player-btn" id="remove-player-button" type="button">- Remove Player</button>';
    } else {
        options +=
            '<button class="remove-player-btn" id="remove-player-button" type="button" style="display: none;">- Remove Player</button>';
    }
    options += "</div>";

    return options;
}

export function renderScoreCards() {
    scoreContainer.innerHTML = "";
    gs.state.players.names.forEach((name, index) => {
        const scoreCard = document.createElement("li");
        scoreCard.innerHTML = `${name} | ${gs.state.players.scores[index]}`;
        scoreCard.classList.add("score-card");
        if (index == gs.state.players.currIndex) {
            scoreCard.classList.add("selected");
        }
        scoreContainer.appendChild(scoreCard);
    });
}

export function renderCurrentPlayer() {
    currPlayer.innerHTML = `${
        gs.state.players.names[gs.state.players.currIndex]
    }'s turn!`;
}
