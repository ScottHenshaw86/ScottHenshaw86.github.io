const image = document.querySelector("img");
const chosenBall = document.querySelector(".chosen-ball");
const stoppedCage = document.querySelector("#stopped-cage");
const button = document.querySelector("#get-num-button");
const calledNums = document.querySelector(".called-numbers");

let currentNum;
let usedNums = [];

const getNum = () => {
  let num;
  do {
    num = Math.ceil(Math.random() * 75);
  } while (usedNums.includes(num));
  usedNums.push(num);
  let result = "";
  switch (true) {
    case num < 16:
      result = "B-" + num;
      break;
    case num < 31:
      result = "I-" + num;
      break;
    case num < 46:
      result = "N-" + num;
      break;
    case num < 61:
      result = "G-" + num;
      break;
    default:
      result = "O-" + num;
  }
  currentNum = result;
};

const callNum = () => {
  button.disabled = true;
  if (currentNum) {
    let ball = document.createElement("div");
    ball.className = "called";
    ball.textContent = currentNum;
    calledNums.appendChild(ball);
  }
  console.log();
  getNum();
  chosenBall.firstElementChild.textContent = currentNum;
  image.src = "./bingo_cage_gif.gif";
  chosenBall.classList.remove("big");
  stoppedCage.style.opacity = 0;
  chosenBall.style.opacity = 0;
  setTimeout(() => {
    // image.style.backgroundImage = "url(./bingo_cage_static.jpg)";
    stoppedCage.style.opacity = 1;
    chosenBall.style.opacity = 1;
    chosenBall.classList.add("big");
    image.src = "./bingo_cage_ball_static.jpg";
    button.disabled = false;
  }, 5500);
};
