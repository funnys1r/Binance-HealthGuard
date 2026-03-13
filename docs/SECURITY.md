# HealthGuard Production Security Standard

## 🛡️ Trusting Your Agent
In the world of AI Agents, **Safety is a Feature**. HealthGuard is designed with 15 years of institutional architecture experience in mind.

### 1. The Principle of Least Privilege (PoLP)
Never give the Agent more power than it needs:
*   **Observer Mode**: Your API Key should ONLY have `Enable Reading`. 
*   **Guardian Mode**: ONLY enable `Enable Spot Trading` after you have verified the Agent's reporting accuracy for at least 7 days.
*   **Withdrawal Protection**: HealthGuard will **NEVER** ask for, and you should **NEVER** provide, `Enable Withdrawals` permissions.

### 2. Credential Security Pattern
*   **Git Immunity**: Our `.gitignore` is hard-coded to ignore `TOOLS.md`. Your keys never leave your drive.
*   **OS Isolation**: On Linux/Mac, run: `chmod 600 TOOLS.md` to ensure only the agent's process can read it.
*   **CI/CD Safety**: No keys are used during build or deployment phases.

### 3. Human-in-the-Loop (HITL) Enforcement
Unlike "Blackbox Bots" that trade while you sleep:
*   HealthGuard **logs every diagnostic step**.
*   HealthGuard **explains its reasoning** before suggesting any trade.
*   HealthGuard **waits for the specific string "CONFIRM"** before it can unlock the `binance/spot` skill.

## ⚖️ Risk Disclosure
While HealthGuard reduces monitoring effort, the final financial decision always belongs to the human holder. Use the "Observer Mode" for one month before considering "Guardian Mode."
