# x402-facilitator

An [x402](https://x402.org) facilitator for Solana `exact` payments (mainnet USDC).

It is the official `@x402/svm` 2.31.0 facilitator with one exception. Phantom adds Lighthouse assertion instructions (first data byte 2–17) to the transactions it signs. One of them reads the fee payer's account, to check that the fee payer keeps its SOL. The official verifier refuses any Lighthouse instruction that references the fee payer (`fee_payer_transferring_funds`). Assertions only read accounts and cannot move funds, so this facilitator accepts an assertion that references the fee payer. Every other check is the official code, unchanged:

- signatures
- exactly one `TransferChecked` to `payTo`'s token account for the exact amount
- the fee payer pays nothing but the network fee
- compute limits
- memo
- simulation of the whole transaction
- settlement

`@x402/svm` is pinned to 2.31.0 because the exception wraps an internal step of its verifier. The tests fail if a new version changes that step.

## Endpoints

| Method | Path | Body |
| - | - | - |
| GET | `/supported` | — |
| POST | `/verify` | `{ x402Version, paymentPayload, paymentRequirements }` |
| POST | `/settle` | `{ x402Version, paymentPayload, paymentRequirements }` |

## Settings (environment variables)

| Name | Meaning |
| - | - |
| `SOLANA_FACILITATOR_KEY` | The fee payer's secret key (base58, or a JSON array of 64 bytes). Keep a small SOL balance in this wallet. |
| `FACILITATOR_PAY_TO` | Comma-separated `payTo` addresses this facilitator serves. Requirements for other addresses are refused. |
| `FACILITATOR_DAILY_MAX` | Settlements per day that may cost the fee payer SOL (default 200). Settles refused before sending are not counted. |
| `SOLANA_RPC_URL` | Optional RPC endpoint (default: public mainnet RPC). |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | Upstash Redis, for the daily count (`UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` also work). |

## Development

```bash
npm install
npm test
npm run build
```
