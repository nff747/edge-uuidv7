# Edge UUIDv7

A zero-allocation, time-ordered UUIDv7 generator optimized for Edge environments (Cloudflare Workers, Vercel Edge).

## Usage

```typescript
import { uuidv7, uuidv7Buffer } from 'edge-uuidv7';

// Generate string
const id = uuidv7();

// Zero-allocation buffer usage
const buf = new Uint8Array(16);
uuidv7Buffer(buf);
```
