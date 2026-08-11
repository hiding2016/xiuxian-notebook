/* 模拟跑局：DOM 桩 + 驱动完整对局
 * 用法：node tools/sim.js [局数=30]
 * 校验：炼气→筑基→结丹全流程、结丹年龄分布、秘境次数、存档兼容、v1 通关档续玩
 */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const RUNS = parseInt(process.argv[2] || "60", 10);

/* ---------- DOM 桩 ---------- */
function makeEl(id) {
  const el = {
    id: id || "",
    children: [],
    style: {},
    dataset: {},
    disabled: false,
    type: "",
    textContent: "",
    title: "",
    scrollTop: 0,
    scrollHeight: 100,
    clientHeight: 100,
    parentNode: null,
    _listeners: {},
    _cls: new Set(),
    set innerHTML(v) { el.children = []; el._html = v; },
    get innerHTML() { return el._html || ""; },
    classList: {
      add: (c) => el._cls.add(c),
      remove: (c) => el._cls.delete(c),
      toggle: (c, force) => { (force === undefined ? !el._cls.has(c) : force) ? el._cls.add(c) : el._cls.delete(c); },
      contains: (c) => el._cls.has(c)
    },
    setAttribute(k, v) { el.dataset[k] = String(v); el["data-" + k] = String(v); },
    getAttribute(k) { return el.dataset[k] !== undefined ? el.dataset[k] : (el["data-" + k] !== undefined ? el["data-" + k] : null); },
    appendChild(c) { c.parentNode = el; el.children.push(c); return c; },
    insertBefore(c, ref) {
      c.parentNode = el;
      const i = el.children.indexOf(ref);
      if (i === -1) el.children.unshift(c); else el.children.splice(i, 0, c);
      return c;
    },
    removeChild(c) { const i = el.children.indexOf(c); if (i !== -1) el.children.splice(i, 1); return c; },
    remove() { if (el.parentNode) el.parentNode.removeChild(el); },
    addEventListener(ev, fn) { (el._listeners[ev] = el._listeners[ev] || []).push(fn); },
    click() { (el._listeners.click || []).forEach((f) => f({ target: el })); },
    querySelectorAll(sel) {
      const out = [];
      const walk = (n) => {
        n.children.forEach((c) => {
          if (sel === ".log-item" && String(c._cls && [...c._cls].join(" ")).includes("log-item")) out.push(c);
          if (sel === ".choice-hint" && String(c._cls && [...c._cls].join(" ")).includes("choice-hint")) out.push(c);
          walk(c);
        });
      };
      walk(el);
      return out;
    },
    querySelector(sel) { return el.querySelectorAll(sel)[0] || null; }
  };
  return el;
}

function makeEnv() {
  const els = {};
  const store = new Map();
  const doc = {
    getElementById: (id) => (els[id] = els[id] || makeEl(id)),
    createElement: (tag) => makeEl(""),
    createTextNode: (t) => ({ nodeType: 3, textContent: t, children: [] }),
    querySelector: () => null,
    querySelectorAll: () => [],
    body: makeEl("body")
  };
  const sandbox = {
    window: {
      localStorage: {
        getItem: (k) => (store.has(k) ? store.get(k) : null),
        setItem: (k, v) => store.set(k, String(v)),
        removeItem: (k) => store.delete(k)
      },
      setInterval: () => 1,
      clearInterval: () => {},
      setTimeout: (fn) => { fn(); return 1; }
    },
    document: doc,
    console: { log: () => {}, warn: () => {}, error: () => {} },
    __store: store,
    __els: els
  };
  sandbox.window.GAME_DATA = undefined;
  // 预接线：choice-btns 在 choice-card 内（showHints 需要 parentNode）
  const card = makeEl("choice-card");
  const cbtns = makeEl("choice-btns");
  card.appendChild(cbtns);
  els["choice-btns"] = cbtns;
  vm.createContext(sandbox);
  for (const f of ["assets/data/events-lianqi.js", "assets/data/events-zhuji.js", "assets/data/events-jindan.js", "assets/data/events-jindan-s1.js", "assets/data/events-jindan-s2.js", "assets/data/events-jindan-s3.js", "assets/data/events-yuanying.js", "assets/data/events-yuanying-s1.js", "assets/data/events-yuanying-s2.js", "assets/data/events-yuanying-s3.js", "assets/data/events-huashen.js", "assets/data/events-cross.js", "assets/data/events-jzg.js", "assets/data/events-quanyi.js", "assets/data/events-huafeng.js", "assets/data/events-shenshi.js", "assets/data.js", "assets/core.js", "assets/ui.js", "assets/pop.js", "assets/loop.js"]) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), sandbox, { filename: f });
  }
  return sandbox;
}

/* ---------- 驱动一局 ---------- */
function pickAndClick(ctx) {
  // 从 choice-btns 里挑一个可用按钮点；斗法中模拟合理玩家：主攻、少遁走
  const box = ctx.__els["choice-btns"];
  if (!box) return false;
  const btns = [];
  const walk = (n) => {
    n.children.forEach((c) => {
      if (c._listeners.click && c._listeners.click.length) btns.push(c);
      walk(c);
    });
  };
  walk(box);
  if (!btns.length) return false;
  const enabled = btns.filter((b) => !b.disabled);
  if (ctx.S && ctx.S.bt) {
    const atkNames = ctx.D.spells.filter((s) => s.type === "攻").map((s) => s.name).concat(["法术轰击"]);
    const isAtk = (b) => atkNames.some((n) => (b.textContent || "").indexOf(n) === 0);
    const isFlee = (b) => (b.textContent || "").indexOf("遁走") === 0;
    const lowHp = ctx.S.bt.pHp / ctx.S.bt.pHpMax < 0.25;
    let pick = enabled.find(isAtk);
    if (!pick && lowHp) pick = enabled.find(isFlee);
    if (!pick) pick = enabled.find((b) => !isFlee(b));
    if (!pick) pick = enabled[0];
    pick.click();
    return true;
  }
  const pick = enabled[Math.floor(Math.random() * enabled.length)];
  pick.click();
  return true;
}

function runGame(ctx, attrs, talentId, maxYears, opts) {
  opts = opts || {};
  if (opts.noBattle) {
    ctx.D.events = ctx.D.events.filter(function (e) {
      if (e.battle) return false;
      if (e.effect && e.effect.factionInit) return false;
      if (e.choices && e.choices.some(function (c) { return c.battle; })) return false;
      if (e.id && e.id.indexOf("jzg_") === 0) return false;   // v4.6 价值观组：抉择互动型，纯打坐对照组排除
      return true;
    });
  }
  // 开局
  ctx.talent = null;
  for (const t of ctx.D.talents) if (t.id === talentId) ctx.talent = t;
  ctx.ATTRS.forEach((n) => { ctx.alloc[n] = attrs[n] || 0; });
  ctx.newGame();
  ctx.enterLifeView();

  const marks = { zjAge: null, jdAge: null, yyAge: null, hsAge: null, dungeonRuns: 0, danUsed: 0, death: null, ending: null, realmIdx: 0, sanbao: 0, battles: 0, campaigns: 0, daoXin: 0, faction: false, achv: 0, maxGap: 0, maxGapYy: 0 };
  // 空窗口径：包 fireEvent 计实际触发数（冷却复用卡不增 used，按 used 统计会误报事件荒）
  let firedThisYear = 0;
  const origFire = ctx.fireEvent;
  ctx.fireEvent = function (e) { firedThisYear++; return origFire(e); };
  let guard = 0, prevRealm = 0, gapYears = 0, gapYearsYy = 0;
  while (ctx.S && ctx.S.alive && guard < (maxYears || 400)) {
    guard++;
    if (ctx.S.waitingChoice) {
      if (!pickAndClick(ctx)) break;
    } else {
      firedThisYear = 0;
      ctx.tick();
      if (ctx.S && ctx.S.realmIdx === 2) {
        if (firedThisYear === 0) { gapYears++; if (gapYears > marks.maxGap) marks.maxGap = gapYears; }
        else gapYears = 0;
      }
      if (ctx.S && ctx.S.realmIdx === 3) {
        if (firedThisYear === 0) { gapYearsYy++; if (gapYearsYy > marks.maxGapYy) marks.maxGapYy = gapYearsYy; }
        else gapYearsYy = 0;
      }
    }
    if (!ctx.S) break;
    if (ctx.S.realmIdx === 1 && prevRealm === 0) marks.zjAge = ctx.S.age + 12;
    if (ctx.S.realmIdx === 2 && prevRealm === 1) marks.jdAge = ctx.S.age + 12;
    if (ctx.S.realmIdx === 3 && prevRealm === 2) marks.yyAge = ctx.S.age + 12;
    if (ctx.S.realmIdx === 4 && prevRealm === 3) marks.hsAge = ctx.S.age + 12;
    prevRealm = ctx.S.realmIdx;
  }
  if (ctx.S) {
    marks.realmIdx = ctx.S.realmIdx;
    marks.danUsed = ctx.S.danUsed || 0;
    marks.dungeonRuns = Object.keys(ctx.S.dgCd || {}).filter((k) => k !== "_last").length;
    marks.sanbao = ["玄冰魄", "炎髓晶", "雷灵枝"].filter((m) => ctx.S.flags[m]).length;
    marks.battles = (ctx.S.stats && ctx.S.stats.battleWins) || 0;
    marks.campaigns = Object.keys(ctx.S.used || {}).filter(function (k) { return /^(zy_|mx_|yx_)/.test(k); }).length;
    marks.daoXin = ctx.S.daoXin || 0;
    marks.faction = !!ctx.S.faction;
    marks.achv = (ctx.S.achievements || []).length;
    marks.ending = ctx.__els["end-title"] ? ctx.__els["end-title"].textContent : "";
    if (!ctx.S.alive && !ctx.S.flags["功成名就"]) marks.death = "dead@" + (ctx.S.age + 12);
  }
  return marks;
}

/* ---------- 主流程 ---------- */
if (require.main === module) {
const profiles = [
  { name: "天灵根满配", attrs: { "灵根": 80, "悟性": 60, "根骨": 30, "气运": 20, "神识": 10 }, talent: "tianling" },
  { name: "均衡普通", attrs: { "灵根": 40, "悟性": 40, "根骨": 40, "气运": 40, "神识": 40 }, talent: "wuxing" },
  { name: "差资质散修", attrs: { "灵根": 25, "悟性": 30, "根骨": 50, "气运": 45, "神识": 50 }, talent: "sanxiu" }
];

console.log("建议判读 60+ 局（30 局小样本会误报，空窗/化神率以 60+ 为准）");
console.log("=== 模拟跑局 × " + RUNS + "/档 ===\n");
for (const p of profiles) {
  const stat = { zj: 0, jd: 0, yy: 0, hs: 0, dieQi: 0, dieZj: 0, dieJd: 0, zjAges: [], jdAges: [], yyAges: [], hsAges: [], dgTotal: 0, dgRuns: 0, sanbaoFull: 0, jdGrade: { 1: 0, 2: 0, 3: 0 }, battles: 0, campaigns: 0, daoXin: 0, faction: 0, yyGuard: 0, maxGap: 0, maxGapYy: 0 };
  for (let i = 0; i < RUNS; i++) {
    const ctx = makeEnv();
    const m = runGame(ctx, p.attrs, p.talent, 900);
    if (m.zjAge) { stat.zj++; stat.zjAges.push(m.zjAge); }
    if (m.jdAge) { stat.jd++; stat.jdAges.push(m.jdAge); }
    if (m.yyAge) { stat.yy++; stat.yyAges.push(m.yyAge); }
    if (!m.zjAge) stat.dieQi++;
    else if (!m.jdAge) stat.dieZj++;
    else if (!m.yyAge) stat.dieJd++;
    if (m.dungeonRuns) { stat.dgRuns++; stat.dgTotal += m.dungeonRuns; }
    if (m.sanbao === 3) stat.sanbaoFull++;
    stat.battles += m.battles; stat.campaigns += m.campaigns; stat.daoXin += m.daoXin;
    if (m.maxGap > stat.maxGap) stat.maxGap = m.maxGap;
    if (m.maxGapYy > stat.maxGapYy) stat.maxGapYy = m.maxGapYy;
    if (m.realmIdx >= 4) { stat.hs++; if (m.hsAge) stat.hsAges.push(m.hsAge); }
    if (m.faction) stat.faction++;
    if (m.realmIdx === 2) {
      const ctxS = ctx.S;
      if (ctxS.flags["一品金丹"]) stat.jdGrade[1]++;
      else if (ctxS.flags["假丹"]) stat.jdGrade[3]++;
      else stat.jdGrade[2]++;
    }
  }
  const avg = (a) => a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : "-";
  console.log("【" + p.name + "】");
  console.log("  筑基 " + stat.zj + "/" + RUNS + "（均龄 " + avg(stat.zjAges) + " 岁）｜结丹 " + stat.jd + "/" + RUNS + "（均龄 " + avg(stat.jdAges) + " 岁）｜结婴 " + stat.yy + "/" + RUNS + "（均龄 " + avg(stat.yyAges) + " 岁）｜化神 " + stat.hs + "/" + RUNS + "（均龄 " + avg(stat.hsAges) + " 岁）");
  console.log("  困死炼气 " + stat.dieQi + "｜止步筑基 " + stat.dieZj + "｜金丹期未结婴 " + stat.dieJd + "｜开府 " + stat.faction + "/" + RUNS + "｜斗法均 " + (stat.battles / RUNS).toFixed(1) + " 胜｜战役均 " + (stat.campaigns / RUNS).toFixed(1) + "｜道心均 " + (stat.daoXin / RUNS).toFixed(1));
  console.log("  金丹品级 一品 " + stat.jdGrade[1] + " / 二品 " + stat.jdGrade[2] + " / 假丹 " + stat.jdGrade[3] + "｜三宝集齐 " + stat.sanbaoFull + "/" + RUNS);
  console.log("  秘境：有遭遇 " + stat.dgRuns + "/" + RUNS + " 局，平均 " + (stat.dgRuns ? (stat.dgTotal / stat.dgRuns).toFixed(1) : 0) + " 次/局");
  console.log("  金丹最长无新卡空窗 " + stat.maxGap + " 年（一次性池预警线 5）");
  console.log("  元婴最长无新卡空窗 " + stat.maxGapYy + " 年（v4 池子建成前会很大）");
}

/* ---------- 存档兼容 ---------- */
console.log("\n=== 存档兼容 ===");
// 1) 中途存读 roundtrip
{
  const ctx = makeEnv();
  ctx.ATTRS.forEach((n) => { ctx.alloc[n] = 40; });
  ctx.talent = null;
  for (const t of ctx.D.talents) if (t.id === "wuxing") ctx.talent = t;
  ctx.newGame();
  ctx.enterLifeView();
  for (let i = 0; i < 60; i++) { if (ctx.S.waitingChoice) { pickAndClick(ctx); continue; } ctx.tick(); if (!ctx.S.alive) break; }
  const raw = ctx.__store.get("xiuxian_save_v1");
  const before = raw ? JSON.parse(raw) : null;
  const ok1 = !!(before && typeof before.age === "number" && Array.isArray(before.logs)) || !ctx.S.alive;   // 战死会清档（设计如此），不算存盘失败
  console.log("  存盘字段（含 logs）: " + (ok1 ? "✓" : "✗"));
  if (before) {
    const ctx2 = makeEnv();
    ctx2.__store.set("xiuxian_save_v1", raw);
    ctx2.continueGame(JSON.parse(raw));
    const ok2 = ctx2.S.age === before.age && ctx2.S.realmIdx === before.realmIdx && ctx2.S.logs.length === before.logs.length;
    console.log("  读档还原（年龄/境界/日志）: " + (ok2 ? "✓" : "✗"));
  }
}
// 2) v1 通关档（筑基·功成名就）续玩
{
  const v1save = JSON.stringify({
    v: 1, age: 35, cult: 0, realmIdx: 1, lifespan: 262,
    attrs: { "灵根": 60, "悟性": 50, "根骨": 45, "气运": 40, "神识": 30 },
    flags: { "筑基": true, "功成名就": true }, inv: { "灵石": 120, "聚气丹": 2, "筑基丹": 1, "符咒": 0 },
    gongfa: 1, artifacts: [{ name: "青钢剑", grade: "法器", power: 10 }],
    used: ["a_friend"], cooldowns: {}, chains: {},
    lastChoiceAge: 30, winAt: 37, highlights: ["筑基啦"], talentId: "wuxing"
  });
  const ctx = makeEnv();
  ctx.__store.set("xiuxian_save_v1", v1save);
  ctx.continueGame(JSON.parse(v1save));
  const cleared = !ctx.S.flags["功成名就"] && ctx.S.winAt === 0 && ctx.S.realmIdx === 1;
  console.log("  v1 通关档清「功成名就」续玩: " + (cleared ? "✓" : "✗"));
  ctx.enterLifeView();
  let alive = true;
  for (let i = 0; i < 120 && alive; i++) {
    if (ctx.S.waitingChoice) { pickAndClick(ctx); continue; }
    ctx.tick();
    alive = ctx.S && ctx.S.alive;
  }
  console.log("  续玩 120 年不崩（境界 " + (ctx.S ? ctx.S.realmIdx : "?") + "）: " + (ctx.S ? "✓" : "✗"));
}
// 3) v2 通关档（结丹·功成名就）续玩
{
  const v2save = JSON.stringify({
    v: 1, age: 90, cult: 0, realmIdx: 2, lifespan: 262,
    attrs: { "灵根": 60, "悟性": 50, "根骨": 45, "气运": 40, "神识": 30 },
    flags: { "筑基": true, "结丹": true, "功成名就": true }, inv: { "灵石": 300, "聚气丹": 0, "筑基丹": 0, "符咒": 1, "凝元丹": 0, "结金丹": 0 },
    gongfa: 2, artifacts: [{ name: "玄龟盾", grade: "灵器", power: 25 }],
    used: ["a_friend"], cooldowns: {}, chains: {},
    lastChoiceAge: 80, winAt: 90, highlights: ["结丹啦"], talentId: "wuxing"
  });
  const ctx = makeEnv();
  ctx.__store.set("xiuxian_save_v1", v2save);
  ctx.continueGame(JSON.parse(v2save));
  const cleared = ctx.S.flags["功成名就"] === undefined && ctx.S.winAt === 0 && ctx.S.realmIdx === 2;
  console.log("  v2 结丹通关档清「功成名就」续玩: " + (cleared ? "✓" : "✗"));
  const okFields = Array.isArray(ctx.S.spells) && ctx.S.daoXin === 0 && ctx.S.faction === null &&
    ctx.S.renqing === 0 && Array.isArray(ctx.S.achievements) && ctx.S.sanShangUntil === 0 &&
    ctx.S.weakUntil === 0 && ctx.S.pindan === 0 && ctx.S.evil === 0 &&
    typeof ctx.S.stats === "object" && ctx.S.stats !== null;
  console.log("  旧档缺新字段默认读取: " + (okFields ? "✓" : "✗"));
  ctx.enterLifeView();
  let alive = true;
  for (let i = 0; i < 120 && alive; i++) {
    if (ctx.S.waitingChoice) { pickAndClick(ctx); continue; }
    ctx.tick();
    alive = ctx.S && ctx.S.alive;
  }
  console.log("  续玩 120 年不崩（境界 " + (ctx.S ? ctx.S.realmIdx : "?") + "）: " + (ctx.S ? "✓" : "✗"));
}
console.log("\n完成。");

/* ---------- 纯打坐对照组（禁斗法事件，验证修不满） ---------- */
{
  let yyCtl = 0;
  const CTL = Math.min(RUNS, 10);
  for (let i = 0; i < CTL; i++) {
    const ctx = makeEnv();
    const m = runGame(ctx, { "灵根": 80, "悟性": 60, "根骨": 30, "气运": 20, "神识": 10 }, "tianling", 900, { noBattle: true });
    if (m.yyAge) yyCtl++;
  }
  console.log("=== 纯打坐对照组（天灵根×" + CTL + "，禁斗法+禁开府）结婴 " + yyCtl + "/" + CTL + "（设计预期 0） ===");
}
}

module.exports = { makeEnv, runGame, pickAndClick };
