const buttons = document.querySelectorAll('button');
const computerChoiceText = document.querySelector('.computer-choice-text');
const computerChoiceImg = document.querySelector('.computer-choice-img');
const playerChoiceText = document.querySelector('.player-choice-text');
const playerChoiceImg = document.querySelector('.player-choice-img');
const winner = document.querySelector('.result');

// Add variables to track scores
let playerScore = 0;
let computerScore = 0;

const updateScores = () => {
  document.getElementById('playerScore').textContent = playerScore;
  document.getElementById('computerScore').textContent = computerScore;
};

const result = ['rock', 'paper', 'scissors'];

const resultImage = [
    "url(icons/rock.png) no-repeat center / 150px 150px",
    "url(icons/scissors.png) no-repeat center / 150px 150px",
    "url(icons/paper.png) no-repeat center / 150px 150px"
  ];

const show = (user, computer, result) => {
    computerChoiceText.innerText = computer;

    playerChoiceText.innerText = user;

    winner.innerText = result;
}

const game = (user, computer) => {
    let message;

    if (user === 'rock') {
        playerChoiceImg.style.background = resultImage[0];
    } else if (user === 'scissors') {
        playerChoiceImg.style.background = resultImage[1];
    } else if (user === 'paper') {
        playerChoiceImg.style.background = resultImage[2];
    }

    if (computer === 'rock') {
        computerChoiceImg.style.background = resultImage[0];
    } else if (computer === 'scissors') {
        computerChoiceImg.style.background = resultImage[1];
    } else if (computer === 'paper') {
        computerChoiceImg.style.background = resultImage[2];
    }

    if (user === computer) {
        message = 'Tie';
    } else {
        switch (user + computer) {
            case 'scissorspaper':
            case 'rockscissors':
            case 'paperrock':
                message = 'Player Wins!';
                break;
            case 'scissorsrock':
            case 'rockpaper':
            case 'paperscissors':
                message = 'Computer Wins!';
                break;
        }
    }

    if (message === 'Player Wins!') {
        playerScore++;
    } else if (message === 'Computer Wins!') {
        computerScore++;
    }
    
    // Update the displayed scores
    updateScores();

    show(user, computer, message);
};

const play = (event) => {
    const user = event.target.textContent;
    const randomIndex = Math.floor(Math.random() * 3);
    const computer = result[randomIndex];
    game(user, computer);
}

buttons.forEach((button) => {
    button.addEventListener('click', play);
});



// const buttons = document.querySelectorAll('button');
// const computerChoice = document.querySelector('.computer-choice');
// const userChoice = document.querySelector('.you-choice');
// const winner = document.querySelector('.result');

// const result = ['rock', 'paper', 'scissors'];

// const show = (user, computer, result) => {
//     computerChoice.innerText = computer;
//     userChoice.innerText = user;
//     winner.innerText = result;
// }

// const game = (user, computer) => {
//     let message;

//     if (user === computer) {
//         message = 'Tie';
//     } else {
//         switch (user + computer) {
//             case 'scissorspaper':
//             case 'rockscissors':
//             case 'paperrock':
//                 message = 'Player Wins!';
//                 break;
//             case 'scissorsrock':
//             case 'rockpaper':
//             case 'paperscissors':
//                 message = 'Computer Wins!';
//                 break;
//         }
//     }

//     show(user, computer, message);
// };

// const play = (event) => {
//     const user = event.target.textContent;
//     const randomIndex = Math.floor(Math.random() * 3);
//     const computer = result[randomIndex];
//     game(user, computer);
// }

// buttons.forEach((button) => {
//     button.addEventListener('click', play);
// });
