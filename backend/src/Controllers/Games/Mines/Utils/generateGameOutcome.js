const generateRandomNumber = (size) => Math.floor(Math.random() * size);

const generateGameOutcome = (arraySize, bombs) => {
  const gameOutcome = new Array(arraySize).fill(1);
  const zeroIndices = new Set();

  //determine bombs location
  while (zeroIndices.size < bombs) {
    const randomIndex = generateRandomNumber(arraySize);
    zeroIndices.add(randomIndex);
  }

  //populate bombs in the game
  for (let key of zeroIndices) {
    gameOutcome[key] = 0;
  }

  return gameOutcome;
};

module.exports = { generateGameOutcome };
