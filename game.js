import readlineSync from 'readline-sync';
import { FairRandomProtocol } from './protocol.js';
import { ProbabilityCalculator } from './probability.js';
import { ProbabilityTable } from './table.js';
import { RandomUtils } from './random_utils.js';
import { Dice } from './dice.js';

console.log("Game start");

const args = process.argv.slice(2);
let diceList = [];

// 🔍 Проверка аргументов
if (args.length === 0) {
  console.log("⚠️  Нет переданных кубиков. Используются стандартные два кубика [1,2,3] и [4,5,6].");

} else {
  if (args.length < 3) {
    console.error("❌ Ошибка: необходимо минимум 3 кубика.");
    console.error("Пример запуска: node game.js 1,2,3,4,5,6 1,1,6,6,8,8 3,3,5,5,7,7");
    process.exit(1);
  }

  for (const arg of args) {
    const values = arg.split(',').map(n => parseInt(n, 10));

    if (values.some(n => isNaN(n))) {
      console.error(`❌ Ошибка: В кубике [${arg}] есть недопустимые значения (не числа).`);
      process.exit(1);
    }

    if (values.length % 2 !== 0) {
      console.error(`❌ Ошибка: Количество граней должно быть чётным. Кубик: [${arg}]`);
      process.exit(1);
    }

    diceList.push(new Dice(values));
  }
}

const playerName = readlineSync.question("What is your name? ");
console.log(`Hello, ${playerName}!`);

class Game {
  constructor(diceList) {
    this.diceList = diceList;
  }

  async start() {
    console.log("Let's determine who makes the first move.");
    const first = await FairRandomProtocol.generateWithUser(2, "Guess my 0 or 1:");
    const computerFirst = first === 1;
    const diceChoices = this.getDiceChoices();

    let computerDiceIndex, userDiceIndex;

    if (computerFirst) {
      computerDiceIndex = RandomUtils.randomIndex(diceChoices);
      console.log(`I make the first move and choose the ${this.diceList[computerDiceIndex]}`);
      userDiceIndex = this.userChooseDice(diceChoices.filter(i => i !== computerDiceIndex));
    } else {
      userDiceIndex = this.userChooseDice(diceChoices);
      computerDiceIndex = diceChoices.find(i => i !== userDiceIndex);
      console.log(`I choose the ${this.diceList[computerDiceIndex]}`);
    }

    await this.performRoll("My", computerDiceIndex);
    await this.performRoll("Your", userDiceIndex);
  }

  getDiceChoices() {
    return [...Array(this.diceList.length).keys()];
  }

  userChooseDice(indices) {
    while (true) {
      console.log("Choose your dice:");
      for (const i of indices) {
        console.log(`${i} - ${this.diceList[i].toString()}`);
      }
      console.log("X - exit\n? - help");
      const input = readlineSync.question("Your selection: ").trim().toLowerCase();
      if (input === 'x') process.exit(0);
      if (input === '?') {
        const matrix = ProbabilityCalculator.calculateProbabilities(this.diceList);
        ProbabilityTable.print(this.diceList, matrix);
        continue;
      }
      const choice = parseInt(input);
      if (indices.includes(choice)) return choice;
      console.log("Invalid input.");
    }
  }

  async performRoll(who, diceIndex) {
    const dice = this.diceList[diceIndex];
    const index = await FairRandomProtocol.generateWithUser(dice.size, `${who} roll:`);
    const result = dice.roll(index);
    console.log(`${who} roll result is ${result}`);
  }
}

const game = new Game(diceList);
await game.start();
