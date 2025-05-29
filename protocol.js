import readlineSync from 'readline-sync';
import { HMACUtil } from './hmac_utils.js';
import { RandomUtils } from './random_utils.js';

export class FairRandomProtocol {
  static async generateWithUser(range, label) {
    const key = HMACUtil.generateKey();
    const number = RandomUtils.generateRandomInt(range);
    const hmac = HMACUtil.hmacSHA3(key, number);

    console.log(`I selected a random value in the range 0..${range - 1} (HMAC=${hmac})`);

    const user = this.askUserForNumber(range, label);

    console.log(`My number is ${number} (KEY=${key.toString('hex')})`);

    const final = (number + user) % range;
    console.log(`The fair number generation result is ${number} + ${user} = ${final} (mod ${range})`);
    return final;
  }

  static askUserForNumber(range, label) {
    while (true) {
      console.log(`Add your number modulo ${range}.`);
      for (let i = 0; i < range; i++) {
        console.log(`${i} - ${i}`);
      }
      console.log("X - exit");
      console.log("? - help");

      const input = readlineSync.question(`${label} Your selection: `).trim().toLowerCase();
      if (input === 'x') process.exit(0);
      if (input === '?') return this.showHelp();

      const val = parseInt(input, 10);
      if (!isNaN(val) && val >= 0 && val < range) return val;

      console.log("Invalid input, try again.");
    }
  }

  static showHelp() {
    console.log("This is the fair number generation step. Enter a number in the range to contribute.");
    return this.askUserForNumber();
  }
}