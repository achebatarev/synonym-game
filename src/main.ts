// ###################
// ##### GLOBALS #####
// ###################
//
interface globalStateObject {
    word: string,
    synonyms: string[]
    points: number,
    wordsEntered: string[],
    time: number,
};

const globalState: globalStateObject = {
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

function checkIfSynonym(word: string): boolean {
    if (globalState.synonyms.includes(word))
        return true
    return false
}

function updatePoints() {
    const p = document.getElementById("points")
    if (!p)
        throw new Error("points are not found")
    p.textContent = `Points: ${globalState.points}`
}


function updateTime() {
    const t = document.getElementById("timer")
    if (!t)
        throw new Error("Timer is not found")
    t.textContent = `Time: 00:${globalState.time}`
}

function updateParent(div: HTMLElement) {
    const parent = document.getElementById("parent")
    const oldDiv = parent?.querySelector("div")
    if (!parent || !oldDiv) {
        throw new Error("Parent or oldDiv is not found")
    }
    parent.replaceChild(div, oldDiv)
}

async function sendRequest(word: string) {
    const resp = await fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`, options);
    const result = await resp.json();
    return result?.synonyms
}

function evaluateWord() {
    let word = (document.getElementById("synonymInput") as HTMLInputElement).value
    if (globalState.wordsEntered.includes(word)) {
        throw new Error("Enter another word")
    }
    globalState.wordsEntered.push(word)
    const isSynonym = checkIfSynonym(word)
    if (isSynonym) {
        globalState.points += 20
        updatePoints()
    }

    console.log(globalState)
}

function launchTimer() {
    let intervalId: NodeJS.Timeout;
    intervalId = setInterval(() => {
        globalState.time--;
        updateTime();
        if (globalState.time <= 0) {
            endGame();
            clearInterval(intervalId);
        }
    }, 1000)
}

// ##########################
// ##### EVENT LISTENER #####
// ##########################


function registerEventListener() {
    const generateBtn = window.document.getElementById('btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', startGame);
    }
    else {
        throw new Error('no such button here chief')
    }
}

function start() {
    const div = createStartGameDiv()
    updateParent(div)
}

async function startGame(_: Event) {
    let word = (document.getElementById("initialInput") as HTMLInputElement).value
    globalState.word = word
    console.log("Processing the request");
    const words = await sendRequest(word);
    globalState.synonyms = words;


    const gameDiv = createGameDiv();
    updateParent(gameDiv)

    launchTimer();
    console.log(globalState)
}

function endGame() {
    const div = createEndGameDiv()
    updateParent(div)
}

// ##############################
// ##### ELEMENT GENERATORS #####
// ##############################

//NOTE: Recreate vs Store? The benefits of recreating is no state changes, but potential slow down in performance
// For this use case, unless, I experience significant slowdowns, recreate is better
function createStartGameDiv() {
    const div = document.createElement("div");
    div.id = "startGame";
    div.classList.value = "bg-gray-100 p-4 rounded-lg shadow-md"

    const input = document.createElement("input");
    input.placeholder = "Enter your word";

    input.classList.value = "w-full border border-gray-300 rounded px-3 py-2 mb-2";
    input.id = "initialInput";

    const btn = document.createElement("button");
    btn.textContent = "Start Game"
    btn.classList.value = "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    btn.addEventListener('click', startGame);


    div.appendChild(input)
    div.appendChild(btn)
    return div
}

function createEndGameDiv() {
    const div = document.createElement("div");
    div.id = "endGame";
    div.classList.value = "bg-gray-100 p-4 rounded-lg shadow-md"

    const message = document.createElement("p")
    message.id = "message"
    message.textContent = "This is it, you're done"

    const points = document.createElement("p")
    points.id = "points"
    points.textContent = `Final points: ${globalState.points}`

    const btn = document.createElement("button")
    btn.textContent = "Start new game"
    btn.classList.value = "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    btn.addEventListener("click", start)

    div.appendChild(message)
    div.appendChild(points)
    div.appendChild(btn)

    return div
}

function createGameDiv() {
    const div = document.createElement('div');
    div.id = 'words';
    div.textContent = `The word you selected is "${globalState.word}"`;
    div.classList.value = "bg-gray-100 p-4 rounded-lg shadow-md"

    const input = document.createElement("input")
    input.classList.value = "w-full border border-gray-300 rounded px-3 py-2 mb-2";
    input.setAttribute("type", "text")
    input.setAttribute("placeholder", "Select Synonym")
    input.setAttribute("value", "sound")
    input.setAttribute("id", "synonymInput")

    const btn = document.createElement("button")
    btn.addEventListener("click", evaluateWord)
    btn.textContent = "Verify"
    btn.classList.value = "bg-sky-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"

    const points = document.createElement("p")
    points.setAttribute("id", "points")
    points.textContent = `Points: ${globalState.points}`

    const timer = document.createElement("p")
    timer.setAttribute("id", "timer")
    globalState.time = 60

    div.appendChild(input)
    div.appendChild(btn)
    div.appendChild(points)
    div.appendChild(timer)

    return div
}

// ##################
// ##### EXPORT #####
// ##################

if (typeof module == 'undefined') {
    start()
}

if (typeof module !== 'undefined') {
    module.exports = {
        registerEventListener,
        processRequest: startGame,
        sendRequest,
    };
};
