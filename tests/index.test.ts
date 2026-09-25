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
