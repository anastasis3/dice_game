import { Dice } from './dice.js';

export class DiceParser {
  static parseDiceArguments(argv) {
    if (argv.length < 3) {
      throw new Error("At least 3 dice must be provided");
    }
    const diceList = argv.map(str => {
      const faces = str.split(',').map(Number);
      if (faces.some(isNaN)) throw new Error("Invalid face values");
      return new Dice(faces);
    });
    return diceList;
  }
}