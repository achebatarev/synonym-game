"use strict";
;
const globalState = {
    word: "",
    synonyms: [],
    points: 0,
    wordsEntered: [],
    time: 0
};
//TODO: figure out a way to redact this secret when pushing to github
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
    },
};
// ##################
// ##### HELPER #####
// ##################
function checkIfSynonym(word) {
    if (globalState.synonyms.includes(word))
        return true;
    return false;
}
function updatePoints() {
    const p = document.getElementById("points");
    if (!p)
        throw new Error("points are not found");
    p.textContent = `Points: ${globalState.points}`;
}
function updateTime() {
    const t = document.getElementById("timer");
    if (!t)
        throw new Error("Timer is not found");
    t.textContent = `Time: 00:${globalState.time}`;
}
async function sendRequest(word) {
    const resp = await fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`, options);
    const result = await resp.json();
    return result === null || result === void 0 ? void 0 : result.synonyms;
}
//TODO: Display win or lose message
function evaluateWord() {
    let word = document.getElementById("synonymInput").value;
    if (globalState.wordsEntered.includes(word)) {
        throw new Error("Enter another word");
    }
    globalState.wordsEntered.push(word);
    const isSynonym = checkIfSynonym(word);
    if (isSynonym) {
        globalState.points += 20;
        updatePoints();
    }
    console.log(globalState);
}
function launchTimer() {
    let intervalId;
    intervalId = setInterval(() => {
        globalState.time--;
        updateTime();
        if (globalState.time <= 0)
            clearInterval(intervalId);
    }, 1000);
}
// ##########################
// ##### EVENT LISTENER #####
// ##########################
function registerEventListener() {
    console.log("I'm registered");
    const generateBtn = window.document.getElementById('btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', registerNewWord);
    }
    else {
        throw new Error('no such button here chief');
    }
}
const registerNewWord = (_) => {
    let word = document.getElementById("initialInput").value;
    globalState.word = word;
    processRequest();
};
async function processRequest() {
    console.log("Processing the request");
    let word = globalState.word;
    const words = await sendRequest(word);
    globalState.synonyms = words;
    const gameDiv = createGameDiv();
    window.document.body.appendChild(gameDiv);
    launchTimer();
    console.log(globalState);
}
// ##############################
// ##### ELEMENT GENERATORS #####
// ##############################
function createGameDiv() {
    const newDiv = document.createElement('div');
    newDiv.id = 'words';
    newDiv.textContent = `The word you selected is "${globalState.word}"`;
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Select Synonym");
    input.setAttribute("value", "sound");
    input.setAttribute("id", "synonymInput");
    const btn = document.createElement("button");
    btn.addEventListener("click", evaluateWord);
    btn.textContent = "Verify";
    const points = document.createElement("p");
    points.setAttribute("id", "points");
    points.textContent = `Points: ${globalState.points}`;
    const timer = document.createElement("p");
    timer.setAttribute("id", "timer");
    globalState.time = 60;
    newDiv.appendChild(input);
    newDiv.appendChild(btn);
    newDiv.appendChild(points);
    newDiv.appendChild(timer);
    return newDiv;
}
// ##################
// ##### EXPORT #####
// ##################
if (typeof module == 'undefined') {
    registerEventListener();
}
if (typeof module !== 'undefined') {
    module.exports = {
        registerEventListener,
        processRequest,
        sendRequest,
    };
}
;
