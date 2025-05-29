export class ProbabilityTable {
  static print(diceList, matrix) {
    console.log("\nProbability Table (Winning %):");
    const header = ['D#', ...diceList.map((_, i) => `D${i}`)].join('\t');
    console.log(header);
    for (let i = 0; i < diceList.length; i++) {
      const row = [`D${i}`];
      for (let j = 0; j < diceList.length; j++) {
        row.push(i === j ? '-' : `${matrix[i][j]}%`);
      }
      console.log(row.join('\t'));
    }
    console.log();
  }
}