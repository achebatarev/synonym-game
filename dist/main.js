"use strict";
const globalState = {
    word: "",
    synonyms: [],
    points: 0
};
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
//TODO: figure out a way to redact this secret when pushing to github
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
    },
};
function checkIfSynonym(word) {
    if (globalState.synonyms.includes(word))
        return true;
    return false;
}
//TODO: Display win or lose message
function evaluateWord() {
    let word = document.getElementById("synonymInput").value;
    const isSynonym = checkIfSynonym(word);
    if (isSynonym) {
        globalState.points += 20;
    }
    console.log(globalState);
}
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
    newDiv.appendChild(input);
    newDiv.appendChild(btn);
    return newDiv;
}
async function processRequest() {
    console.log("Processing the request");
    let word = globalState.word;
    const words = await sendRequest(word);
    globalState.synonyms = words;
    const gameDiv = createGameDiv();
    window.document.body.appendChild(gameDiv);
    console.log(globalState);
}
async function sendRequest(word) {
    const resp = await fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`, options);
    const result = await resp.json();
    return result === null || result === void 0 ? void 0 : result.synonyms;
}
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
