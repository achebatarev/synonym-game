require('dotenv').config();

function hello() {
  return 'Hello World';
}

function btnClick() {
  const generateBtn = document.getElementById('btn');
  const wrapper = (word) => handleAPI(word);
  generateBtn.addEventListener('click', wrapper);
}

// send request
// return a list of words
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.WORDSAPI_KEY,
    'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
  },
};

async function handleAPI(word) {
  const resp = await fetch('https://wordsapiv1.p.rapidapi.com/words/{word}/synonyms', options);
  const result = resp.text();
  console.log(result);
}

module.exports = {
  hello,
  btnClick,
};
