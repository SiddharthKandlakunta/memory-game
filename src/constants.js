export const NUM_CARD_IMAGES = 25;
export const ROW_LABELS = ["A", "B", "C", "D", "E", "F", "G", "H"];

export const FP_DESC =
    "The freeplay mode allows a player to continuously play through new, randomized boards. The timer counts up to let the player know how long they have been playing. As the player completes a board, a new one is shuffled into play.";
export const VS_DESC =
    "In VS mode, players compete head to head for a duration of time. The players will take turns selecting cards. On a match, a point is added to the player's score. A new deck will be shuffled into play when the players complete a board. The player with the most points at the end of the timer wins!";
export const CD_DESC =
    "Countdown allows a player to race against the clock. The player's goal is to complete the board before the timer runs out.";
export const SPRINT_DESC =
    "The sprint mode allows users to challenge themselves in a time trial. The timer counts up, so the player should try to clear one board as fast as possible!";

// Document Elements
export const settings = document.getElementById("game-settings");
export const board = document.getElementById("game-board");
export const cardGrid = document.getElementById("cards");
export const modeOptions = document.getElementById("mode-options");
export const description = document.getElementById("desc-text");
export const playerInfo = document.getElementById("player-info");
export const currPlayer = document.getElementById("current-player");
export const counter = document.getElementById("counter");
export const countElement = document.getElementById("count");
export const scoreContainer = document.getElementById("player-scores");
export const modal = document.getElementById("game-over-modal");
export const modalText = document.getElementById("game-over-text");
