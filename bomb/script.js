const player = document.querySelector(".player");
let bombsDodged = document.querySelector('h1');
let numBombsDodged;
let gameOver;

var elem = document.documentElement;
let full = document.querySelector('#full');

function generateRandomNumber(min, max) {
  const number = Math.floor(Math.random() * (max - min + 1)) + min;
  return number;
}

let moveInterval, isMoving = false;

const startMoving = (direction) => {
  console.log('move');
  console.log('isMoving: ', isMoving)
  if (isMoving) return;
  isMoving = true;
  moveInterval = setInterval(() => {
    player.style.left = direction == "right" ? player.offsetLeft + 20 + "px" : player.offsetLeft - 20 + "px";
    player.style.transform = direction == "right" ? "scaleX(-1)" : "scaleX(1)";
    if (player.offsetLeft < -50) {
      player.style.left = '100vw';
    } else if (player.offsetLeft > window.innerWidth + 30) {
      player.style.left = '-50px';
    }
  }, 50)
}

const move = (e) => {
  if (e.key === "ArrowRight" || e.target == document.querySelector('right')) {
    startMoving('right')
  } else if (e.key === "ArrowLeft" || e.target == document.querySelector('right')) {
    startMoving('left')
  } else if (e.keyCode=== 32) {
    player.classList.add('jump');
    setTimeout(() => {
      player.classList.remove('jump');
    }, 610)
  }
};

const moveLeft = () => {
  console.log('move left')
  startMoving('left');
}
const moveRight = () => {
  console.log('move right')
  startMoving('right');
}
let removeBomb;

const createBomb = (delay) => {
  console.log(delay);
  if (gameOver) return;
  setTimeout(() => {
    createBomb((numBombsDodged > 1 && numBombsDodged % 10 == 0 )? delay - 20 : delay);
  }, delay)
  let bomb = document.createElement('div');
  bomb.className = "ob";
  bomb.style.left = generateRandomNumber(0,99) + 'vw';
  document.body.appendChild(bomb);
  setTimeout(() => {
    if (!gameOver){
      numBombsDodged++;
      bombsDodged.textContent = `Bombs Dodged: ${numBombsDodged}`;
      bomb.classList.add('explosion');
    }
  }, 3500);
  removeBomb = setTimeout(() => {
    if (!gameOver) {
      bomb.remove();
    }
  }, 4000)
}
let game;

const gameStop = () => {
  let obs = document.querySelectorAll(".ob");
  for (let i = 0; i < obs.length; i++) {
    obs[i].classList.add('explosion');
  }
  gameOver = true;
  clearInterval(game);
  clearInterval(moveInterval);
  clearTimeout(removeBomb);
  for (let ob of obs) {
    // ob.style.animationPlayState === "paused";
    ob.classList.add("dead");
    document.querySelector("#haha").classList.add("show");
    document.querySelector(".reset").classList.add("show");
    window.removeEventListener("keydown", move);
    document.querySelector('.left').removeEventListener('touchstart', moveLeft);
    document.querySelector('.right').removeEventListener('touchstart', moveRight);
  }
}


const gameStart = () => {
  numBombsDodged = 0;
gameOver = false;
let obs = document.querySelectorAll(".ob");
if (obs) {
  obs.forEach((ob) => {
    ob.remove();
  })
  document.querySelector("#haha").classList.remove("show");
  document.querySelector(".reset").classList.remove("show");
}
  game = setInterval(() => {
    let obs = document.querySelectorAll(".ob");
    for (let i = 0; i < obs.length; i++) {
      let bombL = obs[i].offsetLeft;
      let bombR = obs[i].offsetLeft + obs[i].offsetWidth;
      // let bombTop = obs[i].offsetTop;
      let bombBottom = obs[i].offsetTop + obs[i].offsetHeight;
      let playerL = player.offsetLeft;
      let playerR = player.offsetLeft + player.offsetWidth;
      let playerTop = player.offsetTop;
      // let playerBottom = player.offsetTop + player.offsetHeight;
  
      if (bombR > playerL + 20 && bombL < playerR - 20 && bombBottom > playerTop + 10) {
        gameStop();
      }
    }
  }, 100);
  window.addEventListener("keydown", move);
  window.addEventListener("keyup", function(e) {
    if (e.key == "ArrowRight" || e.key == "ArrowLeft"){
      isMoving = false;
      clearInterval(moveInterval);
    }
  });
  
  document.querySelector('.left').addEventListener('touchstart', moveLeft);
  document.querySelector('.right').addEventListener('touchstart', moveRight);
  document.querySelector('.left').addEventListener('touchend', function(e) {
      isMoving = false;
      clearInterval(moveInterval);
  });
  document.querySelector('.right').addEventListener('touchend', function(e) {
    isMoving = false;
    clearInterval(moveInterval);
  });

  createBomb(1000);
}

/* View in fullscreen */
const openFullscreen = () => {
  console.log('full')
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  full.style.display = "none";
  gameStart();
}

full.addEventListener('touchstart', openFullscreen);

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
  setTimeout(() => {
    full.style.display = "block";
  }, 2500)
}else{
  // false for not mobile device
  gameStart();
}

document.querySelector(".reset").addEventListener('click', gameStart);
document.querySelector(".reset").addEventListener('touchstart', gameStart);