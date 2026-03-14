# HealthGuard 最终展示模板（中文版）

## 1. 报告头
- 报告编号
- 时间戳
- 模式：Observer / Guardian
- 组合健康分：0-100
- 风险等级：SAFE / WATCH / WARNING / CRITICAL

### 风险等级统一枚举
- **SAFE**：90-100 分，整体稳健，无急性风险
- **WATCH**：75-89 分，整体可控，但存在值得关注的局部风险
- **WARNING**：50-74 分，存在中高优先级风险，需要用户关注或调整
- **CRITICAL**：0-49 分，存在显著风险，建议立刻处理

## 2. 组合级摘要（Portfolio Summary）
建议固定输出：
- 总资产（USDT 估值）
- 稳定币占比
- 已分析的主要持仓数量（>=10 USDT）
- 被压缩的小额持仓数量（<10 USDT）
- 账户级结论（一句话）
- 组合健康分对应的风险等级解释

## 3. 情报覆盖度（Intelligence Coverage）
固定输出：
- Binance Assets / Earn：OK / unavailable
- Binance Official Status：OK / unavailable
- Token Unlocks：OK / unavailable
- OpenNews：OK / unavailable
- OpenTwitter：OK / unavailable
- Crypto Market Rank：OK / unavailable
- Trading Signal：OK / unavailable
- Confidence：High / Medium / Low

### 置信度建议
- **High**：核心数据 + 增强情报都可用
- **Medium**：核心数据可用，但部分增强情报缺失
- **Low**：仅能完成有限的基础巡检，建议用户补齐依赖

## 4. 主要持仓（Major Holdings，>=10 USDT）
每个资产建议固定展示以下字段：
- 资产名 / 估值
- 风险等级
- Binance 官方状态
- 解锁风险
- 新闻 / 社交情绪
- 技术面
- 市场优先级（crypto-market-rank，如可用）
- 交易信号摘要（trading-signal，如可用）
- 一句话结论

> 主要持仓必须完整展开，不能只在摘要里一笔带过。

## 5. 小额持仓（Minor Holdings，<10 USDT）
统一压缩展示：
- 资产名 + 估值
- 默认不展开深度分析
- 只有用户明确点名时再展开

> 小额持仓的目标是**降噪**，而不是完全隐藏。

## 6. 组合级综合结论（Combined Verdict）
建议固定回答两个问题：
1. **为什么风险高 / 低？**
2. **为什么整个账户仍然安全 / 不安全？**

## 7. 行动建议（Defensive Proposal）
建议分级输出：
- SAFE：继续观察，无需动作
- WATCH：继续监控，关注重点持仓
- WARNING：建议减仓 / 调整结构 / 提高稳定币占比
- CRITICAL：建议尽快执行防御动作

> 只有真正的执行动作（赎回 / 卖出 / 换仓 / 下单）才要求用户回复 `CONFIRM`。

## 8. 展示原则
- 先给结论，再给原因
- 组合级信息优先于单币级碎片信息
- 小额持仓降噪处理
- 缺失依赖时不报废，只降级，并明确说明覆盖范围与置信度
