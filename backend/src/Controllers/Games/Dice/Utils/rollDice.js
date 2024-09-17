const { SIDES_OF_DICE } = require("../Data/constants");

// server generates results
const rollDiceAndCalculateResults = (numberOfDices) => {
  const serverResults = [];
  let serverResultTotals = 0;

  for (let i = 1; i <= numberOfDices; i++) {
    const randomNumber = Math.ceil(Math.random() * SIDES_OF_DICE);
    serverResultTotals += randomNumber;
    serverResults.push(randomNumber);
  }

  return { serverResults, serverResultTotals };
};

module.exports = { rollDiceAndCalculateResults };
