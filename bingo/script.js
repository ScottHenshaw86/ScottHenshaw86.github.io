const tds = document.querySelectorAll("td");
const free = document.querySelector("#squarefree");
const h1 = document.querySelector("h1");

const winOptions = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, "free", 12, 13],
  [14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23],
  [0, 5, 10, 14, 19],
  [1, 6, 11, 15, 20],
  [2, 7, "free", 16, 21],
  [3, 8, 12, 17, 22],
  [4, 9, 13, 18, 23],
  [0, 6, "free", 17, 23],
  [4, 8, "free", 15, 19],
];

const checkBingo = () => {
  let numBingos = 0;
  for (let i = 0; i < winOptions.length; i++) {
    // arr.every - learn about it at https://www.w3schools.com/jsref/jsref_every.asp
    const hasBingo = winOptions[i].every((square) =>
      document.querySelector(`#square${square}`).classList.contains("stamped")
    );
    if (hasBingo) {
      // arr.forEach - learn about it at https://www.w3schools.com/jsref/jsref_foreach.asp
      winOptions[i].forEach((square) => {
        document.querySelector(`#square${square}`).classList.add("green");
      });
      numBingos++;
    }
  }
  if (numBingos) {
    // ternary
    h1.textContent =
      numBingos > 1 ? `${numBingos} BINGOS!` : `${numBingos} BINGO!`;
    h1.classList.add("gold");
  } else {
    h1.textContent = "Create a BINGO Card";
    h1.classList.remove("gold");
  }
};

const removeBingos = () => {
  // another forEach loop
  tds.forEach((td) => {
    td.classList.remove("green");
  });

  checkBingo();
};

const handleStamp = (e) => {
  // check if the element that was clicked on was an <img /> element
  if (e.target.nodeName === "IMG") {
    // need to get up to the parent div
    e.target.parentElement.classList.remove("stamped");
    e.target.parentElement.removeChild(e.target);
    removeBingos();
  } else {
    const stamp = document.createElement("img");
    stamp.src = "./red_stamp.png";
    stamp.className = "stamp";
    stamp.draggable = false;
    e.target.appendChild(stamp);
    e.target.classList.add("stamped");
    checkBingo();
  }
};

tds.forEach((td) => {
  td.addEventListener("click", handleStamp);
});

// don't want to click on the FREE square. It should always count
free.removeEventListener("click", handleStamp);
