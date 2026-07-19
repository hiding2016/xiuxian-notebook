/* 数据校验：data.js schema lint
 * 用法：node tools/lint.js
 * 校验：id 唯一 / 链前序可解 / realms 合法 / cond·effect 键白名单 / 选项兜底 / 秘境引用与节点结构
 */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/data.js"), "utf8"), ctx);
const D = ctx.window.GAME_DATA;

let errors = 0, warnings = 0;
const err = (m) => { errors++; console.log("  ✗ " + m); };
const warn = (m) => { warnings++; console.log("  ⚠ " + m); };

const ATTRS = D.attrs;
const TYPES = ["daily", "chance", "trib", "miracle", "flavor"];
const CATS = ["xiulian", "ziyuan", "zhandou", "renji", "xinjing", "jiyuan"];
const COND_KEYS = ["min", "max", "flag", "flag2", "notFlag", "notFlag2", "inv", "invMax", "gongfa", "gongfaMax", "artifact", "artifactMax", "combatMin"];
const EFFECT_KEYS = ["attrs", "inv", "flag", "gongfa", "artifact", "realmLoss", "danStop"];
const CHOICE_KEYS = ["text", "sub", "cond", "effect", "result", "outcomes", "go", "combat", "win", "lose", "sanbao", "death"];
const OUTCOME_KEYS = ["weight", "result", "effect", "go", "sanbao", "death"];
const EVENT_KEYS = ["id", "type", "cat", "layers", "minAge", "age", "milestone", "chain", "cooldown", "weight", "weightBy", "cond", "effect", "choices", "auction", "timing", "highlight", "text", "realms", "dungeon"];

function checkCond(cond, who) {
  if (!cond) return;
  for (const k of Object.keys(cond)) if (!COND_KEYS.includes(k)) err(who + " cond 未知键: " + k);
  if (cond.min) for (const k of Object.keys(cond.min)) if (!ATTRS.includes(k)) err(who + " cond.min 未知属性: " + k);
  if (cond.max) for (const k of Object.keys(cond.max)) if (!ATTRS.includes(k)) err(who + " cond.max 未知属性: " + k);
}
function checkEffect(effect, who) {
  if (!effect) return;
  for (const k of Object.keys(effect)) if (!EFFECT_KEYS.includes(k)) err(who + " effect 未知键: " + k);
  if (effect.attrs) for (const k of Object.keys(effect.attrs)) if (!ATTRS.includes(k)) err(who + " effect.attrs 未知属性: " + k);
}
function checkChoice(c, who, inDungeon) {
  if (!c.text) err(who + " 选项缺 text");
  for (const k of Object.keys(c)) if (!CHOICE_KEYS.includes(k)) err(who + " 选项未知键: " + k);
  checkCond(c.cond, who);
  checkEffect(c.effect, who);
  if (c.outcomes) {
    if (!Array.isArray(c.outcomes) || !c.outcomes.length) err(who + " outcomes 为空");
    c.outcomes.forEach((o, i) => {
      for (const k of Object.keys(o)) if (!OUTCOME_KEYS.includes(k)) err(who + " outcomes[" + i + "] 未知键: " + k);
      if (!o.result) err(who + " outcomes[" + i + "] 缺 result");
      checkEffect(o.effect, who + " outcomes[" + i + "]");
    });
  }
  if (c.combat) {
    if (!c.win || !c.lose) err(who + " combat 选项缺 win/lose 分支");
    ["win", "lose"].forEach((b) => {
      if (c[b]) {
        if (!c[b].result) err(who + " " + b + " 分支缺 result");
        checkEffect(c[b].effect, who + " " + b);
      }
    });
  }
  if (c.go && !["deeper", "stay", "exit"].includes(c.go)) err(who + " go 非法: " + c.go);
  if (inDungeon && !c.combat && !c.outcomes && !c.result) warn(who + " 选项无 result 文案");
}

/* ---------- 事件 ---------- */
const ids = new Set();
const chains = new Set();
const dungeonIds = new Set((D.dungeons || []).map((d) => d.id));

for (const e of D.events) {
  const who = "事件[" + (e.id || "?") + "]";
  if (!e.id) { err("有事件缺 id"); continue; }
  if (ids.has(e.id)) err(who + " id 重复");
  ids.add(e.id);
  if (e.chain) chains.add(e.chain);
  for (const k of Object.keys(e)) if (!EVENT_KEYS.includes(k)) err(who + " 未知键: " + k);
  if (e.type && !TYPES.includes(e.type)) err(who + " type 非法: " + e.type);
  if (e.cat && !CATS.includes(e.cat)) err(who + " cat 非法: " + e.cat);
  if (e.realms) {
    if (!Array.isArray(e.realms) || e.realms.some((r) => ![0, 1, 2].includes(r))) err(who + " realms 非法: " + JSON.stringify(e.realms));
  }
  if (e.layers && (e.layers[0] < 1 || e.layers[1] > 13)) err(who + " layers 越界: " + e.layers);
  checkCond(e.cond, who);
  checkEffect(e.effect, who);
  if (!e.text) err(who + " 缺 text");
  if (e.choices) {
    e.choices.forEach((c, i) => checkChoice(c, who + " 选项" + i, false));
    if (!e.choices.some((c) => !c.cond)) warn(who + " 所有选项都带 cond，可能退化为纯文本");
  }
  if (e.dungeon && !dungeonIds.has(e.dungeon)) err(who + " 引用不存在的秘境: " + e.dungeon);
  if (e.dungeon && !e.realms) warn(who + " 秘境入口缺 realms");
}

/* 链前序可解 */
for (const cid of chains) {
  const idx = cid.lastIndexOf("_");
  const num = parseInt(cid.slice(idx + 1), 10);
  if (isNaN(num)) { err("链 id 无序号: " + cid); continue; }
  if (num > 1 && !chains.has(cid.slice(0, idx + 1) + (num - 1))) err("链断裂: " + cid + " 缺前序 " + (num - 1));
}

/* ---------- 秘境 ---------- */
const nodeIds = new Set();
for (const d of D.dungeons || []) {
  const who = "秘境[" + d.id + "]";
  if (!d.name) err(who + " 缺 name");
  if (!Array.isArray(d.depths) || !d.depths.length) { err(who + " depths 为空"); continue; }
  d.depths.forEach((pool, di) => {
    if (!Array.isArray(pool) || !pool.length) { err(who + " 第" + (di + 1) + "层节点池为空"); return; }
    pool.forEach((n) => {
      const nwho = who + " 节点[" + n.id + "]";
      if (nodeIds.has(n.id)) err(nwho + " 节点 id 重复");
      nodeIds.add(n.id);
      if (!n.text) err(nwho + " 缺 text");
      if (!Array.isArray(n.choices) || !n.choices.length) { err(nwho + " 无选项"); return; }
      n.choices.forEach((c, i) => checkChoice(c, nwho + " 选项" + i, true));
      if (!n.choices.some((c) => !c.cond)) err(nwho + " 没有无 cond 的兜底选项");
      if (!n.choices.some((c) => c.go === "exit")) warn(nwho + " 没有撤离选项");
    });
  });
  /* 深处应有三宝产出（结丹材料驱动） */
  let hasSanbao = false;
  for (let di = 2; di < d.depths.length; di++) {
    for (const n of d.depths[di]) {
      const scan = JSON.stringify(n);
      if (scan.includes("sanbao")) hasSanbao = true;
    }
  }
  if (d.depths.length >= 3 && !hasSanbao) warn(who + " 第 3 层起无三宝宝箱（sanbao）");
}

/* ---------- 结局 ---------- */
for (const e of D.endings) checkCond(e.cond, "结局[" + e.title + "]");

/* ---------- 配置 ---------- */
if (!D.realms || D.realms.length !== 3) err("realms 配置缺失或长度不为 3");
if (D.realms && D.realms[1].need !== 1500) warn("筑基 need = " + (D.realms && D.realms[1].need) + "（设计 1500）");

/* ---------- 红线词扫描 ---------- */
const BANNED = ["一世", "前世", "来世", "轮回", "投胎", "享年", "重生"];
const scanText = JSON.stringify(D.events) + JSON.stringify(D.endings) + JSON.stringify(D.dungeons);
for (const w of BANNED) if (scanText.includes(w)) err("红线词出现: " + w);

/* ---------- 统计 ---------- */
const byType = {};
let realmCount = { 0: 0, 1: 0, 2: 0 };
for (const e of D.events) {
  byType[e.type || "daily"] = (byType[e.type || "daily"] || 0) + 1;
  const r = e.realms || ((e.cond && e.cond.flag === "筑基") ? [1] : [0]);
  r.forEach((x) => realmCount[x]++);
}
console.log("\n事件总数: " + D.events.length + "  类型分布: " + JSON.stringify(byType));
console.log("境界分布(含多标): 炼气 " + realmCount[0] + " / 筑基 " + realmCount[1] + " / 结丹 " + realmCount[2]);
console.log("秘境: " + (D.dungeons || []).length + " 个，节点 " + nodeIds.size + " 个");
console.log("\n" + (errors ? "✗ " + errors + " 个错误" : "✓ 无错误") + (warnings ? "，⚠ " + warnings + " 个警告" : ""));
process.exit(errors ? 1 : 0);
