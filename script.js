const board = document.querySelector("#board");
let isGameRunning = false;

let scoreCount = 0

function createCards() {
    isGameRunning = true;
    for (let i = 0; i < 30; i++) {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        board.appendChild(cardDiv);
    }
}

createCards()

const pairs = [[0, 29], [1, 10], [12, 21], [13, 23], [9, 18], [5, 24], [4, 14], [2, 26], [19, 20], [25, 27], [22, 28], [6, 15], [7, 16], [8, 17], [3, 11]];

const cards = document.querySelectorAll(".card");

function shuffleCards() {

    for (let i = 0; i < pairs.length; i++) {
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        pairs[i].forEach((pair) => cards[pair].style.backgroundColor = randomColor);
    }
}

shuffleCards();

cards.forEach((card) => card.classList.add("normal-bgc"));



let guess = [];
let guessCards = [];


function flipCards() {
    cards.forEach((c) => c.addEventListener("click", function () {
        c.classList.remove("normal-bgc")
        c.classList.remove('flip-out');
        c.classList.add('flip-in');


        if (c.innerHTML) {
            return;
        }

        guess.push(c.style.backgroundColor);
        guessCards.push(c);

        let guess1 = guess[0];
        let guess2 = guess[1];

        if (c.style.backgroundColor === guess1 && guess2) {
            guessCards.forEach(card => card.innerHTML = ".")
            guess = []
            guessCards = [];
            scoreCount++;
        } else if (c.style.backgroundColor !== guess1 && guess2) {
            setTimeout(function () {
                guessCards.forEach((gcard) => gcard.classList.add("normal-bgc"));
                guessCards.forEach((gcard) => gcard.classList.remove("flip-in"));
                guessCards.forEach((gcard) => gcard.classList.add("flip-out"));
                guess = [];
                guessCards = []
            }, 1000)

        }

        if (scoreCount === 15) {
            alert("you win");
        }


    }))
}

flipCards();

const btnReset = document.getElementById("btn-reset");

btnReset.addEventListener("click", function () {
    cards.forEach((gcard) => gcard.classList.add("flip-out"));
    cards.forEach((gcard) => gcard.classList.remove("flip-in"));
    cards.forEach((gcard) => gcard.classList.add("normal-bgc"));
    shuffleCards();
})