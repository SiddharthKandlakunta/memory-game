function nextPlayer() {
    GAME_STATE.state.players.currIndex =
        (GAME_STATE.state.players.currIndex + 1) %
        GAME_STATE.state.players.names.length;
    renderScoreCards();
    renderCurrentPlayer();
}

function addPlayer() {
    GAME_STATE.state.players.names.push(`Player ${players.length + 1}`);
    GAME_STATE.state.players.scores.push(0);
    getModeSettings();
}

function removePlayer() {
    GAME_STATE.state.players.names.pop();
    GAME_STATE.state.players.scores.pop();
    getModeSettings();
}

function editPlayer(e, index) {
    GAME_STATE.state.players.names[index] = e.target.value;
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
    scoreContainer.innerHTML = "";
    GAME_STATE.state.players.names.forEach((name, index) => {
        const scoreCard = document.createElement("li");
        scoreCard.innerHTML = `${name} | ${GAME_STATE.state.players.scores[index]}`;
        scoreCard.classList.add("score-card");
        if (index == GAME_STATE.state.players.currIndex) {
            scoreCard.classList.add("selected");
        }
        scoreContainer.appendChild(scoreCard);
    });
}

function renderCurrentPlayer() {
    currPlayer.innerHTML = `${
        GAME_STATE.state.players.names[GAME_STATE.state.players.currIndex]
    }'s turn!`;
}
