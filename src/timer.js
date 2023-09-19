function setCounter() {
    setRemainingMinutes();
    setRemainingSeconds();
    countElement.textContent = `${GAME_STATE.state.timer.remainingMinutes}:${GAME_STATE.state.timer.remainingSeconds}`;
}

function setRemainingMinutes() {
    const minutes = Math.floor(GAME_STATE.state.timer.remainingTime / 60);

    GAME_STATE.state.timer.remainingMinutes =
        minutes < 10 ? `0${minutes}` : `${minutes}`;
}

function setRemainingSeconds() {
    const seconds = GAME_STATE.state.timer.remainingTime % 60;

    GAME_STATE.state.timer.remainingSeconds =
        seconds < 10 ? `0${seconds}` : `${seconds}`;
}

function countDown() {
    if (
        (GAME_STATE.settings.mode == "countdown" ||
            GAME_STATE.settings.mode == "vs") &&
        GAME_STATE.state.timer.remainingTime <= 0
    ) {
        clearInterval(GAME_STATE.state.timer.interval);
        renderGameOverModal();
        return;
    }

    setCounter();
    GAME_STATE.state.timer.remainingTime--;
}

function countUp() {
    setCounter();
    GAME_STATE.state.timer.remainingTime++;
}

function editMinutes(min) {
    GAME_STATE.settings.timer.minutes = min;
    if (
        GAME_STATE.settings.timer.minutes < 1 &&
        GAME_STATE.settings.timer.seconds < 1
    ) {
        GAME_STATE.settings.timer.seconds = 15;
    }
    if (GAME_STATE.settings.timer.minutes == 10) {
        GAME_STATE.settings.timer.seconds = 0;
    }
    GAME_STATE.state.timer.remainingTime =
        GAME_STATE.settings.timer.minutes * 60 +
        GAME_STATE.settings.timer.seconds;
    setCounter();
    getModeSettings();
}

function editSeconds(sec) {
    GAME_STATE.settings.timer.seconds = sec;
    GAME_STATE.state.timer.remainingTime =
        GAME_STATE.settings.timer.minutes * 60 +
        GAME_STATE.settings.timer.seconds;
    setCounter();
    getModeSettings();
}

function startTimer() {
    counter.style.display = "block";
    clearInterval(GAME_STATE.state.timer.interval);
    GAME_STATE.state.timer.interval = setInterval(
        GAME_STATE.settings.mode == "sprint" ||
            GAME_STATE.settings.mode == "freeplay"
            ? countUp
            : countDown,
        1000
    );
}

function resetTimer() {
    counter.style.display = "none";
    clearInterval(GAME_STATE.state.timer.interval);
    GAME_STATE.state.timer.remainingTime =
        GAME_STATE.settings.timer.minutes * 60 +
        GAME_STATE.settings.timer.seconds;
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
                : `<button class="time-choice" onclick="editMinutes(${i})">${i}</button>`;
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
                        : `<button class="time-choice" onclick="editSeconds(${i})">${i}</button>`;
            }
        }
    }
    options += "</div>";

    return options;
}
