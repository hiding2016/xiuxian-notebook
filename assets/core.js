/* 修仙记事本 · core.js —— 纯逻辑层（无 UI）
 * 常量/工具/存档/法宝战力/事件调度/效果应用。
 * 加载顺序：data.js → core.js → ui.js → pop.js → loop.js（经典脚本，共享顶层声明）
 */

var D = window.GAME_DATA;
var ATTRS = D.attrs;
var TOTAL = D.totalPoints;
var STEP = 10;
var GONGFA_NAMES = ["黄阶", "玄阶", "地阶", "天阶"];
var ART_POOL = {
  "法器": ["青钢剑", "流云剑", "玄铁刀", "破煞枪", "寒铁鞭", "紫电锤", "踏云靴", "青冥伞", "赤焰环", "玄冰绫"],
  "灵器": ["玄龟盾", "雷光镜", "摄魂铃", "流萤扇", "锁妖链", "照骨镜", "紫霄剑", "玄武印", "寒鸦笛", "定风珠"],
  "法宝": ["镇山印", "混元珠", "太虚镜", "阴阳扇", "玄武钟", "星河图", "紫府铃", "落日弓", "玄黄塔", "照妖镜"]
};
var ART_POWER = { "法器": 10, "灵器": 25, "法宝": 50 };
var BP_CAP = 12;   // 背包格子上限
var MAT_NAMES = ["灵髓", "地火莲", "天雷竹"];  // 地道筑基材料
var MAT2_NAMES = D.mats2 || ["玄冰魄", "炎髓晶", "雷灵枝"];  // 结丹三宝（秘境深处产出）
var PILL_SLOTS = D.pills || ["聚气丹", "筑基丹", "符咒", "凝元丹", "结金丹"];
var BREAK_PILL = "筑基丹";
var STORY_BASE = 12;              // 入门时 12 岁，显示年龄 = 经历年数 + 12
var QI_AGE_LIMIT = 48;            // 炼气期大限：48 经历年 = 60 岁

/* ---------- 存档 ---------- */
var SAVE_KEY = "xiuxian_save_v1";
var LAST_KEY = "xiuxian_last_v1";

function saveGame() {
  if (!S || !S.alive) return;
  try {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify({
      v: 1, age: S.age, cult: S.cult, realmIdx: S.realmIdx, lifespan: S.lifespan,
      attrs: S.attrs, flags: S.flags, inv: S.inv, gongfa: S.gongfa, artifacts: S.artifacts,
      used: Object.keys(S.used), cooldowns: S.cooldowns, chains: S.chains,
      lastChoiceAge: S.lastChoiceAge, winAt: S.winAt || 0, highlights: S.highlights,
      talentId: talent ? talent.id : null,
      danUsed: S.danUsed || 0, danStopUntil: S.danStopUntil || 0, dgCd: S.dgCd || {},
      logs: S.logs || []
    }));
  } catch (e) { /* 存储不可用则跳过 */ }
}

function loadSave() {
  try {
    var raw = window.localStorage.getItem(SAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}
function clearSave() {
  try { window.localStorage.removeItem(SAVE_KEY); } catch (e) { /* ignore */ }
}

/* ---------- 状态 ---------- */
var S = null;
var alloc = {};
var talent = null;
var rollsLeft = 3;

/* ---------- DOM ---------- */
function $(id) { return document.getElementById(id); }
var views = { start: $("view-start"), life: $("view-life"), end: $("view-end") };
function show(name) {
  for (var k in views) views[k].classList.toggle("active", k === name);
}

/* ---------- 工具 ---------- */
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function clampAttr(v) { return Math.max(0, Math.min(D.maxAttr + 20, v)); }
function clampInv(v) { return Math.max(0, v); }
/* 大数值展示：过万用「万」，过亿用「亿」，手机上不甩长串数字 */
function fmtNum(n) {
  n = Math.floor(n || 0);
  if (n >= 100000000) return (n / 100000000).toFixed(1).replace(/\.0$/, "") + "亿";
  if (n >= 10000) return (n / 10000).toFixed(1).replace(/\.0$/, "") + "万";
  return "" + n;
}

/* ---------- 法宝与战力 ---------- */
function artifactCount(grade) {
  var n = 0;
  S.artifacts.forEach(function (a) { if (a.grade === grade) n++; });
  return n;
}

function bpSlotsUsed() {
  var n = S.artifacts.length;
  PILL_SLOTS.forEach(function (k) {
    if ((S.inv[k] || 0) > 0) n++;
  });
  return n;
}

function grantArtifact(grade) {
  if (bpSlotsUsed() >= BP_CAP) {
    (S._lastArts = S._lastArts || []);
    log("背包已满，一件「" + grade + "」与你失之交臂。", "choice-result");
    return;
  }
  var pool = ART_POOL[grade];
  var name = null;
  for (var i = 0; i < pool.length; i++) {
    var taken = false;
    S.artifacts.forEach(function (a) { if (a.name === pool[i]) taken = true; });
    if (!taken) { name = pool[i]; break; }
  }
  if (!name) name = grade + "·" + pool[0];
  S.artifacts.push({ name: name, grade: grade, power: ART_POWER[grade] });
  (S._lastArts = S._lastArts || []).push(name);
}

function computeCombat() {
  var p = S.attrs["根骨"] + Math.floor(S.attrs["灵根"] / 2) + Math.floor(S.attrs["神识"] / 2) + S.gongfa * 15;
  S.artifacts.forEach(function (a) { p += a.power; });
  p += (S.inv["符咒"] || 0) * 3;
  return Math.round(p);
}

function condOk(cond, attrs, flags, inv) {
  if (!cond) return true;
  var k;
  if (cond.min) for (k in cond.min) if ((attrs[k] || 0) < cond.min[k]) return false;
  if (cond.max) for (k in cond.max) if ((attrs[k] || 0) > cond.max[k]) return false;
  if (cond.flag && !flags[cond.flag]) return false;
  if (cond.flag2 && !flags[cond.flag2]) return false;
  if (cond.notFlag && flags[cond.notFlag]) return false;
  if (cond.notFlag2 && flags[cond.notFlag2]) return false;
  if (cond.inv) for (k in cond.inv) if ((inv[k] || 0) < cond.inv[k]) return false;
  if (cond.invMax) for (k in cond.invMax) if ((inv[k] || 0) > cond.invMax[k]) return false;
  if (S) {
    if (cond.gongfa !== undefined && S.gongfa < cond.gongfa) return false;
    if (cond.gongfaMax !== undefined && S.gongfa > cond.gongfaMax) return false;
    if (cond.artifact) for (k in cond.artifact) if (artifactCount(k) < cond.artifact[k]) return false;
    if (cond.artifactMax) for (k in cond.artifactMax) if (artifactCount(k) > cond.artifactMax[k]) return false;
    if (cond.combatMin !== undefined && computeCombat() < cond.combatMin) return false;
  }
  return true;
}

/* ---------- 炼气层数 ---------- */
function layerInfo() {
  var need = D.layerNeed, cum = 0, l = 1;
  while (l < 13 && S.cult >= cum + need[l]) { cum += need[l]; l++; }
  return { layer: l, cur: S.cult - cum, need: need[l] };
}
function currentLayer() { return S.realmIdx > 0 ? 14 : layerInfo().layer; }

/* ---------- 效果应用 ---------- */
function applyEffect(effect) {
  if (!effect) return;
  var k;
  if (effect.attrs) for (k in effect.attrs) {
    S.attrs[k] = clampAttr((S.attrs[k] || 0) + effect.attrs[k]);
  }
  if (effect.inv) for (k in effect.inv) {
    S.inv[k] = clampInv((S.inv[k] || 0) + effect.inv[k]);
  }
  if (effect.flag) S.flags[effect.flag] = true;
  if (effect.gongfa) S.gongfa = Math.min(3, S.gongfa + effect.gongfa);
  if (effect.danStop) {   // 停药清修：停服 N 年，耐药清零
    S.danStopUntil = S.age + effect.danStop;
    S.danUsed = 0;
    delete S.flags["丹毒硬扛"];
  }
  if (effect.artifact) for (k in effect.artifact) {
    for (var ai = 0; ai < effect.artifact[k]; ai++) grantArtifact(k);
  }
  if (effect.realmLoss) loseRealm();
  renderLifeAttrs();
  renderRealm();
}

function loseRealm() {
  if (S.realmIdx <= 0) { S.cult = Math.max(0, S.cult - 60); return; }
  S.realmIdx--;
  delete S.flags["筑基"];
  S.winAt = 0;
  S.cult = 495;
  log("境界跌落！你跌回了炼气期。", "death");
  renderRealm();
}

/* =========================================================
 * 事件调度：年份槽位 + 分层 + 链式 + 冷却 + 境界
 * ========================================================= */
function eventById(id) {
  for (var i = 0; i < D.events.length; i++) if (D.events[i].id === id) return D.events[i];
  return null;
}

function dungeonById(id) {
  var ds = D.dungeons || [];
  for (var i = 0; i < ds.length; i++) if (ds[i].id === id) return ds[i];
  return null;
}

function chainEligible(chainId) {
  if (!chainId) return true;
  var idx = chainId.lastIndexOf("_");
  var num = parseInt(chainId.slice(idx + 1), 10);
  if (isNaN(num) || num <= 1) return !S.chains[chainId];
  return !!S.chains[chainId.slice(0, idx + 1) + (num - 1)];
}

function eligible(e) {
  if (S.used[e.id]) return false;
  if (e.milestone !== undefined) return false;
  if (e.age && (S.age < e.age[0] || S.age > e.age[1])) return false;
  if (e.minAge && S.age < e.minAge) return false;
  if (e.layers) {
    var l = currentLayer();
    if (S.realmIdx === 0 && (l < e.layers[0] || l > e.layers[1])) return false;
  }
  // 境界过滤：realms 字段（缺省已推导）
  if (e.realms && e.realms.indexOf(S.realmIdx) === -1) return false;
  // 秘境入口：全局 8 年 + 单秘境独立冷却
  if (e.dungeon) {
    var dc = S.dgCd || {};
    if (S.age - (dc._last || -99) < 8) return false;
    var dg0 = dungeonById(e.dungeon);
    if (dg0 && S.age - (dc[e.dungeon] || -99) < (dg0.cooldown || 20)) return false;
  }
  if (e.cooldown && S.cooldowns[e.id] !== undefined && S.age - S.cooldowns[e.id] < e.cooldown) return false;
  if (!chainEligible(e.chain)) return false;
  if (!condOk(e.cond, S.attrs, S.flags, S.inv)) return false;
  return true;
}

function pickFrom(type) {
  var pool = [];
  var totalW = 0;
  for (var i = 0; i < D.events.length; i++) {
    var e = D.events[i];
    if ((e.type || "daily") !== type) continue;
    if (!eligible(e)) continue;
    var w = e.weight || 1;
    if (e.cond && e.cond.flag && S.flags[e.cond.flag]) w *= 2.5;  // 本路线事件加权
    if (e.dungeon && S.flags["传闻_" + e.dungeon]) w *= 5;        // 传闻铺垫期内，入口加权
    if (e.weightBy) for (var k in e.weightBy) w += (S.attrs[k] || 0) * e.weightBy[k];
    pool.push({ e: e, w: w });
    totalW += w;
  }
  if (!pool.length) return null;
  var r = Math.random() * totalW;
  for (var j = 0; j < pool.length; j++) {
    r -= pool[j].w;
    if (r <= 0) return pool[j].e;
  }
  return pool[pool.length - 1].e;
}

function rollYearEvent() {
  var sinceChoice = S.age - S.lastChoiceAge;
  var type, r = Math.random();
  if (sinceChoice >= 5) {
    type = Math.random() < 0.55 ? "chance" : "trib";   // 抉择兜底
  } else if (r < 0.15) type = "chance";
  else if (r < 0.27) type = "trib";
  else if (r < 0.32) type = "miracle";
  else if (r < 0.35) type = "flavor";
  else type = "daily";
  var e = pickFrom(type);
  if (!e && type !== "daily") e = pickFrom("daily");
  return e;
}

function fireMilestone() {
  for (var i = 0; i < D.events.length; i++) {
    var e = D.events[i];
    if (e.milestone !== S.age) continue;
    if (S.used[e.id]) continue;
    if (!condOk(e.cond, S.attrs, S.flags, S.inv)) continue;
    return e;
  }
  return null;
}
