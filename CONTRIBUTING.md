# 参与贡献

最受欢迎的贡献是**新事件/新剧情**——游戏内容与引擎完全分离，写事件只需要改 `assets/data.js` 一个文件，不需要碰任何引擎代码。

## 快速上手

1. 在 `assets/data.js` 的事件数组里照 Schema 加一条事件
2. 运行 `node tools/lint.js` 校验（必须 0 错误）
3. 浏览器打开 `index.html` 实际玩一遍，确认事件能触发
4. 提 PR

## 事件 Schema

```js
{
  id: "zb_xxx",            // 唯一 id；约定：炼气无前缀、筑基 zb_、结丹 jd_、秘境入口 mj_<id>_in、秘境传闻 mjw_<id>
  type: "daily|chance|trib|miracle|flavor",  // 年份槽位：常规/机遇/劫难/奇遇/留白
  cat: "xiulian|ziyuan|zhandou|renji|xinjing|jiyuan",
  realms: [1],             // 0炼气 1筑基 2结丹；通用留白可 [0,1,2]（炼气期老事件用 layers: [最低层, 最高层]）
  minAge: 数字,            // 经历年数下限（显示年龄 = 经历年数 + 12）
  cooldown: 数字,          // 触发后 N 年不再出现；可复用事件建议 4-8
  chain: "链id_序号",       // 剧情链：需前序已触发
  weight: 1,               // 权重（路线事件引擎自动 ×2.5）
  cond: {                  // 触发条件，全部可组合
    min: {}, max: {}, flag: "", flag2: "", notFlag: "", notFlag2: "",
    inv: { "灵石": 60 },        // 至少持有
    invMax: { "灵石": 30 },     // 至多持有（"缺钱触发商人"用）
    gongfa: 1, artifact: { "法器": 1 },
    combatMin: 120             // 战力门槛
  },
  effect: {                // 固定结果
    attrs: {}, inv: {}, flag: "", gongfa: 1,
    artifact: { "法器": 1 }     // 自动从名字池取具名法宝入背包
  },
  choices: [{              // 抉择弹窗
    text, sub, cond, effect, result,
    outcomes: [{ weight, result, effect }]   // 加权随机结果（替代固定 result）
  }],
  auction: { item, base, winText, loseText, effect },  // 拍卖玩法
  timing: { action, perfect: {result,effect}, good: {}, fail: {} },  // 火候玩法
  dungeon: "mj_xxx",       // 秘境入口事件：进入对应秘境
  highlight: true          // 关键节点：记入结局名场面
}
```

秘境（dungeon）结构见 `data.js` 中 `dungeons` 数组：按 `depths` 分层，节点支持 `choices` / `battle`（win/lose 分支）/ `sanbao: true`（发结丹三宝）/ `go: "exit"`。

## 文案规范（重要，PR 会按此评审）

完整版见 [tools/文案规范.md](tools/文案规范.md)，要点：

- **凡人流语感**：资源算计、境界压迫、人情冷暖；短句为主，写"事"不写"情"
- **禁词**：一世、前世、来世、轮回、投胎、享年、重生；死亡只写「坐化/兵解/道消」
- **禁 AI 腔/网络烂梗**：「贵但值」「破防了」「YYDS」这类直接拒
- **抉择用 outcomes 加权随机**，不许"固定哪个好"的明牌选项；每个 choice 事件至少留一个无 cond 的兜底选项
- 大额扣灵石的选项必须 `cond.inv` 门控；成熟内容必须带 `minAge`
- 结丹三宝（玄冰魄/炎髓晶/雷灵枝）**只许秘境产出**，普通事件不许发

## 数值平衡

改数值前建议先跑 `node tools/sim.js` 做数值模拟，避免把节奏调崩。经济档位参考文案规范末尾。

## 代码贡献

引擎代码（`assets/core.js / loop.js / ui.js / pop.js`）也欢迎 PR，原则：**引擎零硬编码事件**，新机制请做成数据驱动。
