// ###################
// ##### GLOBALS #####
// ###################
//
interface globalStateObject {
    word: string,
    synonyms: string[]
    points: number,
    wordsEntered: string[]
};

const globalState: globalStateObject = {
    word: "",
    synonyms: [],
    points: 0,
    wordsEntered: []
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
//
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


// ##########################
// ##### EVENT LISTENER #####
// ##########################


function registerEventListener() {
    console.log("I'm registered")
    const generateBtn = window.document.getElementById('btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', registerNewWord);
    }
    else {
        throw new Error('no such button here chief')
    }
}

const registerNewWord = (_: Event) => {
    let word = (document.getElementById("initialInput") as HTMLInputElement).value
    globalState.word = word
    processRequest();
}


async function processRequest() {
    console.log("Processing the request");
    let word = globalState.word
    const words = await sendRequest(word);
    globalState.synonyms = words


    const gameDiv = createGameDiv()
    window.document.body.appendChild(gameDiv)

    console.log(globalState)
}

// ##############################
// ##### ELEMENT GENERATORS #####
// ##############################


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

    newDiv.appendChild(input)
    newDiv.appendChild(btn)
    newDiv.appendChild(points)

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
        processRequest,
        sendRequest,
    };
};
