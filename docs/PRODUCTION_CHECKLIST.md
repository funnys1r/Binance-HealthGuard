# HealthGuard Production Readiness Checklist

Before transitioning from **Observer Mode** to **Guardian Mode** with real assets, ensure you have completed this 7-step institutional-grade checklist.

## ✅ Phase 1: Security & Credential Isolation
- [ ] **Minimum Permissions**: Ensure your Binance API Key has `Enable Reading` only. If you need auto-trades, create a separate Key and never enable `Withdrawals`.
- [ ] **OS-Level Protection**: Run `chmod 600 TOOLS.md` on Unix systems to restrict file access.
- [ ] **Network Isolation**: Recommended to run HealthGuard inside a dedicated Docker container or an isolated VPC.
- [ ] **IP Whitelisting**: Configure your Binance API Key to only accept requests from your static server IP.

## ✅ Phase 2: AI Logic Validation
- [ ] **Mock Test Pass**: Run `node tests/scenario_tester.js` and verify you understand the Agent's decision logic.
- [ ] **Review Report Format**: Read `docs/REPORT_SAMPLE.md` to know what an alert looks like.
- [ ] **Human-in-the-Loop Drill**: Practice the `CONFIRM` command in a test environment to ensure you are comfortable with the confirmation flow.

## ✅ Phase 3: Operational Maintenance
- [ ] **Log Rotation**: Ensure your OpenClaw logs are persistent but rotated to avoid disk overflow.
- [ ] **API Key Rotation**: Schedule a reminder to rotate your API credentials every 30-90 days.
- [ ] **Emergency Stop**: Have the Binance Mobile App ready to manually cancel orders or disable API keys if you see unexpected behavior from the AI.

---
> [!CAUTION]
> **Market Risk Disclaimer**: AI can hallucinate. Decisions provided by HealthGuard are based on data correlation, not "Future Sight." Always verify critical suggestions.
