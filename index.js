import { DiceParser } from './dice.js';
import { Game } from './game.js';

(async () => {
  try {
    const args = process.argv.slice(2);
    const diceList = DiceParser.parseDiceArguments(args);
    const game = new Game(diceList);
    await game.start();
  } catch (e) {
    console.error("Error:", e.message);
    process.exit(1);
  }
})();