const board = document.querySelector("#board");
let isGameRunning;

let scoreCount = 0

function createCards() {
    isGameRunning = true;
    for (let i = 0; i < 20; i++) {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        board.appendChild(cardDiv);
    }
}

createCards()



const cards = document.querySelectorAll(".card");

function shuffleCards() {

    for (let i = 0; i < pairsArray.length; i++) {
        let randomColor = emojis[Math.floor(Math.random() * emojis.length)];
        pairsArray[i].forEach((pair) => cards[pair].innerHTML = randomColor);
    }
}
shuffleArray()
shuffleCards();

cards.forEach((card) => card.classList.add("normal-bgc"));



let guess = [];
let guessCards = [];


function flipCards() {
    if (!isGameRunning) {
        return
    } else {
        cards.forEach((c) => c.addEventListener("click", function () {
            c.classList.remove("normal-bgc")
            c.classList.remove('flip-out');
            c.classList.add('flip-in');
            c.style.fontSize = "36px";



            guess.push(c.innerHTML);
            guessCards.push(c);

            let guess1 = guess[0];
            let guess2 = guess[1];

            if (c.innerHTML === guess1 && guess2) {
                guess = []
                guessCards = [];
                scoreCount++;
            } else if (c.innerHTML !== guess1 && guess2) {
                setTimeout(function () {
                    guessCards.forEach((gcard) => gcard.style.fontSize = "0")
                    guessCards.forEach((gcard) => gcard.classList.add("normal-bgc"));
                    guessCards.forEach((gcard) => gcard.classList.remove("flip-in"));
                    guessCards.forEach((gcard) => gcard.classList.add("flip-out"));
                    guess = [];
                    guessCards = []
                }, 1000)

            }
            if (scoreCount === 10) {
                setTimeout(gameOver, 500)
                isGameRunning = false;
            }
        }))
    }
}

flipCards();

const gameAlert = document.querySelector(".game-alert");


function gameOver() {

    setTimeout(() => {
        gameAlert.style.transform = "translateY(0px)";
        gameAlert.style.transition = "400ms";
    }, 10)

    setTimeout(() => {
        gameAlert.style.transform = "translateY(-20px)";
        gameAlert.style.transition = "400ms";
    }, 3000)

}



const btnReset = document.getElementById("btn-reset");

btnReset.addEventListener("click", function () {
    pairsArray = [];
    shuffleArray()
    shuffleCards();
    cards.forEach((gcard) => gcard.classList.add("flip-out"));
    cards.forEach((gcard) => gcard.classList.remove("flip-in"));
    cards.forEach((gcard) => gcard.classList.add("normal-bgc"));
    cards.forEach((gcard) => gcard.style.fontSize = "0px");
    scoreCount = 0;
    isGameRunning = true;
})
