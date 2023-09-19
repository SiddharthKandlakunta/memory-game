import { GAME_STATE as gs } from "./gamestate.js";
import { countElement } from "./constants.js";
import { renderGameOverModal } from "./game.js";
import { getModeSettings } from "./mode.js";

function setCounter() {
    setRemainingMinutes();
    setRemainingSeconds();
    countElement.textContent = `${gs.state.timer.remainingMinutes}:${gs.state.timer.remainingSeconds}`;
}

function setRemainingMinutes() {
    const minutes = Math.floor(gs.state.timer.remainingTime / 60);

    gs.state.timer.remainingMinutes =
        minutes < 10 ? `0${minutes}` : `${minutes}`;
}

function setRemainingSeconds() {
    const seconds = gs.state.timer.remainingTime % 60;

    gs.state.timer.remainingSeconds =
        seconds < 10 ? `0${seconds}` : `${seconds}`;
}

function countDown() {
    if (
        (gs.settings.mode == "countdown" || gs.settings.mode == "vs") &&
        gs.state.timer.remainingTime <= 0
    ) {
        clearInterval(gs.state.timer.interval);
        renderGameOverModal();
        return;
    }

    setCounter();
    gs.state.timer.remainingTime--;
}

function countUp() {
    setCounter();
    gs.state.timer.remainingTime++;
}

export function editMinutes(e, min) {
    e.preventDefault();
    gs.settings.timer.minutes = min;
    if (gs.settings.timer.minutes < 1 && gs.settings.timer.seconds < 1) {
        gs.settings.timer.seconds = 15;
    }
    if (gs.settings.timer.minutes == 10) {
        gs.settings.timer.seconds = 0;
    }
    gs.state.timer.remainingTime =
        gs.settings.timer.minutes * 60 + gs.settings.timer.seconds;
    setCounter();
    getModeSettings();
}

export function editSeconds(e, sec) {
    e.preventDefault();
    gs.settings.timer.seconds = sec;
    gs.state.timer.remainingTime =
        gs.settings.timer.minutes * 60 + gs.settings.timer.seconds;
    setCounter();
    getModeSettings();
}

export function startTimer() {
    counter.style.display = "block";
    clearInterval(gs.state.timer.interval);
    gs.state.timer.interval = setInterval(
        gs.settings.mode == "sprint" || gs.settings.mode == "freeplay"
            ? countUp
            : countDown,
        1000
    );
}

export function resetTimer() {
    counter.style.display = "none";
    clearInterval(gs.state.timer.interval);
    gs.state.timer.remainingTime =
        gs.settings.timer.minutes * 60 + gs.settings.timer.seconds;
    setCounter();
}

export function renderTimerManagement() {
    let options = `
        <h3 style="width: 100%;">Timer</h3>
        <h5 style="width: 100%;">Minutes</h5>
        <div class="time-options">
        `;
    for (let i = 0; i < 11; i++) {
        options +=
            i == gs.settings.timer.minutes
                ? `<div class="time-choice minute selected" id="Min-${i}">${i}</div>`
                : `<button class="time-choice minute" id="Min-${i}">${i}</button>`;
    }
    options += `
        </div>
        <h5 style="width: 100%;">Seconds</h5>
        <div class="time-options">
        `;
    if (gs.settings.timer.minutes == 10) {
        options += '<div class="time-choice selected">0</div>';
    } else {
        for (let i = 0; i <= 45; i += 15) {
            if (gs.settings.timer.minutes > 0 || i > 0) {
                options +=
                    i == gs.settings.timer.seconds
                        ? `<div class="time-choice second selected" id="Sec-${i}">${i}</div>`
                        : `<button class="time-choice second" id="Sec-${i}">${i}</button>`;
            }
        }
    }
    options += "</div>";

    return options;
}
