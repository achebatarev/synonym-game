API_key = '';
const synonymSet = new Set();
counter = 0;
function hello() {
  return 'Hello World';
}
function btnClick() {
  const word = document.getElementById('user_text').value;
  console.log(word);
    handleAPI(word);
}
document.getElementById('btn').addEventListener('click', btnClick);
// send request
// return a list of words
async function handleAPI(word) {
  const resp = await fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${API_key}`);
  const data = await resp.json();
  console.log(data);

data.forEach(entry => {
  if (entry.meta.syns) {
    entry.meta.syns.forEach(synonymGroup => {
      synonymGroup.forEach(synonym => {
        synonymSet.add(synonym);
      });
    });
  }
});

console.log('Synonyms:', [...synonymSet]);

}
// handleAPI('hello');

async function validateSynonym(word){
  if (synonymSet.has(word)){
    return true;
  }
  else{
    return false;
  }
}

async function validateWord(word){
  const inputElement = document.getElementById('user_text');
  }

}
// module.exports = {
//   hello,
//   btnClick,
//   handleAPI,
// };
