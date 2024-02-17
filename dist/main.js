"use strict";
function hello() {
    console.log('This is hello', window.document);
    return 'Hello World';
}
function registerEventListener() {
    console.log("I'm registered");
    const generateBtn = window.document.getElementById('btn');
    let word = 'lackadaisical';
    if (generateBtn) {
        generateBtn.addEventListener('click', wrapper);
    }
    else {
        throw new Error('no such button here chief');
    }
}
const wrapper = (_) => {
    let word = document.getElementById("input").value;
    processRequest(word);
};
//TODO: figure out a way to redact this secret when pushing to github
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
    },
};
async function processRequest(word) {
    console.log("Processing the request");
    const words = await sendRequest(word);
    const newDiv = document.createElement('div');
    newDiv.id = 'words';
    newDiv.textContent = words;
    window.document.body.appendChild(newDiv);
}
async function sendRequest(word) {
    const resp = await fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`, options);
    const result = await resp.text();
    return result;
}
if (typeof module == 'undefined') {
    registerEventListener();
}
if (typeof module !== 'undefined') {
    module.exports = {
        hello,
        registerEventListener,
        processRequest,
        sendRequest,
    };
}
;
