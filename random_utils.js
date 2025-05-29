import crypto from 'crypto';

export class RandomUtils {
  static generateRandomInt(range) {
    const max = 256;
    let num;
    do {
      const buf = crypto.randomBytes(1);
      num = buf.readUInt8(0);
    } while (num >= max - (max % range)); 
    return num % range;
  }

  static randomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }
}