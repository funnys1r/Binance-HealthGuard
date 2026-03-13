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
*   **Real Scope Verification**: Run `node cli/healthguard.js` before use. The preflight now performs a live Binance API key scope audit and prints a structured summary instead of relying on local text hints alone.

### 3. Human-in-the-Loop (HITL) Enforcement
Unlike "Blackbox Bots" that trade while you sleep:
*   HealthGuard **logs every diagnostic step**.
*   HealthGuard **explains its reasoning** before suggesting any trade.
*   HealthGuard **waits for the specific string "CONFIRM"** before it can unlock the `binance/spot` skill.

### 4. Deployment Isolation (Separation of Concerns)

> [!TIP]
> **Best Practice**: Deploy HealthGuard in an isolated directory specifically reserved for financial logic.

- **Dedicated Directory**: Keeping HealthGuard in its own workspace (e.g., `~/.openclaw/workspace-healthguard`) is highly recommended.
- **Credential Scoping**: Ensures `TOOLS.md` only contains financial secrets, minimizing the "blast radius" in case of a general system misconfiguration.
- **Safety Boundary**: Prevents non-financial agents (like general assistants) from accidentally accessing trade execution functions.

## ⚖️ Risk Disclosure
While HealthGuard reduces monitoring effort, the final financial decision always belongs to the human holder. Use the "Observer Mode" for one month before considering "Guardian Mode."
