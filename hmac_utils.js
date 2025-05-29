import crypto from 'crypto';

export class HMACUtil {
  static generateKey() {
    return crypto.randomBytes(32); 
  }

  static generateRandomInt(range) {
    const max = 256;
    let num;
    do {
      const buf = crypto.randomBytes(1);
      num = buf.readUInt8(0);
    } while (num >= max - (max % range)); 
    return num % range;
  }

  static hmacSHA3(key, message) {
    return crypto.createHmac('sha3-256', key).update(message.toString()).digest('hex');
  }
}