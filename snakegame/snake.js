//board
var blockSize = 25; // In pixels
var rows = 20;
var cols = 20;
var board;
var context;

//Snake head 
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

//Snake speed
var velocityX = 0;
var velocityY = 0;

//Coordinates of snakebody
var snakeBody = []

//Food
var foodX;
var foodY;

//State of game
var gameOver = false;

// Executed after the entire web page is loaded
window.onload = function () {
    // Connect the variable 'board' in js file to the id 'board' in html file
    board = document.getElementById("board");

    // Set the dimensions of board
    board.width = cols * blockSize;
    board.height = rows * blockSize;

    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    //document.addEventListener: Set up functions to be called when a specified event happens
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / 10); // every 100 milliseconds update function is executed

}

function update() {
    // If game is over, no update anymore
    if (gameOver) {
        return;
    }

    // Set the board size and colour
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // Mark the position of food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // Snake eats food
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    // Let the snake body can follow snake head
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Mark the position of snake head as snake moves
    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    // If the snake goes outside of the board
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY <0 || snakeY > rows * blockSize) {
        gameOver = true;
        alert(`Game Over! Score:${snakeBody.length}`);
    }

    // If the snake bumps into its body part
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][[1]]) {
            gameOver = true;
            alert(`Game Over! Score:${snakeBody.length}`);
        }
    }
}

// Change the direction responding to the arrow key pressed
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) { //To make sure the snake doesn't touch its body 
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}
// Randomly place food
function placeFood() {
    // (0-1) * cols -> (0-19.99999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}