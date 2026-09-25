// Edge UUIDv7 generator
let cryptoObj = typeof crypto !== 'undefined' ? crypto : undefined;
if (!cryptoObj && typeof globalThis !== 'undefined' && globalThis.crypto) {
    cryptoObj = globalThis.crypto;
}
