export let gameMode = "freeplay";

function vsOptions() {
    let options = renderPlayerManagement();
    options += renderTimerManagement();
    return options;
}

function countdownOptions() {
    let options = renderTimerManagement();
    return options;
}

export function getModeSettings() {
    const modeOptions = document.getElementById("mode-options");
    modeOptions.innerHTML =
        '<h2 style="width: 100%; text-align: center;">Mode Options</h2>';
    switch (gameMode) {
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

export function getModeDescription() {
    const description = document.getElementById("desc-text");
    switch (gameMode) {
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

export function changeMode(mode) {
    const selected = document.querySelector(
        ".mode-section .mode-choice.selected"
    );
    selected.classList.remove("selected");
    const newSelected = document.querySelector(
        ".mode-section .mode-choice#" + mode
    );
    newSelected.classList.add("selected");
    gameMode = mode;
    if (mode == "freeplay" || mode == "sprint") {
        minutes = 0;
        editSeconds(0);
    } else if (remainingTime == 0) {
        editSeconds(15);
    }
    getModeSettings();
    getModeDescription();
}
