const byteToHex: string[] = [];
for (let i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substring(1);
}

const defaultBuffer = new Uint8Array(16);
const randBuffer = new Uint8Array(10);

let lastTimestamp = 0;
let seqA = 0;
let seqB = 0n;

let _crypto: Crypto | any = typeof crypto !== 'undefined' ? crypto : undefined;

export function uuidv7Buffer(buffer: Uint8Array = defaultBuffer): Uint8Array {
  if (!_crypto) {
    _crypto = require('crypto').webcrypto;
  }
  let ts = Date.now();
  
  if (ts > lastTimestamp) {
    lastTimestamp = ts;
    // Generate new random sequence
    _crypto.getRandomValues(randBuffer);
    seqA = ((randBuffer[0] << 8) | randBuffer[1]) & 0x0fff; // 12 bits
    seqB = (BigInt(randBuffer[2] & 0x3f) << 56n) | // 6 bits
           (BigInt(randBuffer[3]) << 48n) |
           (BigInt(randBuffer[4]) << 40n) |
           (BigInt(randBuffer[5]) << 32n) |
           (BigInt(randBuffer[6]) << 24n) |
           (BigInt(randBuffer[7]) << 16n) |
           (BigInt(randBuffer[8]) << 8n) |
           (BigInt(randBuffer[9])); // 8 bits
  } else {
    // Increment monotonic counter
    seqB++;
    if (seqB >= (1n << 62n)) {
      seqB = 0n;
      seqA++;
      if (seqA >= (1 << 12)) {
        seqA = 0;
        lastTimestamp++;
        ts = lastTimestamp;
      }
    }
  }

  const tsMsb = Math.floor(ts / 4294967296); // ts / 2^32 (16 bits)
  const tsLsb = ts >>> 0; // ts & 0xFFFFFFFF (32 bits)

  buffer[0] = tsMsb >>> 8;
  buffer[1] = tsMsb & 0xff;
  buffer[2] = tsLsb >>> 24;
  buffer[3] = (tsLsb >>> 16) & 0xff;
  buffer[4] = (tsLsb >>> 8) & 0xff;
  buffer[5] = tsLsb & 0xff;

  buffer[6] = 0x70 | ((seqA >>> 8) & 0x0f);
  buffer[7] = seqA & 0xff;

  buffer[8] = 0x80 | Number((seqB >> 56n) & 0x3fn);
  buffer[9] = Number((seqB >> 48n) & 0xffn);
  buffer[10] = Number((seqB >> 40n) & 0xffn);
  buffer[11] = Number((seqB >> 32n) & 0xffn);
  buffer[12] = Number((seqB >> 24n) & 0xffn);
  buffer[13] = Number((seqB >> 16n) & 0xffn);
  buffer[14] = Number((seqB >> 8n) & 0xffn);
  buffer[15] = Number(seqB & 0xffn);

  return buffer;
}

export function uuidv7(): string {
  const buffer = uuidv7Buffer();
  return (
    byteToHex[buffer[0]] +
    byteToHex[buffer[1]] +
    byteToHex[buffer[2]] +
    byteToHex[buffer[3]] +
    '-' +
    byteToHex[buffer[4]] +
    byteToHex[buffer[5]] +
    '-' +
    byteToHex[buffer[6]] +
    byteToHex[buffer[7]] +
    '-' +
    byteToHex[buffer[8]] +
    byteToHex[buffer[9]] +
    '-' +
    byteToHex[buffer[10]] +
    byteToHex[buffer[11]] +
    byteToHex[buffer[12]] +
    byteToHex[buffer[13]] +
    byteToHex[buffer[14]] +
    byteToHex[buffer[15]]
  );
}
