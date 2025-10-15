const runner = document.getElementById('runner');
const coin = document.getElementById('coin');
const scoreBoard = document.getElementById('scoreBoard');

let isJumping = false;
let score = 0;

// Runner jump
document.addEventListener('touchstart', jump);
document.addEventListener('keydown', jump);

function jump() {
  if (isJumping) return;
  isJumping = true;
  let up = 0;
  const jumpInterval = setInterval(() => {
    if (up >= 150) {
      clearInterval(jumpInterval);
      const downInterval = setInterval(() => {
        if (up <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          up -= 5;
          runner.style.bottom = 50 + up + 'px';
        }
      }, 20);
    } else {
      up += 5;
      runner.style.bottom = 50 + up + 'px';
    }
  }, 20);
}

// Coin movement
function moveCoin() {
  let coinX = window.innerWidth;
  let coinY = 80;

  coin.style.right = '-50px';
  coin.style.bottom = coinY + 'px';

  const moveInterval = setInterval(() => {
    coinX -= 5;
    coin.style.right = (window.innerWidth - coinX) + 'px';

    // Collision check
    const runnerRect = runner.getBoundingClientRect();
    const coinRect = coin.getBoundingClientRect();

    if (
      runnerRect.left < coinRect.right &&
      runnerRect.right > coinRect.left &&
      runnerRect.top < coinRect.bottom &&
      runnerRect.bottom > coinRect.top
    ) {
      score++;
      scoreBoard.innerText = Score: ${score};
      coinX = window.innerWidth;
    }

    if (coinX < -50) {
      coinX = window.innerWidth + Math.random() * 500;
    }
  }, 20);
}

moveCoin();
