# Binance Skills Hub 🏆 [HealthGuard Edition]

<div align="center">
  <h3>Binance HealthGuard: The 24/7 Intelligent Crypto Wealth Guardian</h3>
  <p>An awarding-winning entry for the Binance AI Agent Hackathon combining OpenClaw, Tokenomics, and MCP Services.</p>

  [English](#english) | [中文说明](#chinese)
</div>

---

<a name="english"></a>
## 🛡️ Binance HealthGuard (English)

HealthGuard represents a paradigm shift from traditional "passive trading bots" to a **proactive, all-weather asset health monitoring system**. It deeply integrates with Binance APIs, economic fundamentals (Tokenomist), and global market sentiment (6551 OpenNews & OpenTwitter MCP) to safeguard your portfolio against black swan events.

### 📦 Modular Dependencies

This project is built upon the following official Binance Skills:
- **`skills/binance/assets`**: For fetching core spot account balances.
- **`skills/binance/alpha`**: For real-time market price monitoring.
- **`skills/binance/spot`**: For executing risk-mitigation trades.

### ✨ Exclusive Innovations in this Fork

This repository enriches the official `binance-skills-hub` with **three groundbreaking, custom-built skills**:

1. **`healthguard` (The Core Brain)**: Introduces a dynamic, user-defined high-frequency health check routine (e.g., every 30 mins). It boasts a true "Agent-First" architecture that autonomously detects missing MCP dependencies and guides the user through the `npx skills add` installation process via natural language dialogue.
2. **`simple-earn` (The Asset X-Ray)**: Fills a critical gap in the official APIs. It allows the agent to monitor otherwise invisible "sleeping assets" locked in Flexible/Locked Earn products, computing the user's *true* portfolio weight.
3. **`token-unlocks` (The Inflation Radar)**: Integrates external economic data to monitor massive upcoming token unlocks (e.g., >2% of supply unlocking within 7 days), proactively warning the user of potential supply dumps.

### 🚀 Getting Started

1. **Authentication Setup**: Ensure your `TOOLS.md` file in the root directory contains your Binance API credentials and 6551 API Token as specified in `skills/healthguard/SKILL.md`.
2. Set up this repository as your OpenClaw workspace.
---

<a name="chinese"></a>
## 🛡️ Binance HealthGuard (中文说明)

HealthGuard (神盾龙虾) 让加密 AI 助手从传统的“被动响应器”进化为**7×24小时全天候主动监控的智能财产私人医生**。通过深度融合币安官方原生 API、宏观经济学解锁数据以及 6551 团队的推特/新闻 MCP 扩展，它能在黑天鹅事件爆发前，为您提供专业级的防守闭产。

### 📦 核心依赖模块

本系统深度调用了以下币安官方原生技能：
- **`skills/binance/assets`**：用于获取现货账户基础余额。
- **`skills/binance/alpha`**：用于获取实时行情与价格变动。
- **`skills/binance/spot`**：用于执行清仓避险等交易指令。

### ✨ 本仓库的独家高能扩展

在官方原版 `binance-skills-hub` 的基础上，我们原创开发了 **三大杀手级 Skill**：

1. **`healthguard` (调度核心与诊脉器)**：实现动态高频巡查工作流。具备极客级别的**“环境自愈能力”**——在启动时自动检测 6551 MCP 等依赖环境，如发现缺失，将主动用自然语言对话引导用户完成 `npx skills add` 按需加载，彻底消灭“人工查阅说明书”的糟糕体验。
2. **`simple-earn` (理财资产透视镜)**：填补了原本只能查现货的盲区。赋予龙虾穿透查询“活期/定期理财”中沉睡资金的能力，准确掌握用户的真实重仓标的。
3. **`token-unlocks` (通胀砸盘预警机)**：对接第三方经济学 API，一旦侦测到重仓币未来 7 天有极其庞大的代币解锁，系统将立即发出抛售预警。

### 🚀 如何体验神盾龙虾？

1. 下载本仓库并作为 OpenClaw 工作空间挂载。
2. 对你的小龙虾发出破冰指令：
   > **“龙虾，请启动 HealthGuard，帮我每 30 分钟做一次持仓健康体检。”**
3. 见证奇迹：如果您的环境尚缺组件，龙虾会主动把安装命令打在屏幕上指导您完成；若一切就绪，它将瞬间穿透您的现货与理财账户，抓取全网最新大V情绪与突发新闻，最后以红黄绿三色为您呈现一份极具冲击力的**结构化风控诊断报告**！并在危机时抛出“同意即自动清仓+赎回”的防御执行选项。

---
*Built with ❤️ for the Web3 OpenClaw AI community.*