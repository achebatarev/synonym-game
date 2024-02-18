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

//TODO: Display win or lose message
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
    console.log("I'm registered")
    const generateBtn = window.document.getElementById('btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', startGame);
    }
    else {
        throw new Error('no such button here chief')
    }
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

    const input = document.createElement("input");
    input.placeholder = "Enter your word";
    // TODO: This is for testing convenience, remove this later
    input.value = "good";
    input.id = "initialInput";

    const btn = document.createElement("button");
    btn.textContent = "Start Game"
    div.appendChild(input)
    div.appendChild(btn)
    return div
}

function createEndGameDiv() {
    const div = document.createElement("div");
    div.id = "endGame";

    const message = document.createElement("p")
    message.id = "message"
    message.textContent = "This is it, you're done"

    const points = document.createElement("p")
    points.id = "points"
    points.textContent = `Final points: ${globalState.points}`

    //TODO: create a button to start the game all over

    div.appendChild(message)
    div.appendChild(points)

    return div
}

function createGameDiv() {
    const newDiv = document.createElement('div');
    newDiv.id = 'words';
    newDiv.textContent = `The word you selected is "${globalState.word}"`;

    const input = document.createElement("input")
    input.setAttribute("type", "text")
    input.setAttribute("placeholder", "Select Synonym")
    input.setAttribute("value", "sound")
    input.setAttribute("id", "synonymInput")

    const btn = document.createElement("button")
    btn.addEventListener("click", evaluateWord)
    btn.textContent = "Verify"

    const points = document.createElement("p")
    points.setAttribute("id", "points")
    points.textContent = `Points: ${globalState.points}`

    const timer = document.createElement("p")
    timer.setAttribute("id", "timer")
    globalState.time = 60

    newDiv.appendChild(input)
    newDiv.appendChild(btn)
    newDiv.appendChild(points)
    newDiv.appendChild(timer)

    return newDiv
}

// ##################
// ##### EXPORT #####
// ##################

if (typeof module == 'undefined') {
    registerEventListener()
}

if (typeof module !== 'undefined') {
    module.exports = {
        registerEventListener,
        processRequest: startGame,
        sendRequest,
    };
};
