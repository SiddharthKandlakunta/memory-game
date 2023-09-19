function startGame() {
    shuffleCard();
    if (GAME_STATE.settings.mode == "vs") {
        playerInfo.style.display = "flex";
        renderScoreCards();
        renderCurrentPlayer();
    }
    //hide options, show board, and start the game
    settinGAME_STATE.style.display = "none";
    board.style.display = "flex";
    startTimer();
}

function generateVSGOText() {
    let highScore = 0;
    let winners = [];
    GAME_STATE.state.players.scores.forEach((value) => {
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
    switch (GAME_STATE.settings.mode) {
        case "vs":
            modalText.innerHTML = generateVSGOText();
            break;
        case "countdown":
            modalText.innerHTML = `You matched ${
                GAME_STATE.state.totalMatched
            } pairs in ${
                GAME_STATE.settings.timer.minutes < 10
                    ? `0${GAME_STATE.settings.timer.minutes}`
                    : GAME_STATE.settings.timer.minutes
            }:${
                GAME_STATE.settings.timer.seconds < 10
                    ? `0${GAME_STATE.settings.timer.seconds}`
                    : GAME_STATE.settings.timer.seconds
            }!`;
            break;
        case "sprint":
            modalText.innerHTML = `You cleared the ${GAME_STATE.settings.sideLength}x${GAME_STATE.settings.sideLength} board in ${GAME_STATE.state.timer.remainingMinutes}:${GAME_STATE.state.timer.remainingSeconds}!`;
            break;
        case "freeplay":
            modalText.innerHTML = `You played for ${GAME_STATE.state.timer.remainingMinutes}:${GAME_STATE.state.timer.remainingSeconds}. You got ${GAME_STATE.state.totalMatched} matches.`;
            break;
        default:
            modalText.innerHTML = "Error game over message.";
    }

    modal.style.display = "flex";
}

function cleanGameState() {
    const players = GAME_STATE.state.players.names;
    GAME_STATE.state = CLEAN_STATE;
    GAME_STATE.state.players.names = players;
    const scores = players.map(() => {
        return 0;
    });
    GAME_STATE.state.players.scores = scores;
}

function endGame() {
    const modal = document.getElementById("game-over-modal");
    modal.style.display = "none";
    playerInfo.style.display = "none";
    settinGAME_STATE.style.display = "flex";
    board.style.display = "none";
    cleanGameState();
    resetTimer();
}

getModeDescription();
getModeSettings();
