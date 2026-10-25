import { expect, test } from 'vitest';
import { uuidv7, uuidv7Buffer } from '../src/index';

test('generates valid length', () => {
    const id = uuidv7();
    expect(id.length).toBe(36);
});

test('has correct format and hyphens', () => {
    const id = uuidv7();
    expect(id[8]).toBe('-');
    expect(id[13]).toBe('-');
    expect(id[18]).toBe('-');
    expect(id[23]).toBe('-');
});

test('contains correct version and variant', () => {
    const id = uuidv7();
    expect(id[14]).toBe('7'); // Version 7
    expect(['8', '9', 'a', 'b']).toContain(id[19]); // Variant 10xx
});

test('is monotonic within same millisecond', () => {
    const id1 = uuidv7();
    const id2 = uuidv7();
    expect(id1 < id2).toBe(true);
});

test('zero allocation works with custom buffer', () => {
    const buf = new Uint8Array(16);
    uuidv7Buffer(buf);
    expect(buf[6] >> 4).toBe(7); // Version check on buffer
});

import { extractTimestamp, isValidUUIDv7 } from '../src/index';

test('validates RFC 9562 format and rejects invalid versions', () => {
    const valid = uuidv7();
    expect(isValidUUIDv7(valid)).toBe(true);

    expect(isValidUUIDv7('not-a-uuid')).toBe(false);
    // UUIDv4 (version 4)
    expect(isValidUUIDv7('018e3d6f-7128-4bc2-8921-123456789abc')).toBe(false);
});

test('extracts embedded Unix epoch timestamp accurate within current second', () => {
    const before = Date.now();
    const id = uuidv7();
    const after = Date.now();

    const extracted = extractTimestamp(id);
    expect(extracted).toBeGreaterThanOrEqual(before);
    expect(extracted).toBeLessThanOrEqual(after);
});
