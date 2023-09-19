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
    modeOptions.innerHTML =
        '<h2 style="width: 100%; text-align: center;">Mode Options</h2>';
    switch (GAME_STATE.settings.mode) {
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

function getModeDescription() {
    switch (GAME_STATE.settings.mode) {
        case "vs":
            description.innerHTML = VS_DESC;
            break;
        case "countdown":
            description.innerHTML = CD_DESC;
            break;
        case "sprint":
            description.innerHTML = SPRINT_DESC;
            break;
        case "freeplay":
            description.innerHTML = FP_DESC;
            break;
        default:
            modeOptions.innerHTML = "Error loading mode description.";
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
    GAME_STATE.settings.mode = mode;
    if (mode == "freeplay" || mode == "sprint") {
        GAME_STATE.settings.timer.minutes = 0;
        editSeconds(0);
    } else if (remainingTime == 0) {
        editSeconds(15);
    }
    getModeSettings();
    getModeDescription();
}
