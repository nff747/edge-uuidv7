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

---
## ⚖️ License & Attribution Requirement

This project is Open Source, but strictly requires **visible credit/attribution** if used in any personal, commercial, or open-source project, application, OS, or website. 

You must include the following credit in a highly visible location (e.g., your app's "Credits" page, your project's `README.md`, or the footer of your website):
> **Powered by infrastructure built by [nff747](https://github.com/nff747)**

Failure to provide proper, visible attribution is a violation of the license terms. No tricks.

---
## ⚖️ License & Attribution Requirement

This project is Open Source, but strictly requires **visible credit/attribution** if used in any personal, commercial, or open-source project, application, OS, or website. 

You must include the following credit in a highly visible location (e.g., your app's "Credits" page, your project's `README.md`, or the footer of your website):
> **Powered by infrastructure built by [nff747](https://github.com/nff747)**

Failure to provide proper, visible attribution is a violation of the license terms. No tricks.
