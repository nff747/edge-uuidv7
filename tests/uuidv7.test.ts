import { expect, test, vi } from 'vitest';
import { uuidv7, uuidv7Buffer, extractTimestamp } from '../src/index';

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

test('preserves ordering and logical time when the system clock moves backward', () => {
  const now = Date.now() + 10000;
  const clock = vi.spyOn(Date, 'now').mockReturnValue(now);
  try {
    const first = uuidv7();
    clock.mockReturnValue(now - 5000);
    const second = uuidv7();
    expect(second > first).toBe(true);
    expect(extractTimestamp(second)).toBe(now);
  } finally { clock.mockRestore(); }
});

test('rejects invalid buffers and timestamp strings', () => {
  expect(() => uuidv7Buffer(new Uint8Array(15))).toThrow(RangeError);
  expect(() => extractTimestamp('zzzzzzzz-zzzz-7zzz-8zzz-zzzzzzzzzzzz')).toThrow();
});
