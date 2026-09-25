let cryptoObj = typeof crypto !== 'undefined' ? crypto : undefined;
if (!cryptoObj && typeof globalThis !== 'undefined' && globalThis.crypto) {
    cryptoObj = globalThis.crypto;
}
const defaultBuffer = new Uint8Array(16);

export function uuidv7Buffer(buffer = defaultBuffer): Uint8Array {
    cryptoObj!.getRandomValues(buffer);
    let now = Date.now();
    
    buffer[0] = (now / 0x10000000000) & 0xff;
    buffer[1] = (now / 0x100000000) & 0xff;
    buffer[2] = (now / 0x1000000) & 0xff;
    buffer[3] = (now / 0x10000) & 0xff;
    buffer[4] = (now / 0x100) & 0xff;
    buffer[5] = now & 0xff;
    
    buffer[6] = (buffer[6] & 0x0f) | 0x70;
    buffer[8] = (buffer[8] & 0x3f) | 0x80;
    
    return buffer;
}
