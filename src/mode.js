import { GAME_STATE as gs } from "./gamestate.js";
import {
    addPlayer,
    editPlayer,
    removePlayer,
    renderPlayerManagement
} from "./players.js";
import { editMinutes, editSeconds, renderTimerManagement } from "./timer.js";
import {
    CD_DESC,
    FP_DESC,
    SPRINT_DESC,
    VS_DESC,
    description,
    modeOptions
} from "./constants.js";

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
    modeOptions.innerHTML =
        '<h2 style="width: 100%; text-align: center;">Mode Options</h2>';
    switch (gs.settings.mode) {
        case "vs":
            modeOptions.innerHTML += vsOptions();
            document
                .getElementById("remove-player-button")
                .addEventListener("click", removePlayer);
            document
                .getElementById("add-player-button")
                .addEventListener("click", addPlayer);
            document.querySelectorAll(".player-name").forEach((el) => {
                el.addEventListener("change", editPlayer);
            });
            document
                .querySelectorAll(".time-choice.minute:not(.selected)")
                .forEach((el) => {
                    el.addEventListener(
                        "click",
                        editMinutes(event, el.id.split("-")[1])
                    );
                });
            document
                .querySelectorAll(".time-choice.second:not(.selected)")
                .forEach((el) => {
                    el.addEventListener(
                        "click",
                        editSeconds(event, el.id.split("-")[1])
                    );
                });
            break;
        case "countdown":
            modeOptions.innerHTML += countdownOptions();
            document
                .querySelectorAll(".time-choice.minute:not(.selected)")
                .forEach((el) => {
                    el.addEventListener(
                        "click",
                        editMinutes(el.id.split("-")[1])
                    );
                });
            document
                .querySelectorAll(".time-choice.second:not(.selected)")
                .forEach((el) => {
                    el.addEventListener(
                        "click",
                        editSeconds(el.id.split("-")[1])
                    );
                });
            break;
        case "sprint":
        case "freeplay":
        default:
            modeOptions.innerHTML +=
                '<p style="width: 100%; text-align: center;">No options for this mode.</p>';
    }
}

function getModeDescription() {
    switch (gs.settings.mode) {
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
    gs.settings.mode = mode;
    if (mode == "freeplay" || mode == "sprint") {
        gs.settings.timer.minutes = 0;
        editSeconds(0);
    } else if (gs.state.timer.remainingTime == 0) {
        editSeconds(15);
    }
    getModeSettings();
    getModeDescription();
}

getModeDescription();
getModeSettings();

document.querySelectorAll(".mode-choice").forEach((el) => {
    el.addEventListener("click", changeMode(el.id));
});
