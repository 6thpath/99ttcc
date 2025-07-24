# Three ways to sum to n

- The given problem does not define any constraints to the argument `n` except `any integer` so
- Assuming `n` could be any value including NaN/negative/zero/infinity value.
- Assuming function must return SAFE_INTEGER value as the result.
- Assuming any unsafe-integer result (value is larger than max safe integer) should be an error instead.

## Solutions

- Math
- Loop
- Recursive

## Test

- negative input value
- zero input value
- input value is random number
- input value exceeds maximum safe value
- input value exceeds maximum safe integer

### Prerequisites

- Node.js >= 20
- [pnpm](https://pnpm.io/) package manager

### Exec

```bash
pnpm install
pnpm test
```
