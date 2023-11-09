API_URL = '';

function hello() {
  return 'Hello World';
}

// function main() {
// }
//
// p
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
    'X-RapidAPI-Key': 'ced5222603msh018d729ca3fed5bp15a99cjsn4708f3374ffc',
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
