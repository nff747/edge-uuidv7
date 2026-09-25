let cryptoObj = typeof crypto !== 'undefined' ? crypto : undefined;
if (!cryptoObj && typeof globalThis !== 'undefined' && globalThis.crypto) {
    cryptoObj = globalThis.crypto;
}
const defaultBuffer = new Uint8Array(16);

let lastTimestamp = 0;
let seq = 0;

export function uuidv7Buffer(buffer = defaultBuffer): Uint8Array {
    cryptoObj!.getRandomValues(buffer);
    let now = Date.now();
    
    if (now > lastTimestamp) {
        seq = 0;
        lastTimestamp = now;
    } else {
        seq++;
        if (seq > 0xfff) {
            seq = 0;
            now++;
            lastTimestamp = now;
        }
    }
    
    buffer[0] = (now / 0x10000000000) & 0xff;
    buffer[1] = (now / 0x100000000) & 0xff;
    buffer[2] = (now / 0x1000000) & 0xff;
    buffer[3] = (now / 0x10000) & 0xff;
    buffer[4] = (now / 0x100) & 0xff;
    buffer[5] = now & 0xff;
    
    buffer[6] = 0x70 | ((seq >>> 8) & 0x0f);
    buffer[7] = seq & 0xff;
    
    buffer[8] = (buffer[8] & 0x3f) | 0x80;
    
    return buffer;
}

const byteToHex: string[] = [];
for (let i = 0; i < 256; i++) {
    byteToHex[i] = (i + 0x100).toString(16).substring(1);
}
