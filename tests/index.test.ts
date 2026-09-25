import { expect, test } from 'vitest';
import { uuidv7, uuidv7Buffer } from '../src/index';

test('generates valid length', () => {
    const id = uuidv7();
    expect(id.length).toBe(36);
});
