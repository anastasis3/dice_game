export class ProbabilityCalculator {
  static calculateProbabilities(diceList) {
    const n = diceList.length;
    const matrix = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === j) continue;
        let wins = 0;
        let total = 0;
        for (const a of diceList[i].faces) {
          for (const b of diceList[j].faces) {
            if (a > b) wins++;
            total++;
          }
        }
        matrix[i][j] = (wins / total * 100).toFixed(2);
      }
    }
    return matrix;
  }
}