/* 修仙记事本 · core.js —— 纯逻辑层（无 UI）
 * 常量/工具/存档/法宝战力/事件调度/效果应用。
 * 加载顺序：data.js → core.js → ui.js → pop.js → loop.js（经典脚本，共享顶层声明）
 */

var D = window.GAME_DATA;
var ATTRS = D.attrs;
var TOTAL = D.totalPoints;
var STEP = 10;
var GONGFA_NAMES = ["黄阶", "玄阶", "地阶", "天阶"];
/* v4.1 人物主线：本局挚友/道侣名字（开局随机，存档持久），文案【挚友】【道侣名】占位符运行时替换 */
var NPC_FRIEND_NAMES = ["阿牛", "石头", "青柏", "长风", "铁柱"];
var NPC_LOVER_NAMES = ["阿棠", "小满", "知夏", "疏雨", "采蘩"];
function npcT(t) {
  if (!t || !S || !S.npc) return t;
  return t.split("【挚友】").join(S.npc.friend).split("【道侣名】").join(S.npc.lover);
}
/* v4.2 功法差异：魔修快（×1.25 修为，心魔骰更高），面板后缀区分路线 */
function gongfaLabel() {
  var n = GONGFA_NAMES[S.gongfa];
  if (S.flags["魔修"]) return n + "·魔";
  if (S.flags["散修"]) return n + "·散";
  return n;
}
var ART_POOL = {
  "法器": ["青钢剑", "流云剑", "玄铁刀", "破煞枪", "寒铁鞭", "紫电锤", "踏云靴", "青冥伞", "赤焰环", "玄冰绫", "青铜印", "照影镜", "赤焰刀", "破魂枪", "陨星锥"],
  "灵器": ["玄龟盾", "雷光镜", "摄魂铃", "流萤扇", "锁妖链", "照骨镜", "紫霄剑", "玄武印", "寒鸦笛", "定风珠", "惊鸿剑", "断岳刀", "青罗伞", "鲛绡衣"],
  "法宝": ["镇山印", "混元珠", "太虚镜", "阴阳扇", "玄武钟", "星河图", "紫府铃", "落日弓", "玄黄塔", "照妖镜", "贯日枪", "冰魄剑", "厚土钟", "不动明王盾", "玲珑塔", "定海珠"]
};
/* 法宝攻防分型：剑刀枪锤弓锥→攻；盾钟伞衣绫靴→守；印镜珠塔图铃扇环鞭笛链及其余→兼 */
var ART_TYPE = {
  "青钢剑": "攻", "流云剑": "攻", "玄铁刀": "攻", "破煞枪": "攻", "紫电锤": "攻",
  "紫霄剑": "攻", "惊鸿剑": "攻", "断岳刀": "攻", "落日弓": "攻", "贯日枪": "攻", "冰魄剑": "攻",
  "赤焰刀": "攻", "破魂枪": "攻", "陨星锥": "攻",
  "踏云靴": "守", "青冥伞": "守", "玄冰绫": "守", "玄龟盾": "守", "青罗伞": "守", "鲛绡衣": "守",
  "玄武钟": "守", "厚土钟": "守", "不动明王盾": "守",
  "寒铁鞭": "兼", "赤焰环": "兼", "青铜印": "兼", "照影镜": "兼",
  "雷光镜": "兼", "摄魂铃": "兼", "流萤扇": "兼", "锁妖链": "兼", "照骨镜": "兼", "玄武印": "兼", "寒鸦笛": "兼", "定风珠": "兼",
  "镇山印": "兼", "混元珠": "兼", "太虚镜": "兼", "阴阳扇": "兼", "星河图": "兼", "紫府铃": "兼", "玄黄塔": "兼", "照妖镜": "兼", "玲珑塔": "兼", "定海珠": "兼"
};
function artifactType(a) { return ART_TYPE[a.name] || "兼"; }
var ART_POWER = { "法器": 10, "灵器": 25, "法宝": 50 };
var ART_LIFE = { "法器": 30, "灵器": 60, "法宝": 120 };   // 法宝寿限（年）：没有亘古不变的物品
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
var DEAD_KEY = "xiuxian_dead_v1";    // 战死档备份（重玩用）
var RETRY_KEY = "xiuxian_retry_v1";  // 剩余重玩次数（每局 10）
var SNAP_KEY = "xiuxian_endsnap_v1"; // 结局快照（查看总结用）

function saveGame() {
  if (!S || !S.alive) return;
  try {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify({
      v: 1, age: S.age, cult: S.cult, realmIdx: S.realmIdx, lifespan: S.lifespan,
      attrs: S.attrs, flags: S.flags, inv: S.inv, gongfa: S.gongfa, artifacts: S.artifacts,
      used: Object.keys(S.used), cooldowns: S.cooldowns, chains: S.chains,
      lastChoiceAge: S.lastChoiceAge, winAt: S.winAt || 0, highlights: S.highlights,
      chainFocus: S.chainFocus || null,
      talentId: talent ? talent.id : null,
      danUsed: S.danUsed || 0, danStopUntil: S.danStopUntil || 0, dgCd: S.dgCd || {},
      restUntil: S.restUntil || 0,
      spells: S.spells || [], daoXin: S.daoXin || 0, faction: S.faction || null,
      renqing: S.renqing || 0, achievements: S.achievements || [],
      sanShangUntil: S.sanShangUntil || 0, weakUntil: S.weakUntil || 0,
      pindan: S.pindan || 0, evil: S.evil || 0, stats: S.stats || {},
      npc: S.npc || null, shop: S.shop || { yr: {} },
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
  var fab = $("fab-bag");
  if (fab) fab.classList.toggle("hidden", name !== "life");
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

/* ---------- 五行相克：金克木、木克土、土克水、水克火、火克金 ---------- */
var ELEM_KE = { "金": "木", "木": "土", "土": "水", "水": "火", "火": "金" };
function elemKe(a, b) {
  if (!a || !b) return 0;
  if (ELEM_KE[a] === b) return 1;    // a 克 b
  if (ELEM_KE[b] === a) return -1;   // a 被 b 克
  return 0;
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

/* 同型旧宝退役：新宝严格更优则旧宝入库待处置（次年弹处置选择） */
function maybeRetireArtifact(newArt) {
  var t = artifactType(newArt);
  for (var i = 0; i < S.artifacts.length; i++) {
    var a = S.artifacts[i];
    if (a !== newArt && artifactType(a) === t && a.power < newArt.power) {
      S.artifacts.splice(i, 1);
      (S._disposal = S._disposal || []).push({ name: a.name, grade: a.grade, power: a.power });
      log("有了「" + newArt.name + "」，旧宝「" + a.name + "」便显得逊色了。", "");
      i--;
    }
  }
  if (S._disposal && S._disposal.length && (S.queue || []).indexOf("sys_disposal") < 0) {
    (S.queue = S.queue || []).push("sys_disposal");
  }
}

function grantArtifact(grade, force) {
  if (!force && bpSlotsUsed() >= BP_CAP) {
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
  S.artifacts.push({ name: name, grade: grade, power: ART_POWER[grade], gotAt: S.age });
  (S._lastArts = S._lastArts || []).push(name);
  maybeRetireArtifact(S.artifacts[S.artifacts.length - 1]);
}

/* 法宝生命周期：年久灵性渐失，到期退役（善终处置，复用旧宝处置流） */
function checkArtifactAging() {
  var expired = false;
  for (var i = 0; i < S.artifacts.length; i++) {
    var a = S.artifacts[i];
    var life = ART_LIFE[a.grade] || 60;
    if (S.age - (a.gotAt === undefined ? S.age : a.gotAt) < life) continue;
    S.artifacts.splice(i, 1);
    i--;
    (S._disposal = S._disposal || []).push({ name: a.name, grade: a.grade, power: a.power, reason: "age" });
    log("「" + a.name + "」跟了你 " + life + " 年，灵性渐失，到了该退役的时候。", "");
    expired = true;
  }
  if (expired && (S.queue || []).indexOf("sys_disposal") < 0) (S.queue = S.queue || []).push("sys_disposal");
}

/* 法术授予：持有≤4 直接习得；满 5 弹替换抉择（pop.js showSpellReplace） */
function grantSpell(id) {
  if (S.spells.indexOf(id) >= 0) { log("这门法术你早已烂熟于心。", "choice-result"); return; }
  var sp = null;
  D.spells.forEach(function (s) { if (s.id === id) sp = s; });
  if (!sp) return;
  if (S.spells.length < 5) {
    S.spells.push(id);
    // 藏书万卷：习得四门以上法术（B1-1；替换路径不增加数量，无需处理）
    if (S.spells.length >= 4) grantAchievement("cangshu");
    log("你习得法术「" + sp.name + "」。", "highlight");
    return;
  }
  showSpellReplace(sp);
}

function computeCombat() {
  var p = S.attrs["根骨"] + Math.floor(S.attrs["灵根"] / 2) + Math.floor(S.attrs["神识"] / 2) + S.gongfa * 15;
  S.artifacts.forEach(function (a) { p += a.power; });
  p += (S.inv["符咒"] || 0) * 3;
  if (S.age < (S.weakUntil || 0)) p = Math.floor(p / 2);      // 碎丹虚弱
  if (S.age < (S.sanShangUntil || 0)) p = Math.floor(p / 2);  // 养伤
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
    if (cond.cultMin !== undefined && S.cult < cond.cultMin) return false;
    if (cond.cultMax !== undefined && S.cult > cond.cultMax) return false;
    if (cond.intel !== undefined && getIntel() < cond.intel) return false;
    if (cond.daoXinMin !== undefined && (S.daoXin || 0) < cond.daoXinMin) return false;
    if (cond.renqingMax !== undefined && (S.renqing || 0) > cond.renqingMax) return false;
    if (cond.renqingMin !== undefined && (S.renqing || 0) < cond.renqingMin) return false;
    if (cond.factionRoute && (!S.faction || S.faction.route !== cond.factionRoute)) return false;
    if (cond.artType) for (k in cond.artType) { var n0 = 0; S.artifacts.forEach(function (a) { if (artifactType(a) === k) n0++; }); if (n0 < cond.artType[k]) return false; }
    if (cond.artTypeMax) for (k in cond.artTypeMax) { var n1 = 0; S.artifacts.forEach(function (a) { if (artifactType(a) === k) n1++; }); if (n1 > cond.artTypeMax[k]) return false; }
    if (cond.spellTypeMax) for (k in cond.spellTypeMax) { var n2 = 0; S.spells.forEach(function (sid) { D.spells.forEach(function (sp) { if (sp.id === sid && sp.type === k) n2++; }); }); if (n2 > cond.spellTypeMax[k]) return false; }
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

/* 情报读取：势力为主，孤狼走 S.intel 兜底（老苗线） */
function getIntel() { return S.faction ? (S.faction.intel || 0) : (S.intel || 0); }
function addIntel(n) {
  if (S.faction) S.faction.intel = (S.faction.intel || 0) + n;
  else S.intel = (S.intel || 0) + n;
}

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
  if (effect.flag2) S.flags[effect.flag2] = true;
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
  if (effect.spell) grantSpell(effect.spell);
  if (effect.daoXin) { S.daoXin = (S.daoXin || 0) + effect.daoXin; }
  if (effect.evil) { S.evil = (S.evil || 0) + effect.evil; }
  if (effect.goodKarma) { S.evil = Math.max(0, (S.evil || 0) - effect.goodKarma); }   // 行善可消心魔账
  if (effect.intel) addIntel(effect.intel);
  if (effect.sanShang) { S.sanShangUntil = S.age + effect.sanShang; }
  if (effect.weak) { S.weakUntil = S.age + effect.weak; }
  if (effect.achievement && typeof grantAchievement === "function") grantAchievement(effect.achievement);
  if (effect.renqing) {
    S.renqing = Math.max(0, (S.renqing || 0) + effect.renqing);
    if (effect.renqing < 0) {
      S.stats.renqingPaid = (S.stats.renqingPaid || 0) + 1;
      if (S.stats.renqingPaid >= 3) grantAchievement("yibo");
    }
  }
  if (effect.statsInc) for (k in effect.statsInc) {
    S.stats[k] = (S.stats[k] || 0) + effect.statsInc[k];
  }
  if ((S.stats.tudiJiedan || 0) >= 2) grantAchievement("taoli");
  if (effect.artifactForce) for (k in effect.artifactForce) {
    for (var af = 0; af < effect.artifactForce[k]; af++) grantArtifact(k, true);
  }
  if (effect.artifactType) for (k in effect.artifactType) {
    grantArtifactOfType(k, effect.artifactType[k]);
  }
  if (effect.factionDelta && S.faction) {
  for (var fk in effect.factionDelta) {
    if (fk === "spiritVeins" && effect.factionDelta[fk] > 0) {
      for (var fvi = 0; fvi < effect.factionDelta[fk]; fvi++) addVein();
    } else if (fk === "disciples" && effect.factionDelta[fk] > 0) {
      for (var fdi = 0; fdi < effect.factionDelta[fk]; fdi++) S.faction.dizi.push(newDizi());
    } else {
      S.faction[fk] = Math.max(0, (S.faction[fk] || 0) + effect.factionDelta[fk]);
    }
  }
  migrateFaction();
  }
  if (effect.factionInit) {
    S.faction = { route: effect.factionInit.route, rank: 1, disciples: 3, spiritVeins: 1, intel: 0, rep: 1 };
    S.flags["开府"] = true;
    migrateFaction();
    grantAchievement("kaifu");
  }
  renderLifeAttrs();
  renderRealm();
}

/* 按型发放法宝：池中找该型未持有品，找不到则兜底随机（剧情关键物无视格限） */
function grantArtifactOfType(type, grade) {
  var pool = ART_POOL[grade] || [];
  for (var i = 0; i < pool.length; i++) {
    if (ART_TYPE[pool[i]] !== type) continue;
    var taken = false;
    S.artifacts.forEach(function (a) { if (a.name === pool[i]) taken = true; });
    if (!taken) {
      S.artifacts.push({ name: pool[i], grade: grade, power: ART_POWER[grade], gotAt: S.age });
      (S._lastArts = S._lastArts || []).push(pool[i]);
      maybeRetireArtifact(S.artifacts[S.artifacts.length - 1]);
      return;
    }
  }
  grantArtifact(grade, true);
}

/* ---------- 势力：弟子名册与灵脉 ---------- */
var DIZI_NAMES = ["林小鹿", "石头", "阿蛮", "苏白芷", "陈皮", "顾青衣", "韩铁柱", "柳含烟", "燕小七", "周不疑", "孟繁星", "半夏", "罗霄", "童弈", "冼锋", "白露", "江枫", "苗翠", "钟离", "温良"];
var DIZI_ROLES = ["剑", "丹", "器", "商"];
var VEIN_NAMES = {
  zong: ["青梧岭主脉", "后山竹溪", "南麓泉眼", "北岭石脉", "云梦分脉"],
  san: ["盟界泉眼", "黑松灵眼", "白沙水脉", "落霞山溪", "古渡灵潭"]
};
var VEIN_SIZE = ["", "小型", "中型", "大型"];
var VEIN_SPD = [0, 2, 3, 4];    // 修炼增速/年
var VEIN_PAY = [0, 8, 12, 20];  // 供奉灵石/年
var VEIN_UPGRADE = [0, 300, 800];

function newDizi() {
  var used = {};
  if (S.faction && S.faction.dizi) S.faction.dizi.forEach(function (d) { used[d.name] = true; });
  var avail = DIZI_NAMES.filter(function (n) { return !used[n]; });
  var name = avail.length ? avail[rand(0, avail.length - 1)] : DIZI_NAMES[rand(0, DIZI_NAMES.length - 1)] + "·" + rand(2, 9);
  return { name: name, role: DIZI_ROLES[rand(0, DIZI_ROLES.length - 1)] };
}

function addVein() {
  var f = S.faction;
  var pool = VEIN_NAMES[f.route] || VEIN_NAMES.zong;
  f.veins.push({ name: pool[Math.min(f.veins.length, pool.length - 1)], size: 1 });
}

/* 旧档迁移：弟子/灵脉数字 → 名册与矿脉清单；计数保持镜像 */
function migrateFaction() {
  var f = S.faction;
  if (!f) return;
  if (!f.dizi) {
    f.dizi = [];
    for (var i = 0; i < (f.disciples || 0); i++) f.dizi.push(newDizi());
  }
  if (!f.veins) {
    f.veins = [];
    for (var j = 0; j < (f.spiritVeins || 0); j++) addVein();
  }
  f.disciples = f.dizi.length;
  f.spiritVeins = f.veins.length;
}

function grantAchievement(id) {
  S.achievements = S.achievements || [];
  if (S.achievements.indexOf(id) >= 0) return;
  var a = null;
  (D.achievements || []).forEach(function (x) { if (x.id === id) a = x; });
  if (!a) return;
  S.achievements.push(id);
  log("达成成就「" + a.name + "」。", "highlight");
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

function resetGroups() {
  // 变体衬底组：同组卡共享组冷却，全出过才重置，保证重来必是未见文案
  var groups = {};
  for (var i = 0; i < D.events.length; i++) {
    var e = D.events[i];
    if (!e.group) continue;
    (groups[e.group] = groups[e.group] || []).push(e);
  }
  for (var g in groups) {
    var all = true;
    for (var j = 0; j < groups[g].length; j++) if (!S.used[groups[g][j].id]) { all = false; break; }
    if (all) for (var k = 0; k < groups[g].length; k++) delete S.used[groups[g][k].id];
  }
}

function eligible(e) {
  if (e.group) {
    if (S.used[e.id]) return false;   // 组内出过的卡不再来，直到 resetGroups
    var gl = S.cooldowns["g_" + e.group];
    if (gl !== undefined && S.age - gl < (e.cooldown || 8)) return false;
  } else {
    if (S.used[e.id] && !e.cooldown) return false;   // 一次性事件用过即弃；冷却事件按冷却复用
  }
  if (e.milestone !== undefined) return false;
  if (S.chainFocus && S.age <= S.chainFocus.until && e.dungeon) return false;   // 主线链活跃期：不开新冒险，先把手头的剧情走完
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
  if (!e.group && e.cooldown && S.cooldowns[e.id] !== undefined && S.age - S.cooldowns[e.id] < e.cooldown) return false;
  if (S.age < (S.sanShangUntil || 0) && (e.cat === "zhandou" || e.dungeon)) return false;   // 养伤期间禁战斗/秘境
  if (!chainEligible(e.chain)) return false;
  if (!condOk(e.cond, S.attrs, S.flags, S.inv)) return false;
  return true;
}

function pickFrom(type) {
  resetGroups();
  var pool = [];
  var totalW = 0;
  for (var i = 0; i < D.events.length; i++) {
    var e = D.events[i];
    if ((e.type || "daily") !== type) continue;
    if (!eligible(e)) continue;
    var w = e.weight || 1;
    if (S.chainFocus && S.age <= S.chainFocus.until && e.chain && e.chain.indexOf(S.chainFocus.family) === 0) w *= 5;   // 活跃链下一环催办
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
  if (!e) e = pickFrom("flavor");   // 一次性池耗尽时变体衬底兑底，防事件荒（v3.2 血泪规则）
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
