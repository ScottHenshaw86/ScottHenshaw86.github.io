const box1 = document.querySelector("#box1");
const box2 = document.querySelector("#box2");
const box3 = document.querySelector("#box3");
const box4 = document.querySelector("#box4");
const box5 = document.querySelector("#box5");
const box6 = document.querySelector("#box6");
const box7 = document.querySelector("#box7");
const box8 = document.querySelector("#box8");
const box9 = document.querySelector("#box9");
const title = document.querySelector("#title");

const winPossibilities = [
  [box1, box2, box3],
  [box4, box5, box6],
  [box7, box8, box9],
  [box1, box4, box7],
  [box2, box5, box8],
  [box3, box6, box9],
  [box1, box5, box9],
  [box3, box5, box7],
];

const boxes = document.querySelectorAll(".row div");

let currentPlayer = "x";
let hasWinner = false;
let turn = 1;

const checkWinner = () => {
  for (let i = 0; i < winPossibilities.length; i++) {
    hasWinner = winPossibilities[i].every((box) =>
      box.classList.contains(currentPlayer)
    );
    if (hasWinner) {
      winPossibilities[i].forEach((box) => {
        box.classList.add("green");
      });
      break;
    }
  }
  if (hasWinner) {
    title.textContent = `${currentPlayer.toUpperCase()} wins! 🏆`;
  } else if (turn === 9) {
    title.textContent = "Cat's Game 🙀";
  }
};

const clearBoard = () => {
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.className = "";
  });
  currentPlayer = "x";
  hasWinner = false;
  turn = 1;
  title.textContent = `Player ${currentPlayer.toUpperCase()}'s turn`;
};

const handleClick = (e) => {
  if (hasWinner) return;
  if (e.target.tagName !== "DIV") return;
  if (e.target.classList.contains("x") || e.target.classList.contains("o")) {
    return;
  }
  e.target.classList.add(currentPlayer);
  const stamp = document.createElement("h1");
  stamp.textContent = currentPlayer;
  e.target.appendChild(stamp);
  checkWinner();
  if (currentPlayer === "x") {
    currentPlayer = "o";
  } else {
    currentPlayer = "x";
  }
  turn++;
};

title.textContent = `Player ${currentPlayer.toUpperCase()}'s turn`;

for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", handleClick);
}
