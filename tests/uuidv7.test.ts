import { expect, test } from 'vitest';
import { uuidv7 } from '../src/index';

test('uuidv7 format', () => {
  const id = uuidv7();
  // Format should be 8-4-4-4-12
  // UUIDv7 must have '7' at the 13th position (0-indexed 14)
  // UUIDv7 must have '8', '9', 'a', or 'b' at the 17th position (0-indexed 19)
  expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
});

test('uuidv7 monotonic generation', () => {
  const ids: string[] = [];
  for (let i = 0; i < 10000; i++) {
    ids.push(uuidv7());
  }

  // Check monotonicity
  for (let i = 1; i < ids.length; i++) {
    expect(ids[i - 1] < ids[i]).toBe(true);
  }
});
