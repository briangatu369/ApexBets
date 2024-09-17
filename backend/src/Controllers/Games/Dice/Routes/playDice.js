const { Dice } = require("../../../../Models/Dice");
const {
  GAMES_MODES,
  MAXIMUM_DICES,
  MAXIMUM_WIN_AMOUNT,
  MAXIMUM_STAKE,
  MINIMUM_STAKE,
} = require("../Data/constants");
const {
  validatePredictionInCorrectMode,
} = require("../GameLogics/correctModeLogic");
const { validatePredictionInOverMode } = require("../GameLogics/overModeLogic");
const {
  validatePredictionInUnderMode,
} = require("../GameLogics/underModeLogic");
const { calculateDiceMultiplier } = require("../Utils/calculateMultiplier");
const {
  calculateFavorableOutcomes,
} = require("../Utils/calculateFavourableOutcomes");
const { rollDiceAndCalculateResults } = require("../Utils/rollDice");
const { updateUserBalance } = require("../../../../services/updateUserBalance");
const { findUser } = require("../../../../services/findUser");
const { getBalanceType } = require("../../../../services/getBalanceType");
const {
  checkIfHasEnoughBalance,
} = require("../../../../services/hasEnoughBalance");
const { ACCOUNT } = require("../../../../Data/constants");

//dice payload
const buildDicePayload = (
  stake,
  accountType,
  gameMode,
  numberOfDices,
  serverResults,
  serverResultTotals,
  userId
) => ({
  stake: { amount: stake, accountType },
  mode: gameMode,
  numberOfDices,
  status: "",
  results: serverResults,
  payout: 0,
  resultTotals: serverResultTotals,
  multiplier: 0,
  userId: userId,
});

const playDice = async (req, res) => {
  try {
    const user = req.user; // pushed after veryfying jwt
    let { stake, accountType, numberOfDices, predictedOutcome, gameMode } =
      req.body;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const { _id } = user;

    if (
      isNaN(stake) ||
      stake <= 0 ||
      isNaN(numberOfDices) ||
      numberOfDices <= 0 ||
      isNaN(predictedOutcome) ||
      predictedOutcome <= 0 ||
      !gameMode
    ) {
      return res.status(400).json({
        message: "Invalid Inputs.Please try again",
      });
    }

    //user real account if accountType is not passed
    if (!accountType) {
      accountType = ACCOUNT.REAL;
    }

    //check if maximum number of dices is exceeded(maximum dices is 6)
    if (numberOfDices > MAXIMUM_DICES) {
      return res.status(400).json({
        message: "Number of dices can't exceed 6",
      });
    }

    //check if maximum stake is exceeded
    if (stake > MAXIMUM_STAKE) {
      return res.status(400).json({
        message: `Maximum stake is ${MAXIMUM_STAKE}`,
      });
    }

    // check if stake is less than minimum stake
    if (stake < MINIMUM_STAKE) {
      return res.status(400).json({
        message: `Minimum stake is ${MINIMUM_STAKE}`,
      });
    }

    // check if gameMode is present
    const isValidGameMode = Object.values(GAMES_MODES).includes(gameMode);
    if (!isValidGameMode) {
      return res.status(400).json({ message: "Invalid game mode." });
    }

    //check if has enough balances to placeBet
    const userInfo = await findUser("_id", _id); //key,value pair
    if (!userInfo) {
      return res.status(404).json({ message: "user was not found" });
    }

    const { accountBalance, demoBalance } = userInfo;

    const { canBet, message } = checkIfHasEnoughBalance(
      accountType,
      stake,
      accountBalance,
      demoBalance
    );

    // has Insufficient funds
    if (!canBet) {
      return res.status(400).json({ message });
    }

    const calculateFavorableOutcome = calculateFavorableOutcomes(); // returns a function to calculate favourableOutcomess
    let comparisonFn, favourableOutcome, multiplier, accountBalances;

    // server rolls the dices and generate outcomes
    const { serverResults, serverResultTotals } =
      rollDiceAndCalculateResults(numberOfDices);

    let dicePayload = buildDicePayload(
      stake,
      accountType,
      gameMode,
      numberOfDices,
      serverResults,
      serverResultTotals,
      _id
    );

    //CORRECT MODE
    if (gameMode === GAMES_MODES.CORRECTMODE) {
      //check minimum and maximum prediction threshold
      validatePredictionInCorrectMode(predictedOutcome, numberOfDices);

      comparisonFn = (currentCount, predictedOutcome) =>
        currentCount === predictedOutcome;
      favourableOutcome = calculateFavorableOutcome(
        0, //starting count of favourableOutcomes
        numberOfDices,
        predictedOutcome,
        comparisonFn
      );
      multiplier = calculateDiceMultiplier(favourableOutcome, numberOfDices);

      //WON
      if (serverResultTotals === predictedOutcome) {
        let balanceType = getBalanceType(accountType); //balance to update in database ..accountBalace or demoBalance

        let winAmount = multiplier * stake;

        if (winAmount > MAXIMUM_WIN_AMOUNT) {
          winAmount = MAXIMUM_WIN_AMOUNT;
        }

        const accountIncrementValue = winAmount - stake; // Reason:stake was not decremented earlier in Balances
        accountBalances = await updateUserBalance(
          _id,
          balanceType,
          accountIncrementValue, //incremented to respective account,demo or real account
          true
        );

        dicePayload = {
          ...dicePayload,
          status: "WON",
          payout: winAmount,
          multiplier,
        };
      } else {
        // BUSTED
        let balanceType = getBalanceType(accountType); //balance to update in database ...accountBalace or demoBalance
        accountBalances = await updateUserBalance(
          _id,
          balanceType,
          stake, // decremented from respective account,demo or real account
          false
        );

        dicePayload.status = "BUSTED";
        dicePayload.multiplier = multiplier;
      }
    }

    // OVER MODE
    if (gameMode === GAMES_MODES.OVERMODE) {
      //check minimum and maximum prediction threshold
      validatePredictionInOverMode(predictedOutcome, numberOfDices);

      comparisonFn = (currentCount, predictedOutcome) =>
        currentCount > predictedOutcome;
      favourableOutcome = calculateFavorableOutcome(
        0, //starting count of favourableOutcomes
        numberOfDices,
        predictedOutcome,
        comparisonFn
      );

      multiplier = calculateDiceMultiplier(favourableOutcome, numberOfDices);

      //WON
      if (serverResultTotals > predictedOutcome) {
        let balanceType = getBalanceType(accountType); //balance to update in database ..accountBalace or demoBalance

        let winAmount = multiplier * stake;

        if (winAmount > MAXIMUM_WIN_AMOUNT) {
          winAmount = MAXIMUM_WIN_AMOUNT;
        }

        const accountIncrementValue = winAmount - stake; // Reason:stake was not decremented earlier in Balances
        accountBalances = await updateUserBalance(
          _id,
          balanceType,
          accountIncrementValue, //incremented to respective account,demo or real account
          true
        );

        dicePayload = {
          ...dicePayload,
          status: "WON",
          payout: winAmount,
          multiplier,
        };
      } else {
        //BUSTED
        let balanceType = getBalanceType(accountType); // balance to update in database ...accountBalace or demoBalance
        accountBalances = await updateUserBalance(
          _id,
          balanceType,
          stake, // decremented from respective account,demo or real account
          false
        );

        dicePayload.status = "BUSTED";
        dicePayload.multiplier = multiplier;
      }
    }

    // UNDER MODE
    if (gameMode === GAMES_MODES.UNDERMODE) {
      //check minimum and maximum prediction threshold
      validatePredictionInUnderMode(predictedOutcome, numberOfDices);

      //calculate multiplier
      comparisonFn = (currentCount, predictedOutcome) =>
        currentCount < predictedOutcome;
      favourableOutcome = calculateFavorableOutcome(
        0, //starting count of favourableOutcomes
        numberOfDices,
        predictedOutcome,
        comparisonFn
      );
      multiplier = calculateDiceMultiplier(favourableOutcome, numberOfDices);

      //WON
      if (serverResultTotals < predictedOutcome) {
        let balanceType = getBalanceType(accountType); //balance to update in database ..accountBalace or demoBalance

        let winAmount = multiplier * stake;

        if (winAmount > MAXIMUM_WIN_AMOUNT) {
          winAmount = MAXIMUM_WIN_AMOUNT;
        }

        const accountIncrementValue = winAmount - stake; // Reason:stake was not decremented earlier in Balances
        accountBalances = await updateUserBalance(
          _id,
          balanceType,
          accountIncrementValue, //incremented to respective account,demo or real account
          true
        );

        dicePayload = {
          ...dicePayload,
          status: "WON",
          payout: winAmount,
          multiplier,
        };
      } else {
        // BUSTED
        let balanceType = getBalanceType(accountType); //  balance to update in database ...accountBalace or demoBalance
        accountBalances = await updateUserBalance(
          _id,
          balanceType,
          stake, // decremented from respective account,demo or real account
          false
        );

        dicePayload.status = "BUSTED";
        dicePayload.multiplier = multiplier;
      }
    }

    // Save the game result
    const diceGame = new Dice(dicePayload);
    await diceGame.save();

    return res.status(200).json({
      data: {
        ...dicePayload,
        accountBalances,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
};

module.exports = { playDice };
