# Binance Skills Hub 🏆 [HealthGuard Edition]

<div align="center">
  <h3>Binance HealthGuard: The 24/7 Intelligent Crypto Wealth Guardian</h3>
  <p>An awarding-winning entry for the Binance AI Agent Hackathon combining OpenClaw, Tokenomics, and MCP Services.</p>

  [English](#english) | [中文说明](#chinese)
</div>

---

<a name="english"></a>
## 🛡️ Binance HealthGuard (English)

HealthGuard represents a paradigm shift from traditional "passive trading bots" to a **proactive, all-weather asset health monitoring system**. It deeply integrates with Binance APIs, economic fundamentals (Tokenomist), technical indicators (RSI/MA), and global market sentiment (6551 OpenNews & OpenTwitter MCP) to safeguard your portfolio against black swan events.

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

3. Watch as the Agent autonomously assesses your environment, and generates a comprehensive, color-coded risk report!

### 🔥 Usage Scenarios & Commands

| Scenario | What to say to the Agent |
|----------|--------------------------|
| **Instant Check** | "Analyze my current portfolio health right now." |
| **Scheduled Monitoring** | "Check my asset health every 30 minutes and alert me if RSI > 70." |
| **Specific Focus** | "Look into $ARB news and unlocks. Is it safe to keep holding?" |
| **Emergency Action** | "I agree with the proposal. Redeem my $BNB and sell for USDT." |

### 📖 Workflow Walkthrough

1. **User**: "Hey Claw, start HealthGuard."
2. **Claw**: "Master, I'm ready, but you need OpenNews/OpenTwitter MCP. Run `npx skills add...` or shall I do it for you?"
3. **User**: "You do it." (Claw installs dependencies).
4. **Claw**: "Done! Now, I see your **32.5 ETH** in Simple Earn. ETH RSI is 72 (Overbought) and there's a macro news about SEC. I suggest moving to USDT. Confirm?"
5. **User**: "Confirm." (Claw executes the swap).

### 📊 Sample Diagnostic Report

Here is what a typical HealthGuard report looks like when a risk is detected:

> **[HealthGuard Report #20241024-01]**
> 
> 🟢 **Asset Snapshot**: Detected **12.5 ETH** (Spot) + **50,000 ARB** (Locked Earn).
> 🔴 **Economic Risk (CRITICAL)**: $ARB has a **5% supply unlock** ($120M value) in 18 hours.
> 🟡 **Social Sentiment (WARNING)**: X/News sentiment for $ARB is dropping (-15%). Breaking news regarding founder whale sales detected via OpenNews.
> 🟢 **Technical Status**: $ETH RSI is at 52 (Neutral). $ARB RSI is at 68 (Near Overbought).
> 
> 🛡️ **Risk Mitigation Proposal**: 
> "Master, I recommend **redeeming your ARB from Locked Earn** immediately and converting **50% of your ARB to USDT** to avoid the upcoming unlock dump. Shall I proceed? (Reply 'CONFIRM' to execute)"

---

### 🗺️ Future Roadmap

1.  **Autonomous Multi-Agent Collaborative System (MACS)**: Integrating with specialized hedging agents to execute automated delta-neutral strategies when critical risks are detected.
2.  **Transformer-based Neural Sentiment Engine**: Implementing custom LLM fine-tuning to better decode "Crypto-Slang" and identifying sophisticated FUD/FOMO signals beyond basic API keyword scanning.
3.  **Institutional-Grade Risk Scoring (IGRS)**: Developing a proprietary health-scoring algorithm derived from real-time on-chain flows and whale movement history.
4.  **ZK-Privacy Portfolio Audit**: Leveraging Zero-Knowledge Proofs to allow users to verify their health status and risk scores with third parties without disclosing their actual balance.

---
---

<a name="chinese"></a>
## 🛡️ Binance HealthGuard (中文说明)

HealthGuard (神盾龙虾) 让加密 AI 助手从传统的“被动响应器”进化为**7×24小时全天候主动监控的智能财产私人医生**。通过深度融合币安官方原生 API、宏观经济学解锁数据、K线技术指标分析以及 6551 团队的推特/新闻 MCP 扩展，它能在黑天鹅事件爆发前，为您提供专业级的防守闭产。

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
3. 见证奇迹：如果您的环境尚缺组件，龙虾会主动引导；若一切就绪，它将为您呈现一份极具冲击力的**结构化风控报告**！

### 🔥 多场景交互指令示例

| 使用场景 | 您可以对龙虾说 |
|----------|----------------|
| **即时全仓体检** | “现在立刻分析一下我账户里的资产健康状况。” |
| **高频自动巡检** | “帮我每隔 30 分钟检查一次持仓健康，如果 RSI > 70 记得提醒我。” |
| **针对性爆料** | “去帮我查查 $ARB 最近的新闻和代币解锁，现在持有它安全吗？” |
| **紧急避险执行** | “我明白风险了，同意并执行刚才的清仓建议。” |

### 📖 完整工作流演示 (故事线)

1. **用户**：“小龙虾，启动 HealthGuard。”
2. **龙虾**：“主人，诊断程序已就位，但检测到缺少 6551 新闻插件。建议执行 `npx skills add...`，需要我帮您处理吗？”
3. **用户**：“由你处理。”（龙虾自动执行安装与环境自愈）。
4. **龙虾**：“安装完毕！目前监测到您理财账户持有 **32.5 ETH**。技术面 RSI 为 72（超买），且 OpenNews 抓取到 10 分钟前 SEC 的宏观利空。建议清仓避险。是否执行？”
5. **用户**：“执行。”（龙虾调用 `spot` 技能秒速完成换手）。

### 📊 真机演示报告示例

当侦测到风险时，龙虾会为您输出如下专业报告：

> **[HealthGuard 持仓巡检报告 #20241024-01]**
> 
> 🟢 **资产透视**：检测到您持有 **12.5 ETH** (现货) + **50,000 ARB** (定期理财)。
> 🔴 **经济预警 (极高风险)**：$ARB 在 18 小时后将迎来 **5% 的总量解锁**（约 1.2 亿美元抛压）。
> 🟡 **社交情绪 (预警)**：X/推特 情绪指数骤降 (-15%)。OpenNews 监测到关联基金会大额充值交易所的新闻。
> 🟢 **技术指标**：$ETH RSI 为 52 (中性)。$ARB RSI 为 68 (接近超买区)。
> 
> 🛡️ **医生处方 (量化建议)**：
> “由于 $ARB 即将迎来天量解锁抛压且社交面转空，我建议您**立即从定期理财中赎回 ARB**，并将其中 **50% 兑换为 USDT** 避险。是否同意执行？(回复 'CONFIRM' 即可一键操作)”

---

### 🗺️ 未来发展路径 (Roadmap)

1.  **多智能体协作系统 (MACS)**：引入专门负责对冲的 AI 节点。当 HealthGuard 侦测到致命风险时，自动触发跨智能体协作，执行 Delta 中性套保策略。
2.  **深度学习语义情绪引擎**：针对加密圈特定黑话 (Crypto-Slang) 进行模型微调。从单纯的关键词匹配进化为深度语义解析，捕获隐藏在复杂推文下的顶级 FUD/FOMO 信号。
3.  **机构级动态风险评级 (IGRS)**：基于实时链上大额异动 (Whale Tracking) 和历史抛压模型，建立独家的持仓健康评分算法，为散户提供机构级的预警体验。
4.  **基于 ZK 的隐私资产审计**：利用零知识证明技术，允许用户在不泄露具体持仓金额的前提下，向第三方证明其资产健康度或信用风险评分。

---

---
*Built with ❤️ for the Web3 OpenClaw AI community.*