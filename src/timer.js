export const counter = document.getElementById("counter");
export const countElement = document.getElementById("count");
export let minutes = 0;
export let seconds = 0;
export let remainingTime = minutes * 60 + seconds;
export let timerInterval;

export function setCounter() {
    const remainingMinutes = Math.floor(remainingTime / 60);
    const remainingSeconds = remainingTime % 60;

    const formattedMinutes =
        remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
    const formattedSeconds =
        remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    countElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

export function getFormattedRemainingMinutes() {
    const remainingMinutes = Math.floor(remainingTime / 60);
    return remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
}

export function getFormattedRemainingSeconds() {
    const remainingSeconds = remainingTime % 60;
    return remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
}

export function countDown() {
    if ((gameMode == "countdown" || gameMode == "vs") && remainingTime <= 0) {
        clearInterval(timerInterval);
        renderGameOverModal();
        return;
    }

    countElement.textContent = `${getFormattedRemainingMinutes()}:${getFormattedRemainingSeconds()}`;
    remainingTime--;
}

export function countUp() {
    countElement.textContent = `${getFormattedRemainingMinutes()}:${getFormattedRemainingSeconds()}`;
    remainingTime++;
}

export function editMinutes(min) {
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

export function editSeconds(sec) {
    seconds = sec;
    remainingTime = minutes * 60 + seconds;
    setCounter();
    getModeSettings();
}

export function startTimer() {
    counter.style.display = "block";
    clearInterval(timerInterval);
    timerInterval = setInterval(
        gameMode == "sprint" || gameMode == "freeplay" ? countUp : countDown,
        1000
    );
}

export function resetTimer() {
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
