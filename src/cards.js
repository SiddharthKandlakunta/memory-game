import { GAME_STATE as gs } from "./gamestate.js";
import { nextPlayer } from "./players.js";
import { cardGrid } from "./constants.js";
import { renderGameOverModal } from "./game.js";

function flipCard({ target: clickedCard }) {
    if (gs.state.cardOne !== clickedCard && !gs.state.disableDeck) {
        clickedCard.classList.add("flip");
        if (!gs.state.cardOne) {
            return (gs.state.cardOne = clickedCard);
        }
        gs.state.cardTwo = clickedCard;
        gs.state.disableDeck = true;
        let cardOneImg = gs.state.cardOne.querySelector(".back-view img").src,
            cardTwoImg = gs.state.cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        gs.state.players.scores[gs.state.players.currIndex]++;
        gs.state.matched++;
        gs.state.totalMatched++;
        if (gs.state.matched == gs.settings.pairs) {
            const cards = document.querySelectorAll(".card:not(.label)");
            cards.forEach((card) => {
                setTimeout(() => {
                    card.classList.add("jump");
                }, 400);
            });

            if (gs.settings.mode == "sprint") {
                renderGameOverModal();
            }

            setTimeout(() => {
                return shuffleCard();
            }, 1200);
        }
        gs.state.cardOne.removeEventListener("click", flipCard);
        gs.state.cardTwo.removeEventListener("click", flipCard);
        setTimeout(() => {
            gs.state.cardOne.classList.add("jump");
            gs.state.cardTwo.classList.add("jump");
        }, 400);

        setTimeout(() => {
            gs.state.cardOne.classList.remove("jump");
            gs.state.cardTwo.classList.remove("jump");
            gs.state.cardOne = gs.state.cardTwo = "";
            gs.state.disableDeck = false;
            nextPlayer();
        }, 1200);
        return;
    }
    setTimeout(() => {
        gs.state.cardOne.classList.add("shake");
        gs.state.cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        gs.state.cardOne.classList.remove("shake", "flip");
        gs.state.cardTwo.classList.remove("shake", "flip");
        gs.state.cardOne = gs.state.cardTwo = "";
        gs.state.disableDeck = false;
        nextPlayer();
    }, 1200);
}

export function shuffleCard() {
    gs.state.matched = 0;
    gs.state.disableDeck = false;
    gs.state.cardOne = gs.state.cardTwo = "";
    cardGrid.innerHTML = "";
    let arr = [];
    let arr2 = [];
    for (
        let i = 0;
        i < (gs.settings.sideLength * gs.settings.sideLength) / 2;
        i++
    ) {
        arr.push((i % 25) + 1);
        arr2.push((i % 25) + 1);
    }
    const runes = arr.concat(arr2);
    runes.sort(() => (Math.random() > 0.5 ? 1 : -1));
    for (let row = 0; row < gs.settings.sideLength + 1; row++) {
        for (let col = 0; col < gs.settings.sideLength + 1; col++) {
            let card;
            if (col == 0 && row == 0) {
                card = document.createElement("div");
                card.classList.add("card", "label");
                card.style.width = `calc(100% / ${
                    gs.settings.sideLength + 1
                } - 10px)`;
                card.style.height = `calc(100% / ${
                    gs.settings.sideLength + 1
                } - 10px)`;
            } else if (col == 0) {
                card = document.createElement("div");
                card.classList.add("card", "label");
                card.innerHTML = `<h3>${ROW_LABELS[row - 1]}<h3>`;
                card.style.width = `calc(100% / ${
                    gs.settings.sideLength + 1
                } - 10px)`;
                card.style.height = `calc(100% / ${
                    gs.settings.sideLength + 1
                } - 10px)`;
            } else if (row == 0) {
                card = document.createElement("div");
                card.classList.add("card", "label");
                card.innerHTML = `<h3>${col}<h3>`;
                card.style.width = `calc(100% / ${
                    gs.settings.sideLength + 1
                } - 10px)`;
                card.style.height = `calc(100% / ${gs.settings.sideLength + 1}`;
            } else {
                card = document.createElement("button");
                card.classList.add("card");
                card.innerHTML += `
            <div class="view front-view">
                <img src="images/back_icon.svg" alt="icon">
            </div>
            <div class="view back-view">
                <img src="images/Rune-${
                    runes[(row - 1) * gs.settings.sideLength + (col - 1)]
                }.svg" alt="Rune ${
                    runes[(row - 1) * gs.settings.sideLength + (col - 1)]
                }">
            </div>
        `;
                card.addEventListener("click", flipCard);
                card.style.width = `calc(100% / ${
                    gs.settings.sideLength + 1
                } - 10px)`;
                card.style.height = `calc(100% / ${
                    gs.settings.sideLength + 1
                } - 10px)`;
            }
            cardGrid.appendChild(card);
        }
    }
}

function changeBoardSize(size) {
    const selected = document.querySelector(
        ".game-options .board-size-container .board-size-option.selected"
    );
    selected.classList.remove("selected");
    const newSelected = document.querySelector(
        ".game-options .board-size-container .board-size-option#" + size
    );
    newSelected.classList.add("selected");
    gs.settings.sideLength = size;
    gs.settings.pairs = (gs.settings.sideLength * gs.settings.sideLength) / 2;
    shuffleCard();
}

document.querySelectorAll(".board-size-option").forEach((el) => {
    el.addEventListener("click", changeBoardSize(el.id));
});
