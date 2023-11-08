const main = require('../src/main');

test('testing test', () => {
  expect(main.hello()).toBe('Hello World');
});
