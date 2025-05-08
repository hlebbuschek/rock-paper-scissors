let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};     

updateScoreElement();

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });
document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });
document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.querySelector('.reset-score-button')
  .addEventListener('click', () => {
    resetScore();
  });
document.querySelector('.auto-play-button')
  .addEventListener('click',() => {
  autoPlay();
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  }
  else if (event.key === 'p') {
    playGame('paper');
  }
  else if (event.key === 's') {
    playGame('scissors');
  }
  else if (event.key === 'a') {
    autoPlay();
  } 
  else if (event.key === ' ') {
  resetScore();
  }
});

function resetScore() {
  let accept = false;
  const html = `
    Are you sure you want to reset the score?
    <button class="yes-button">Yes</button>
    <button class="no-button">No</button>
  `; 
  document.querySelector('.js-display-message').innerHTML = html;

  document.querySelector('.yes-button')
    .addEventListener('click', () => {
      accept = true;
      resetScore();
      document.querySelector('.js-display-message').innerHTML = '';
    });
  document.querySelector('.no-button')
    .addEventListener('click', () => {
      accept = false;
      document.querySelector('.js-display-message').innerHTML = '';
    });
  
  if (accept) {
    score.wins = 0;
    score.ties = 0;
    score.losses = 0;
    localStorage.removeItem('score');
    updateScoreElement();
  }
}

function playGame(userMove) {
  
  let computerMove = '';
  let result = '';
  computerMove = pickComputerMove();
  
  if (computerMove === userMove) {
    result = 'Tie.';
    score.ties ++;
  } else if ((computerMove == 'paper' && userMove == 'rock') ||
    (computerMove == 'scissors' && userMove == 'paper') || 
    (computerMove == 'rock' && userMove == 'scissors')) {
    result = 'You lose.';
    score.losses ++;
  } else if ((computerMove == 'scissors' && userMove == 'rock') ||
    (computerMove == 'paper' && userMove == 'scissors') || 
    (computerMove == 'rock' && userMove == 'paper')) {
    result = 'You win.';
    score.wins ++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-move')
    .innerHTML = `You 
    <img src="img/${userMove}-emoji.png"
    class="move-icon">
    <img src="img/${computerMove}-emoji.png"
    class="move-icon"> 
    Computer`;
}

function updateScoreElement () {
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
} 

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';      
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  const buttonElement = document.querySelector('.auto-play-button'); 
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    buttonElement.innerHTML = 'Stop Playing';
  }
  else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    buttonElement.innerHTML = 'Auto Play';
  }
}