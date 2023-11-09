const path = require('path');
const fs = require('fs');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

const {JSDOM} = require('jsdom');
const main = require('../src/main');

let dom;
let container;

beforeEach(() => {
  dom = new JSDOM(html, {runScripts: 'dangerously'});
  container = dom.window.document.body;
});


test('use jsdom in this test file', () => {
  const element = dom.window.document.createElement('div');
  expect(element).not.toBeNull();
});


test('testing test', () => {
  expect(main.hello()).toBe('Hello World');
});

test('renders h1 element', () => {
  expect(container.querySelector('h1')).not.toBeNull();
});
