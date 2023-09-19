export const playerInfo = document.getElementById("player-info");
export let playerIndex = 0;
export let players = ["Player 1", "Player 2"];
export let playerScores = [0, 0];

export function nextPlayer() {
    playerIndex = (playerIndex + 1) % players.length;
    renderScoreCards();
    renderCurrentPlayer();
}

export function addPlayer() {
    players.push(`Player ${players.length + 1}`);
    playerScores.push(0);
    getModeSettings();
}

export function removePlayer() {
    players.pop();
    playerScores.pop();
    getModeSettings();
}

export function editPlayer(e, index) {
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

function renderCurrentPlayer() {
    const currPlayer = document.getElementById("current-player");
    currPlayer.innerHTML = `${players[playerIndex]}'s turn!`;
}
