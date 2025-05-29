export class Dice {
  constructor(faces) {
    if (!Array.isArray(faces) || faces.length === 0) {
      throw new Error("Invalid dice faces");
    }
    this.faces = faces.map(Number);
  }

  roll(index) {
    return this.faces[index];
  }

  get size() {
    return this.faces.length;
  }

  toString() {
    return `[${this.faces.join(",")}]`;
  }
}
