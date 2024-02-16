"use strict";
function hello() {
    return 'Hello World';
}
function registerEventListener() {
    const generateBtn = window.document.getElementById('btn');
    let word = 'lackadaisical';
    const wrapper = (_) => processRequest(word);
    if (generateBtn) {
        generateBtn.addEventListener('click', wrapper);
    }
}
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
    const newDiv = window.document.createElement('div');
    newDiv.id = 'words';
    newDiv.textContent = words;
    window.document.body.appendChild(newDiv);
}
async function sendRequest(word) {
    const resp = await fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`, options);
    const result = resp.text();
    return result;
}
if (typeof module == 'undefined') {
    registerEventListener();
}
if (typeof module !== 'undefined') {
    module.exports = {
        hello,
    };
}
;
