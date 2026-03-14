# HealthGuard Runbook

## Safe Rollout Path
1. Start with a **dedicated workspace**.
2. Use a **read-only Binance API key** first.
3. Run `node tests/cli_smoke_test.js`.
4. Run `node tests/scenario_tester.js`.
5. Run `node cli/healthguard.js` with the real key and verify the scope summary shows `SAFE_FOR_OBSERVER`.
6. Verify the report clearly displays **Intelligence Coverage / Confidence**, especially if optional intelligence providers are not installed.
7. Use the agent in Observer mode for several days before considering any trading-capable key.

## Emergency Stop
If the agent behaves unexpectedly:
1. Disable or delete the Binance API key immediately.
2. Remove or rename `TOOLS.md`.
3. Stop the OpenClaw agent/workspace using this project.
4. Review recent logs before re-enabling anything.

## Rollback
1. Revert to the last known-good git commit.
2. Re-run smoke tests and CLI precheck.
3. Re-enable only read-only credentials.

## Notes
- Treat any exposed API key or token as compromised and rotate it.
- Never enable withdrawals for HealthGuard.
