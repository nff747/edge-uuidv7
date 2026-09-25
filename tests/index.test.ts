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
