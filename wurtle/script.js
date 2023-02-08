// Will retrieve a random word for the wordsList array
function getRandomWord () {
    var randomNum = Math.floor(Math.random() * wordsList.length);
    return wordsList[randomNum];
}

let secretWord = getRandomWord();

let cellNum = 1;
let round = 0;
let isPlaying = true;

document.addEventListener("keydown", function(e) {
    if (!isPlaying) return;
    let currentCell = document.getElementById("cell" + (cellNum + round * 5));
    if (e.key.length == 1 && e.key.match(/[a-z]/i)) {
        currentCell.textContent = e.key;
        if (cellNum < 5) {
            cellNum++;
        } else {
            console.log(cellNum);
        }
    } else if (e.key == "Backspace") {
        currentCell.textContent = "";
        if (cellNum > 1) {
            cellNum--;
        }
    } else if (e.key == "Enter" && cellNum == 5) {
        var result = checkWord();
        cellNum = 1;
        if (result) {
            isPlaying = false;
            alert("You win!!");
            alert("It only took you " + (round+1) + " tries");
        } else if (round < 5) {
            round++;
        } else {
            alert("Sorry! You lose!");
            alert("The correct word was " + secretWord);
        }
    }
});

function checkWord() {
    let right = 0;
    for (let i=1; i<=5; i++) {
        let cell = document.getElementById("cell" + (round * 5 + i));
        let letter = cell.textContent.toLowerCase();
        if (secretWord[i-1] == letter) {
            cell.classList.add("green");
            right++;
        } else if (secretWord.includes(letter)) {
            cell.classList.add("yellow");
        } else {
            cell.classList.add("gray");
        }
    }
    if (right == 5) {
        return true;
    }  else {
        return false;
    }
}
