/**
 * @jest-environment jsdom
 */
import { TextEncoder, TextDecoder } from 'util';
Object.assign(global, { TextDecoder, TextEncoder });

const path = require('path');
const fs = require('fs');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

const main = require('../src/main');

beforeEach(() => {
    window.document.body.innerHTML = html
})

test('use jsdom in this test file', () => {
    const element = window.document.createElement('div');
    expect(element).not.toBeNull();
});


test('testing test', () => {
    expect(main.hello()).toBe('Hello World');
});

test('renders h1 element', () => {
    expect(document.querySelector('h1')).not.toBeNull();
});
// TODO: mock the bevhiour of sendRequest function to return specific words
// NOTE: Event register seems to operate on a different document then this test,
test('test registering btn click listener works', () => {
    let btn = document.getElementById('btn');
    main.registerEventListener()
    if (btn) {
        btn.click()
    }
    else {
        throw new Error('btn is not found');
    }
    let element = document.getElementById('words')
    expect(element).not.toBeNull();
    expect(element?.textContent).toEqual('hello, world')
});
