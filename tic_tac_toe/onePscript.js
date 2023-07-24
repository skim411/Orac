var origBoard;
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const winScore = document.querySelector("#winScore");
const restartBtn = document.querySelector("#restartBtn");

const huPlayer = 'X';
const aiPlayer = 'O';

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let running = false;
let currentPlayer = huPlayer;
let huScore = 0;
let aiScore = 0;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
    winScore.textContent = `${huScore}` + " : " + `${aiScore}`;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == huPlayer) ? aiPlayer : huPlayer;
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
        if (currentPlayer == huPlayer) {
            huScore++;
        } else if (currentPlayer == aiPlayer) {
            aiScore++;
        }
        winScore.textContent = `${huScore}` + " : " + `${aiScore}`;
    } else if (!options.includes("")) {
        statusText.textContent = `Draw`;
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = huPlayer;
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
