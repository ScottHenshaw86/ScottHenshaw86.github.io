function randomNumber(min, max) {
    let nb = min + (max - min + 1) * Math.random();
    return Math.floor(nb);
};

const playRound = (min, max, maxAttempts) => {
    let winNum = randomNumber(min, max);
    console.log(winNum);

    let userInput, userNum, attempts = 0;
    let msg = `Guess a number between ${min} ~ ${max}.`

    do {
        if (attempts >= maxAttempts) {
            alert(`You've used up all ${maxAttempts} attempts. Sorry!\n The winning number was: ${winNum}`);
            return 0;
        }

        do {
            userInput = prompt(msg);
            if (userInput === null) {
                alert("You cancelled the current round.");
                return 0;
            }
            userNum = parseInt(userInput);
            msg = `Invalid guess.\nMake sure your number is between ${min} and ${max}.`
        } while (isNaN(userNum) || userNum < min || userNum > max);

        attempts++;

        if (userNum === winNum) {
            let tries = attempts == 1 ? "try" : "tries";
            alert(`Congratulations! You guessed the correct number: ${winNum}.\nIt only took you ${attempts} ${tries}!`);
            return 1;
        } else if (userNum > winNum) {
            max = userNum;
            let tries = maxAttempts - attempts == 1 ? "try" : "tries";
            msg = `Your guess was too high.\nguess a number between ${min} and ${max}.\nYou have ${maxAttempts - attempts} ${tries} left.`
        } else {
            min = userNum;
            let tries = maxAttempts - attempts == 1 ? "try" : "tries";
            msg = `Your guess was too low.\nguess a number between ${min} and ${max}.\nYou have ${maxAttempts - attempts} ${tries} left.`
        }
    } while (userNum !== winNum);
}

const playGame = (min, max, maxAttempts) => {
    let keepPlaying;
    let rounds = 0;
    wins = 0;

    do {
        wins += playRound(min, max, maxAttempts);
        rounds++;
        keepPlaying = confirm("Do you want to play another round?");
    } while (keepPlaying);

    let times = wins == 1 ? "time" : "times";
    let roundsText = rounds == 1 ? "round" : "rounds";
    alert(`You played ${rounds} ${roundsText}, and you won ${wins} ${times}.\nYour win percentage is ${((wins / rounds) * 100).toFixed(0)}%\nCome again soon~`);
}