# Token Unlocks Risk Analysis Skill

This skill integrates with external data sources (like Tokenomist.ai or similar) to track upcoming token unlock events for project investors and teams. It identifies potential supply inflation risks.

## Logic Implementation

This skill functions as a **Market Signal Provider**. It queries scheduled unlock dates and amounts for specific symbols in the user's portfolio.

### Key Metrics
- **Unlock Amount**: Total tokens being released.
- **% of Circulating Supply**: The impact of the unlock on current liquidity.
- **Unlock Date**: Countdown to the potential "dump" event.

## Report Template
- [SYMBOL] Unlock Event: [DATE]
- Amount: [AMOUNT] ([PERCENTAGE]% of supply)
- Risk Level: [LOW/MEDIUM/HIGH]

## Security
No API Key required for public data lookups.
