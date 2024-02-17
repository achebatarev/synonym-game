# Synonym Game

The goal of this game is to expand your vocabulary by playing a synonym game

## Functional Requirements

- [x] To start the game users should select a word
- [x] A user can enter a word and the system will check if it's a synonym or not
- [x] For each correct answer, add points
- [ ] If the word is not found within a minute game over
    - [ ] Display points at the end of the game

### Strech Goals

- [ ] Make it look pretty
- [ ] Allow multiple users to join and play the game
- [ ] Allow users to configure
    - [ ] time to find a synonym 


## Engineering Requirements

- [x] Use typescript
- [ ] Test behaviour with unit tests

## TODO

- [x] Send request to api on a button click and display them 
- [ ] Figure out how to restart the game

## Notes

- To transpile to js during development use: `npx tsc --watch` 
- Jest has support for tests written in ts
- Jest has a whole issue with fail function: https://github.com/jestjs/jest/issues/11698 
    - throw new Error instead
- Don't test functions, test behaviour
