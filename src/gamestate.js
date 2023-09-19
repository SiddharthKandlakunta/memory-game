const GAME_STATE = {
    state: {
        cardOne: undefined,
        cardTwo: undefined,
        matched: 0,
        totalMatched: 0,
        disableDeck: false,
        players: {
            names: ["Player 1", "Player 2"],
            scores: [0, 0],
            currIndex: 0
        },
        timer: {
            interval: undefined,
            remainingTime: 300, //5 * 60 : Five Minutes Default
            remainingMinutes: "05",
            remainingSeconds: "00"
        }
    },
    settings: {
        mode: "freeplay",
        sideLength: 4,
        pairs: 2,
        timer: {
            minutes: 5,
            seconds: 0
        }
    }
};

const CLEAN_STATE = {
    cardOne: undefined,
    cardTwo: undefined,
    matched: 0,
    totalMatched: 0,
    disableDeck: false,
    players: {
        names: ["Player 1", "Player 2"],
        scores: [0, 0],
        currIndex: 0
    },
    timer: {
        interval: undefined,
        remainingTime: 300, //5 * 60 : Five Minutes Default
        remainingMinutes: "05",
        remainingSeconds: "00"
    }
};
