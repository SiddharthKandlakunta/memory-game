function flipCard({ target: clickedCard }) {
    if (
        GAME_STATE.state.cardOne !== clickedCard &&
        !GAME_STATE.state.disableDeck
    ) {
        clickedCard.classList.add("flip");
        if (!GAME_STATE.state.cardOne) {
            return (GAME_STATE.state.cardOne = clickedCard);
        }
        GAME_STATE.state.cardTwo = clickedCard;
        GAME_STATE.state.disableDeck = true;
        let cardOneImg =
                GAME_STATE.state.cardOne.querySelector(".back-view img").src,
            cardTwoImg =
                GAME_STATE.state.cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        GAME_STATE.state.players.scores[GAME_STATE.state.players.currIndex]++;
        GAME_STATE.state.matched++;
        GAME_STATE.state.totalMatched++;
        if (GAME_STATE.state.matched == GAME_STATE.settings.pairs) {
            const cards = document.querySelectorAll(".card:not(.label)");
            cards.forEach((card) => {
                setTimeout(() => {
                    card.classList.add("jump");
                }, 400);
            });

            if (GAME_STATE.settings.mode == "sprint") {
                renderGameOverModal();
            }

            setTimeout(() => {
                return shuffleCard();
            }, 1200);
        }
        GAME_STATE.state.cardOne.removeEventListener("click", flipCard);
        GAME_STATE.state.cardTwo.removeEventListener("click", flipCard);
        setTimeout(() => {
            GAME_STATE.state.cardOne.classList.add("jump");
            GAME_STATE.state.cardTwo.classList.add("jump");
        }, 400);

        setTimeout(() => {
            GAME_STATE.state.cardOne.classList.remove("jump");
            GAME_STATE.state.cardTwo.classList.remove("jump");
            GAME_STATE.state.cardOne = GAME_STATE.state.cardTwo = "";
            GAME_STATE.state.disableDeck = false;
            nextPlayer();
        }, 1200);
        return;
    }
    setTimeout(() => {
        GAME_STATE.state.cardOne.classList.add("shake");
        GAME_STATE.state.cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        GAME_STATE.state.cardOne.classList.remove("shake", "flip");
        GAME_STATE.state.cardTwo.classList.remove("shake", "flip");
        GAME_STATE.state.cardOne = GAME_STATE.state.cardTwo = "";
        GAME_STATE.state.disableDeck = false;
        nextPlayer();
    }, 1200);
}

function shuffleCard() {
    GAME_STATE.state.matched = 0;
    GAME_STATE.state.disableDeck = false;
    GAME_STATE.state.cardOne = GAME_STATE.state.cardTwo = "";
    cardGrid.innerHTML = "";
    let arr = [];
    let arr2 = [];
    for (
        let i = 0;
        i <
        (GAME_STATE.settings.sideLength * GAME_STATE.settings.sideLength) / 2;
        i++
    ) {
        arr.push((i % 25) + 1);
        arr2.push((i % 25) + 1);
    }
    const runes = arr.concat(arr2);
    runes.sort(() => (Math.random() > 0.5 ? 1 : -1));
    for (let row = 0; row < GAME_STATE.settings.sideLength + 1; row++) {
        for (let col = 0; col < GAME_STATE.settings.sideLength + 1; col++) {
            let card;
            if (col == 0 && row == 0) {
                card = document.createElement("div");
                card.classList.add("card", "label");
                card.style.width = `calc(100% / ${
                    GAME_STATE.settings.sideLength + 1
                } - 10px)`;
                card.style.height = `calc(100% / ${
                    GAME_STATE.settings.sideLength + 1
                } - 10px)`;
            } else if (col == 0) {
                card = document.createElement("div");
                card.classList.add("card", "label");
                card.innerHTML = `<h3>${ROW_LABELS[row - 1]}<h3>`;
                card.style.width = `calc(100% / ${
                    GAME_STATE.settings.sideLength + 1
                } - 10px)`;
                card.style.height = `calc(100% / ${
                    GAME_STATE.settings.sideLength + 1
                } - 10px)`;
            } else if (row == 0) {
                card = document.createElement("div");
                card.classList.add("card", "label");
                card.innerHTML = `<h3>${col}<h3>`;
                card.style.width = `calc(100% / ${
                    GAME_STATE.settings.sideLength + 1
                } - 10px)`;
                card.style.height = `calc(100% / ${
                    GAME_STATE.settings.sideLength + 1
                }`;
            } else {
                card = document.createElement("button");
                card.classList.add("card");
                card.innerHTML += `
            <div class="view front-view">
                <img src="images/back_icon.svg" alt="icon">
            </div>
            <div class="view back-view">
                <img src="images/Rune-${
                    runes[
                        (row - 1) * GAME_STATE.settings.sideLength + (col - 1)
                    ]
                }.svg" alt="Rune ${
                    runes[
                        (row - 1) * GAME_STATE.settings.sideLength + (col - 1)
                    ]
                }">
            </div>
        `;
                card.addEventListener("click", flipCard);
                card.style.width = `calc(100% / ${
                    GAME_STATE.settings.sideLength + 1
                } - 10px)`;
                card.style.height = `calc(100% / ${
                    GAME_STATE.settings.sideLength + 1
                } - 10px)`;
            }
            cardGrid.appendChild(card);
        }
    }
}

function changeBoardSize(size, id) {
    const selected = document.querySelector(
        ".game-options .board-size-container .board-size-option.selected"
    );
    selected.classList.remove("selected");
    const newSelected = document.querySelector(
        ".game-options .board-size-container .board-size-option#" + id
    );
    newSelected.classList.add("selected");
    GAME_STATE.settings.sideLength = size;
    GAME_STATE.settings.pairs =
        (GAME_STATE.settings.sideLength * GAME_STATE.settings.sideLength) / 2;
    shuffleCard();
}
