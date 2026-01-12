hangmanPics = [`
    +---+
    |   |
        |
        |
        |
        |
  =========`, `
    +---+
    |   |
    O   |
        |
        |
        |
  =========`, `
    +---+
    |   |
    O   |
    |   |
        |
        |
  =========`, `
    +---+
    |   |
    O   |
   /|   |
        |
        |
  =========`, `
    +---+
    |   |
    O   |
   /|\\  |
        |
        |
  =========`, `
    +---+
    |   |
    O   |
   /|\\  |
   /    |
        |
  =========`, `
    +---+
    |   |
    O   |
   /|\\  |
   / \\  |
        |
  =========`]
let wrongAnswers = 0;
var listOfWords = ["mother", "anger", "lawyer", "computer", "hangman", "javascript", "python", "programming", "developer", "software"];
let word = listOfWords[Math.floor(Math.random() * listOfWords.length)];
let guessed = new Set();

function refresh() {
    blanks = "";
    for (let letter of word) {
        if (guessed.has(letter)) {
            blanks += letter + " ";
        }
        else {
            blanks += "_ ";
        }
    }
    document.getElementById("word").innerHTML = blanks;
    document.getElementById("hangman").innerHTML = hangmanPics[wrongAnswers];
    if (wrongAnswers >= hangmanPics.length - 1) {
        document.getElementById("guess").disabled = true;
        alert("You lose! The word was " + word);
        resetGame();
    }
    if (blanks.replace(/ /g, "") === word) {
        document.getElementById("guess").disabled = true;
        alert("You win! The word was " + word);
        resetGame();
    }
}

refresh();

function guesser() {
    let guess = document.getElementById("guess").value;
    document.getElementById("message").style.color = "red";
    if (guessed.has(guess)) {
        document.getElementById("message").innerHTML = "You already guessed that letter!";
    }
    else if (guess.length !== 1) {
        document.getElementById("message").innerHTML = "Please enter a single letter!";
    }
    else if (word.includes(guess)){
        document.getElementById("message").innerHTML = "Good guess!";
        document.getElementById("message").style.color = "#1AA260";
        guessed.add(guess);
    }
    else {
        document.getElementById("message").innerHTML = "Bad guess!";
        guessed.add(guess);
        wrongAnswers += 1;
    }
    document.getElementById("guess").value = "";
    refresh();
}

function resetGame() {
    wrongAnswers = 0;
    word = listOfWords[Math.floor(Math.random() * listOfWords.length)];
    guessed = new Set();
    document.getElementById("guess").disabled = false;
    document.getElementById("message").innerHTML = "Guess a letter!";
    document.getElementById("message").style.color = "black";
    refresh();
}