# Edge UUIDv7

[![Lunar Paradox](https://img.shields.io/badge/Organization-Lunar_Paradox-0a0e1a?style=for-the-badge&logo=probot&logoColor=d7b886)](https://lunarparadox.com)

A small UUIDv7 generator using Web Crypto. Within one loaded module instance, IDs are ordered across calls, including when the system clock moves backwards. Separate processes, workers or module instances do not coordinate their sequences, so global ordering is not guaranteed. UUIDs are not access tokens or a replacement for authorization.

```ts
import { uuidv7, uuidv7Buffer, extractTimestamp } from 'edge-uuidv7';
const id = uuidv7();
const timestamp = extractTimestamp(id);
const bytes = new Uint8Array(16);
uuidv7Buffer(bytes);
```

A runtime with `crypto.getRandomValues` is required. Passing a buffer of at least 16 bytes avoids allocating the output buffer; generating a string and maintaining internal state still involve allocations. The embedded timestamp may be ahead of the wall clock after a clock rollback.

Build and test with `npm install`, `npm run build`, and `npm test`. Runtime compatibility and performance should be measured on your target devices.

[Apache License 2.0](LICENSE).

---

*A component of the [Lunar Paradox](https://lunarparadox.com) applied systems & graphics laboratory. Engineered by nff747.*
