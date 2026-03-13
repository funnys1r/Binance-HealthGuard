---
name: token-unlocks
description: Fetch token unlock schedule and emission data using free public APIs. No authentication required.
metadata:
  version: 1.0.0
  author: High-Quality-Dev-Expert
license: MIT
---

# Token Unlocks Skill

Fetches upcoming token unlocking events to provide risk analysis for portfolio holdings. This skill interacts with an external public API to check if a specific token has a major unlock event scheduled, which could cause a price drop.

## Quick Reference

| Endpoint | Description | Required | Optional | Authentication |
|----------|-------------|----------|----------|----------------|
| `https://api.tokenomist.ai/v1/unlocks` (GET) | Get token unlock schedule | symbol | startTime, endTime | No |

---

## Parameters

### Common Parameters

* **symbol**: The ticker symbol of the token (e.g., ARB, APT, OP). Ensure to strip 'USDT' or other pairs if checking from Binance holdings.
* **startTime**: Start date for checking unlocks (UNIX timestamp or YYYY-MM-DD).
* **endTime**: End date for checking unlocks (UNIX timestamp or YYYY-MM-DD).

## Authentication

This specific public endpoint does not require authentication for basic unlock scheduling.
Do not send Binance API Keys or Secret Keys to this endpoint.

## Agent Behavior

1. **Asset Filtering**: When the Agent scans the user's holdings (via Binance Asset/Spot APIs), it must filter out assets with a value of less than $10 USD equivalent to avoid wasting API calls on "dust". 
2. **Dust Ignorance**: Ignore small balances (e.g., 0.0001 BTC or 5 USDT) when analyzing risk.
3. **Symbol Parsing**: Before querying this API, clean the symbol from `ARBUSDT` to `ARB`.
4. **Trigger Threshold**: If the unlock amount exceeds 2% of the total supply or circulating supply within the next 7 days, generate an alert.
5. **Action Proposal**: Recommend selling the spot position prior to the unlock, and propose setting a limit buy order 5-10% below current market price for post-unlock recovery.
