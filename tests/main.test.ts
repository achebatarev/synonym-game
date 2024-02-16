/**
 * @jest-environment jsdom
 */

import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });
const path = require('path');
const fs = require('fs');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

const { JSDOM } = require('jsdom');
const main = require('../src/main');

let win: Window;
let doc: Document;

beforeEach(() => {
    let dom = new JSDOM(html);
    win = dom.window
    doc = dom.window.document;
});


test('use jsdom in this test file', () => {
    const element = win.document.createElement('div');
    expect(element).not.toBeNull();
});


test('testing test', () => {
    expect(main.hello()).toBe('Hello World');
});

test('renders h1 element', () => {
    expect(doc.querySelector('h1')).not.toBeNull();
});
// TODO: mock the bevhiour of sendRequest function to return specific words
test('test registering btn click listener works', () => {
    let btn = doc.getElementById('btn')
    console.log(btn?.textContent)
    if (btn) {
        btn.click()
    }
    else {
        throw new Error('btn is not found');
    }
    let element = doc.getElementById('words')
    expect(element).not.toBeNull();
    expect(element?.textContent).toEqual('hello, world')
});
