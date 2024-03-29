var usedNums = new Array(76);

function newCard() {
  //Starting loop through each square
  for (var i = 0; i < 24; i++) {
    setSquare(i);
  }
}

function setSquare(thisSquare) {
  var currSquare = "square" + thisSquare;
  var newNum;

  var colPlace = new Array(
    0,
    1,
    2,
    3,
    4,
    0,
    1,
    2,
    3,
    4,
    0,
    1,
    3,
    4,
    0,
    1,
    2,
    3,
    4,
    0,
    1,
    2,
    3,
    4
  );

  do {
    newNum = colPlace[thisSquare] * 15 + getNewNum() + 1;
  } while (usedNums[newNum]);

  usedNums[newNum] = true;
  document.getElementById(currSquare).innerHTML = newNum;
}

function getNewNum() {
  return Math.floor(Math.random() * 15);
}

function anotherCard() {
  for (var i = 1; i < usedNums.length; i++) {
    usedNums[i] = false;
  }
  newCard();
}
