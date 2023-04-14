window.addEventListener('load', preloadAudio);

/** MAIN */

/* Settings */
const nLettersCorrect = 0; // at least
const maxWords = 10;
const answerTime = 10;

var i = j = 0;
var positions = [];
var indices = [];
const randomItems = [];
const randomItemsSrc = [];

const nextQuestionTime = answerTime + 3; // ms
points = 0;
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
    correctCounted = false;

    correct = 0;
    pointsAdded = false;
    document.getElementById("solution").innerText = "";
    document.getElementById("guess").value = "";
    document.getElementById("guess").style.backgroundColor = "white";
    document.getElementById("guess").style.color = "black";
    document.getElementById("guess").focus();

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

    // Replace the text content of the paragraph with the new string
    document.getElementById("word").innerHTML = newText;
    //  document.getElementById("num").innerText = "#" + (j + 1);

    document.getElementById("num").innerText = randomItemsSrc[j];

    showWord(answerTime);
    i = i + 1;
    j = j + 1;
    if (j < maxWords) {
        setTimeout(function () {
            appendToSummary(randomWordSrc + " = " + randomWord);
            audioNext.play();
            newWord();
        }, nextQuestionTime * 1000);
    }
    if (j == (maxWords)) {
        appendToSummary(randomWordSrc + " = " + randomWord);
        setTimeout(function () {
            document.getElementById("guess").style.backgroundColor = "green";
            document.getElementById("guess").style.color = "white";
            document.getElementById("guess").value = "Congratulations!";
            document.getElementById("num").innerHTML = "";
            document.getElementById("word").innerHTML = "";
            document.getElementById("solution").innerHTML = "";

            document.getElementById("credits").style.display = "block";

            // REVISAR ESTO
            const twLink = document.getElementById("twshare");
            twtext = wcorrect + "/" + maxWords + "%20·%20" + points + "%20points!";

            twhref = "https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&amp;text=" + twtext + "&amp;url=http%3A%2F%2Fwww.ebenimeli.org%2Fwords&amp;via=enriquebenimeli";
            /*
            var link = document.createElement('a');
            link.setAttribute('href', twhref);
            link.textContent = 'Tweet!';
            document.getElementById("twshare").appendChild(link);
            */
        }, nextQuestionTime * 1000)
    }
}

/**
 * 
 * @param {*} segundos 
 */
function showWord(segundos) {
    var div = document.getElementById("solution");
    if (segundos > 0) {
        audioTick = new Audio('media/tick.mp3');
        audioTick.preload = 'auto';
        audioTick.play();
        if (correct == 1) {
            if (!pointsAdded) {
                addPoints(segundos);
                pointsAdded = true;
            }
            div.innerHTML = randomWord;
            correct = -1;
        }
        setTimeout(function () { showWord(segundos - 1); }, 1000);
        div.innerHTML = segundos;
    } else {
        // Time out!
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

//showWord(10);

const inputTexto = document.getElementById("guess");

inputTexto.addEventListener("keydown", function (event) {
    if (event.key === "Enter") { // si se presiona Enter
        const textoIntroducido = event.target.value;
        if (textoIntroducido === randomWord) { // si el texto introducido es igual al string determinado
            audioCorrect.play();
            document.getElementById("guess").style.backgroundColor = "green";
            document.getElementById("guess").style.color = "white";
            segundos = 2;
            correct = 1;
            if (correctCounted == false) {
                wcorrect = wcorrect + 1;
            }
            correctCounted = true;
            document.getElementById("points").innerText = wcorrect + "/" + maxWords + " · " + points + " points";
        } else {
            correct = 0;
            subtractPoints(1);
            wrongWord();
        }
    }
});


function addPoints(p) {
    points = points + p;
    document.getElementById("points").innerText = wcorrect + "/" + maxWords + " · " + points + " points";
}

function subtractPoints(p) {
    points = points - p;
    document.getElementById("points").innerText = points + " points";
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
wordInput.addEventListener('input', function() {
  this.value = this.value.toUpperCase();
});
