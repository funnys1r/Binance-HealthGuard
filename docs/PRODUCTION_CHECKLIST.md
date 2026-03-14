# HealthGuard Production Readiness Checklist

Before transitioning from **Observer Mode** to **Guardian Mode** with real assets, ensure you have completed this 7-step institutional-grade checklist.

## ✅ Phase 1: Security & Credential Isolation
- [ ] **Minimum Permissions**: Ensure your Binance API Key has `Enable Reading` only. If you need auto-trades, create a separate Key and never enable `Withdrawals`.
- [ ] **OS-Level Protection**: Run `chmod 600 TOOLS.md` on Unix systems to restrict file access.
- [ ] **Network Isolation**: Recommended to run HealthGuard inside a dedicated Docker container or an isolated VPC.
- [ ] **IP Whitelisting**: Configure your Binance API Key to only accept requests from your static server IP.

## ✅ Phase 2: AI Logic Validation
- [ ] **CLI Smoke Tests Pass**: Run `node tests/cli_smoke_test.js` and verify the guardrails fail closed for missing config and withdrawal markers.
- [ ] **Mock Test Pass**: Run `node tests/scenario_tester.js` and verify you understand the Agent's decision logic.
- [ ] **Live Scope Audit Pass**: Run `node cli/healthguard.js` and confirm the API key scope summary matches your intended mode (`SAFE_FOR_OBSERVER` for read-only setups).
- [ ] **Automatic Deep Analysis Policy Confirmed**: Verify that assets worth **10 USDT or more** are analyzed automatically across unlocks, exchange status, and technicals, and that news/Twitter enrichment is added automatically when optional intelligence providers are available.
- [ ] **Degraded Mode Confirmed**: Verify that if `opennews` or `opentwitter` is missing, HealthGuard still produces a useful core-mode report with an explicit Intelligence Coverage / Confidence section.
- [ ] **Review Report Format**: Read `docs/REPORT_SAMPLE.md` to know what an alert looks like.
- [ ] **Human-in-the-Loop Drill**: Practice the `CONFIRM` command only for real execution actions, not for ordinary analysis steps.

## ✅ Phase 3: Operational Maintenance
- [ ] **Log Rotation**: Ensure your OpenClaw logs are persistent but rotated to avoid disk overflow.
- [ ] **API Key Rotation**: Schedule a reminder to rotate your API credentials every 30-90 days.
- [ ] **Emergency Stop**: Have the Binance Mobile App ready to manually cancel orders or disable API keys if you see unexpected behavior from the AI.

---
> [!CAUTION]
> **Market Risk Disclaimer**: AI can hallucinate. Decisions provided by HealthGuard are based on data correlation, not "Future Sight." Always verify critical suggestions.
