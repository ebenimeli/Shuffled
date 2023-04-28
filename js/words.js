window.addEventListener('load', preloadAudio);

/** MAIN */

/* Settings */
const nLettersCorrect = 0; // at least
const maxWords = 10;
const answerTime = 15;
const countDownInterval = 1000;
const timeoutIds = [];
var toid = 0;
var nqt = 0; // next question time (timer id)

var speed = 1000;
var i = j = 0;
var positions = [];
var indices = [];
const randomItems = [];
const randomItemsSrc = [];

var nextQuestionTime = answerTime + 3; // ms
var points = 0;
var correct = 0;
var segundos = 0;
var randomWord = "";
var randomWordSrc = "";
var pointsAdded = false;
var correctCounted = false;

var wcorrect = 0;

preloadAudio();
pickRandomWords();
newWord();

/**
 * 
 */
function pickRandomWords() {
    while (randomItems.length < maxWords) {
        const randomIndex = Math.floor(Math.random() * words.length);
        let randomElement = words[randomIndex];
        let randomElementSrc = wordsES[randomIndex];

        if (!randomItems.includes(randomElement)) {
            randomItems.push(randomElement);
            randomItemsSrc.push(randomElementSrc);
        }
    }
}

/**
 * 
 */
function preloadAudio() {
    audioTick = new Audio('media/tick.mp3');
    audioTick.preload = 'auto';

    audioNext = new Audio('media/next.mp3');
    audioNext.preload = 'auto';

    audioCorrect = new Audio('media/correct.mp3');
    audioCorrect.preload = 'auto';

    audioWrong = new Audio('media/wrong.mp3');
    audioWrong.preload = 'auto';

    audioWin = new Audio('media/win.mp3');
    audioWin.preload = 'auto';
}

/**
 * 
 * @param {*} str 
 * @returns 
 */
function shuffleString(str) {
    // Convert the string to an array of characters
    let chars = str.split('');

    // Shuffle the array using the Fisher-Yates shuffle algorithm
    for (let i = chars.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    // Convert the shuffled array back to a string and return it
    return chars.join('');
}


/**
 * 
 * @param {*} wordArray 
 * @param {*} numExcluded 
 * @returns 
 */
function shuffleWord(wordArray, numExcluded) {
    const wordLength = wordArray.length;

    // Check if the number of letters to exclude is greater than the length of the word
    if (numExcluded >= wordLength) {
        return wordArray; // Return the original array if there's nothing to shuffle
    }

    // Create an array of indices to shuffle
    indices = [];
    for (let i = 0; i < wordLength; i++) {
        if (i < numExcluded) {
            indices.push(i);
        } else {
            indices.push(null);
        }
    }

    // Shuffle the non-excluded letters
    for (let i = numExcluded; i < wordLength; i++) {
        let randomIndex = Math.floor(Math.random() * (wordLength - numExcluded)) + numExcluded;
        while (indices[randomIndex] !== null) {
            randomIndex = (randomIndex + 1) % wordLength;
        }
        indices[randomIndex] = i;
    }

    // Create the shuffled word array
    const shuffledWord = new Array(wordLength);
    for (let i = 0; i < wordLength; i++) {
        if (indices[i] !== null) {
            shuffledWord[indices[i]] = wordArray[i];
        }
    }

    return shuffledWord;
}


/**
 * 
 */
function newWord() {
    speed = 1000;
    //nextQuestionTime = answerTime + 3;
    correctCounted = false;
    correct = 0;
    pointsAdded = false;

    clearInputWord();

    randomWord = randomItems[i];
    randomWordSrc = randomItemsSrc[i];

    randomWord = randomWord.toUpperCase();
    randomWordSrc = randomWordSrc.toUpperCase();

    wArray = [];
    wArray = randomWord.split('');
    text = shuffleWord(wArray, nLettersCorrect);
    newText = "";

    for (var k = 0; k < text.length; k++) {
        if (k == indices[k]) {
            newText = newText + '<span class="correct">' + text[k] + '</span>';
        } else {
            newText = newText + "<span>" + text[k] + "</span>";
        }
    }

    document.getElementById("word").innerHTML = newText;
    document.getElementById("num").innerText = randomItemsSrc[j];

    i = i + 1;
    j = j + 1;

    showWord(answerTime, j);

    /*
    if (j == maxWords) {
        toid = setTimeout(function () {
            gameOver();
        }, nextQuestionTime*1000)
    } else {
        showWord(answerTime, j);
    }
    */

}

/**
 * Game Over
 */
function gameOver() {
    audioWin.play();
    let inputElement = document.getElementById("guess");
    inputElement.style.backgroundColor = "green";
    inputElement.style.color = "white";
    inputElement.value = "Bravo!";
    inputElement.disabled = true;

    document.getElementById("num").innerHTML = "";
    document.getElementById("word").innerHTML = "";
    document.getElementById("solution").innerHTML = "";
    document.getElementById("credits").style.display = "block";
    document.getElementById("playagain").style.display = "block";
}
/**
 * 
 */
function clearInputWord() {
    document.getElementById("solution").innerText = "";
    document.getElementById("guess").value = "";
    document.getElementById("guess").style.backgroundColor = "white";
    document.getElementById("guess").style.color = "black";
    document.getElementById("guess").focus();
}

/**
 * 
 * @param {*} seconds 
 */
function showWord(seconds, n) {
    var div = document.getElementById("solution");

    let timer = setInterval(function () {
        audioTick = new Audio('media/tick.mp3');
        audioTick.preload = 'auto';
        audioTick.play();

        if (correct == 1) {
            if (!pointsAdded) {
                addPoints(seconds);
                pointsAdded = true;
                clearInterval(timer);
                appendToSummary(randomWordSrc + " = " + randomWord);
            }
            checkProgress(n);
            div.innerHTML = randomWord;
            correct = -1;
        }
        div.innerHTML = seconds;

        seconds--;

        if (seconds === 0) {
            clearInterval(timer);
            div.innerHTML = 0;
            if (correct == 1) {
                audioCorrect.play();
                correct = -1;
            }
            if (correct == 0) {
                wrongWord();
                audioWrong.play();
                div.innerHTML = randomWord;
                appendToSummary(randomWordSrc + " = " + randomWord);
            }

            checkProgress(n);
        }
    }, countDownInterval);
}

/**
 * 
 * @param {*} n 
 */
function checkProgress(n) {
    if (n < maxWords) {
        setTimeout(function () {
            audioNext.play();
            newWord();
        }, 3000);
    } else {
        gameOver();
    }
}

/**
 * 
 * @param {*} segundos 
 */
function showWord2(segundos) {
    var div = document.getElementById("solution");
    if (segundos > 0) {
        audioTick = new Audio('media/tick.mp3');
        audioTick.preload = 'auto';
        audioTick.play();
        if (correct == 1) {
            if (!pointsAdded) {
                addPoints(segundos);
                pointsAdded = true;
                speed = 100;
            }
            div.innerHTML = randomWord;
            correct = -1;
            clearTimeout(nqt);
        }
        toid = setTimeout(function () { showWord(segundos - 1); }, speed);
        timeoutIds.push(toid);
        div.innerHTML = segundos;
    } else {
        // Time out!
        clearTimers();
        speed = 1000; // ??
        div.innerHTML = 0;
        if (correct == 1) {
            audioCorrect.play();
            correct = -1;
        }
        if (correct == 0) {
            wrongWord();
            audioWrong.play();
            div.innerHTML = randomWord;
        }
    }
}

function clearTimers() {
    timeoutIds.forEach(timeoutId => {
        clearTimeout(timeoutId);
    });
}

//showWord(10);

const inputText = document.getElementById("guess");

inputText.addEventListener("keyup", function (event) {
    const theText = event.target.value;
    const isCorrect = checkWord(theText, randomWord);

    if (!isCorrect && event.key === "Enter") { // si se presiona Enter
        correct = 0;
        subtractPoints(1);
        wrongWord();
    }

});

/**
 * 
 * @param {*} enteredWord 
 * @param {*} randomWord 
 * @returns 
 */
function checkWord(enteredWord, randomWord) {
    if (enteredWord === randomWord) { // si el texto introducido es igual al string determinado
        audioCorrect.play();
        document.getElementById("guess").style.backgroundColor = "green";
        document.getElementById("guess").style.color = "white";
        //segundos = 2;
        correct = 1;
        if (correctCounted == false) {
            wcorrect = wcorrect + 1;
        }
        correctCounted = true;
        document.getElementById("points").innerText = wcorrect + "/" + maxWords + " · " + points + " puntos";
        return true;
    } else {
        return false;
    }

}

function addPoints(p) {
    points = points + p;
    document.getElementById("points").innerText = wcorrect + "/" + maxWords + " · " + points + " puntos";
}

function subtractPoints(p) {
    points = points - p;
    document.getElementById("points").innerText = points + " puntos";
}

function wrongWord() {
    audioWrong.play();
    document.getElementById("guess").style.backgroundColor = "red";
    document.getElementById("guess").style.color = "white";
}

function clearInput() {
    document.getElementById("guess").style.backgroundColor = "white";
    document.getElementById("guess").style.color = "black";
}

/**
 * 
 * @param {*} text 
 */
function appendToSummary(text) {
    // Get a reference to the div element
    var myDiv = document.getElementById("summary");

    // Create a new span element
    var mySpan = document.createElement("span");

    // Set some text for the span
    var spanText = document.createTextNode(text);

    // Append the text to the span
    mySpan.appendChild(spanText);

    // Append the span to the div
    myDiv.appendChild(mySpan);
}

const wordInput = document.getElementById('guess');
wordInput.addEventListener('input', function () {
    this.value = this.value.toUpperCase();
});
