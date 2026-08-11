/* 修仙记事本 · pop.js —— 互动弹窗层
 * 事件触发 / 抉择 / 拍卖 / 火候 / 突破（筑基·结丹两阶段）/ 秘境副本。
 * 依赖 core.js、ui.js。
 */

function fireEvent(e) {
  if (e.dungeon) { enterDungeon(e); return; }   // 秘境入口：完成时才标 used
  S.used[e.id] = true;
  if (e.group) S.cooldowns["g_" + e.group] = S.age;   // 组冷却共享，eligible 认 g_ 键
  else S.cooldowns[e.id] = S.age;
  if (e.chain) {
    S.chains[e.chain] = S.age;
    // 聚焦窗口：本链还有未出的后续环，则 6 年内催办下一环、屏蔽新秘境入口（防剧情断线）
    var fi = e.chain.lastIndexOf("_");
    var family = e.chain.slice(0, fi + 1);
    var hasNext = false;
    var FOCUS_FAMILIES = ["mx_", "yx_", "cz_", "choujia_", "home_", "jyou_", "pang_", "you_", "zdl_"];   // 只有剧情主线开聚焦窗，杂链不挡秘境
    var focusable = FOCUS_FAMILIES.indexOf(family) >= 0;
    for (var ci = 0; focusable && ci < D.events.length; ci++) {
      var e2 = D.events[ci];
      if (e2.chain && e2.chain.indexOf(family) === 0 && !S.used[e2.id]) { hasNext = true; break; }
    }
    if (focusable && hasNext) S.chainFocus = { family: family, until: S.age + 6 };
  }
  if (e.auction) { S.lastChoiceAge = S.age; showAuction(e); return; }
  if (e.timing) { S.lastChoiceAge = S.age; showTiming(e); return; }
  if (e.battle) { enterBattle(e, e.battle); return; }   // 斗法入口：事件级
  if (e.choices && e.choices.length) {
    var opts = e.choices.filter(function (c) {
      return condOk(c.cond, S.attrs, S.flags, S.inv);
    });
    if (opts.length) {
      S.lastChoiceAge = S.age;
      showChoice(e, opts);
      return;
    }
  }
  log(e.text, e.highlight ? "highlight" : "");
  applyEffect(e.effect);
  logDelta(e.effect);
  if (e.highlight) S.highlights.push(S.age + " 年，" + npcT(e.text));
}

/* ---------- 弹窗节奏：阅读停顿 ----------
 * 弹窗关闭后不立刻恢复计时，先留一拍给玩家读结果；
 * 连续弹窗（处置链等自动连弹）也按同一节拍延迟，避免瞬间盖脸。 */
function readPause() {
  var factor = (typeof SPEED_LABELS !== "undefined" && SPEED_LABELS[speedIdx]) || 1;
  return Math.max(150, Math.round(1400 / factor));
}
function resumeTimer() {
  if (!S || !S.alive) return;
  stopTimer();
  S.timer = window.setTimeout(function () { S.timer = null; if (!S.paused) startTimer(); }, readPause());
}

/* ---------- 图鉴提示：弹窗中自动匹配物品说明 ---------- */
function showHints(scanText) {
  var old = document.querySelector(".choice-hint");
  if (old) old.remove();
  var g = D.glossary || {};
  var hints = [];
  for (var k in g) {
    if (scanText.indexOf(k) !== -1) hints.push(k + "：" + g[k]);
  }
  (D.spells || []).forEach(function (sp) {
    if (scanText.indexOf(sp.name) !== -1) hints.push(sp.name + "：" + sp.desc);
  });
  (D.achievements || []).forEach(function (a) {
    if (scanText.indexOf(a.name) !== -1) hints.push(a.name + "：" + a.desc);
  });
  if (!hints.length) return;
  var div = document.createElement("div");
  div.className = "choice-hint";
  div.textContent = hints.join("　");
  var btns = $("choice-btns");
  btns.parentNode.insertBefore(div, btns);
}

/* ---------- 通用选项渲染（突破/秘境共用） ---------- */
function renderOpts(opts, onPick) {
  var box = $("choice-btns");
  box.innerHTML = "";
  opts.forEach(function (o) {
    var btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.type = "button";
    btn.textContent = npcT(o.text);
    if (o.sub) {
      var small = document.createElement("small");
      small.textContent = npcT(o.sub);
      btn.appendChild(small);
    }
    btn.addEventListener("click", function () { onPick(o); });
    box.appendChild(btn);
  });
  openMask();
}

/* ---------- 抉择弹窗 ---------- */
function showChoice(e, opts) {
  S.waitingChoice = true;
  S.pendingChoice = e;
  $("choice-text").textContent = S.age + " 年 · " + npcT(e.text);
  log(e.text, e.highlight ? "highlight" : "");   // 正文同步入日志，弹窗不挡剧情
  var scan = e.text;
  opts.forEach(function (c) { scan += " " + c.text + " " + (c.sub || ""); });
  showHints(scan);
  var box = $("choice-btns");
  box.innerHTML = "";
  opts.forEach(function (c, idx) {
    var btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.type = "button";
    btn.textContent = c.text;
    if (c.sub) {
      var small = document.createElement("small");
      small.textContent = c.sub;
      btn.appendChild(small);
    }
    btn.addEventListener("click", function () { resolveChoice(idx); });
    box.appendChild(btn);
  });
  openMask();
  stopTimer();
}

function resolveChoice(idx) {
  var e = S.pendingChoice;
  var opts = e.choices.filter(function (c) {
    return condOk(c.cond, S.attrs, S.flags, S.inv);
  });
  var c = opts[idx];
  // 随机结果：按权重从 outcomes 里抽
  if (c.outcomes && c.outcomes.length) {
    var tw = 0;
    c.outcomes.forEach(function (o) { tw += (o.weight || 1); });
    var rr = Math.random() * tw, sel = c.outcomes[c.outcomes.length - 1];
    for (var i = 0; i < c.outcomes.length; i++) {
      rr -= (c.outcomes[i].weight || 1);
      if (rr <= 0) { sel = c.outcomes[i]; break; }
    }
    c = { text: c.text, result: sel.result, effect: sel.effect };
  }
  if (c.battle) { enterBattle(null, c.battle); return; }   // 斗法入口：选项级（优先于固定 result）
  $("choice-mask").classList.add("hidden");
  document.body.classList.remove("dialog-open");
  S.waitingChoice = false;
  S.pendingChoice = null;
  log("你选择了「" + c.text + "」。" + c.result, "choice-result");
  applyEffect(c.effect);
  logDelta(c.effect);
  if (e.highlight) S.highlights.push(S.age + " 年，" + npcT(e.text) + "——你选择了「" + npcT(c.text) + "」");
  if (S.alive) resumeTimer();
}

/* ---------- 拍卖会 ---------- */
function showAuction(e) {
  S.waitingChoice = true;
  S.pendingChoice = e;
  stopTimer();
  S.auction = { bid: e.auction.base, top: "none", rounds: 0 };
  log(e.text, "");
  openMask();
  showHints(e.text + " " + e.auction.item);
  renderAuction();
}

function renderAuction() {
  var e = S.pendingChoice, st = S.auction;
  var lead = st.top === "you" ? "你领先" : (st.top === "rival" ? "对手领先" : "底价待出");
  $("choice-text").textContent = S.age + " 年 · " + e.text +
    " 〔" + e.auction.item + "｜当前价 " + fmtNum(st.bid) + " 灵石｜" + lead +
    "｜你有 " + fmtNum(S.inv["灵石"] || 0) + " 灵石〕";
  var box = $("choice-btns");
  box.innerHTML = "";
  [10, 20].forEach(function (inc) {
    var btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.type = "button";
    btn.textContent = "加价 " + inc + " 灵石";
    var small = document.createElement("small");
    small.textContent = "出价到 " + fmtNum(st.bid + inc) + " 灵石";
    btn.appendChild(small);
    if ((S.inv["灵石"] || 0) < st.bid + inc) btn.disabled = true;
    btn.addEventListener("click", function () { auctionRaise(inc); });
    box.appendChild(btn);
  });
  var pass = document.createElement("button");
  pass.className = "choice-btn";
  pass.type = "button";
  pass.textContent = "放弃出价";
  var ps = document.createElement("small");
  ps.textContent = "此物与你无缘";
  pass.appendChild(ps);
  pass.addEventListener("click", function () {
    if (S.auction.top === "you") auctionWin(); else auctionLose();
  });
  box.appendChild(pass);
}

function auctionRaise(inc) {
  var st = S.auction;
  st.bid += inc;
  st.top = "you";
  st.rounds++;
  // 对手应价：概率随轮次递减
  if (Math.random() < Math.max(0.15, 0.55 - st.rounds * 0.08)) {
    st.bid += rand(5, 15);
    st.top = "rival";
    renderAuction();
  } else {
    auctionWin();
  }
}

function auctionWin() {
  var e = S.pendingChoice, st = S.auction;
  S.inv["灵石"] = clampInv((S.inv["灵石"] || 0) - st.bid);
  closeInteractive();
  log("槌落！你以 " + st.bid + " 灵石拍得「" + e.auction.item + "」。" + e.auction.winText, "choice-result");
  applyEffect(e.auction.effect);
  logDelta(e.auction.effect);
  if (e.highlight) S.highlights.push(S.age + " 年，拍卖会上一掷千金，拍得「" + e.auction.item + "」。");
  if (S.alive) resumeTimer();
}

function auctionLose() {
  var e = S.pendingChoice;
  closeInteractive();
  log(e.auction.loseText, "choice-result");
  if (S.alive) resumeTimer();
}

/* ---------- 时机操作（炼丹火候等） ---------- */
function showTiming(e) {
  S.waitingChoice = true;
  S.pendingChoice = e;
  stopTimer();
  $("choice-text").textContent = S.age + " 年 · " + e.text;
  log(e.text, "");
  var box = $("choice-btns");
  box.innerHTML = "";
  var wrap = document.createElement("div");
  wrap.className = "timing-wrap";
  var bar = document.createElement("div");
  bar.className = "timing-bar";
  var zone = document.createElement("div");
  zone.className = "timing-zone";
  var perfect = document.createElement("div");
  perfect.className = "timing-perfect";
  var marker = document.createElement("div");
  marker.className = "timing-marker";
  bar.appendChild(zone);
  bar.appendChild(perfect);
  bar.appendChild(marker);
  wrap.appendChild(bar);
  box.appendChild(wrap);
  var btn = document.createElement("button");
  btn.className = "choice-btn timing-btn";
  btn.type = "button";
  btn.textContent = e.timing.action || "就是现在！";
  box.appendChild(btn);
  openMask();
  showHints(e.text);

  var pos = 0, dir = 1;
  S.timingTimer = window.setInterval(function () {
    pos += dir * 2.4;
    if (pos >= 100) { pos = 100; dir = -1; }
    if (pos <= 0) { pos = 0; dir = 1; }
    marker.style.left = pos + "%";
  }, 30);
  btn.addEventListener("click", function () { resolveTiming(pos); });
}

function resolveTiming(pos) {
  if (S.timingTimer) { window.clearInterval(S.timingTimer); S.timingTimer = null; }
  var e = S.pendingChoice;
  closeInteractive();
  var tier = (pos >= 42 && pos <= 58) ? "perfect" :
             (pos >= 28 && pos <= 72) ? "good" : "fail";
  var o = e.timing[tier];
  log(o.result, "choice-result");
  applyEffect(o.effect);
  logDelta(o.effect);
  if (S.alive) resumeTimer();
}

function openMask() {
  document.body.classList.add("dialog-open");
  $("choice-mask").classList.remove("hidden");
}

function closeInteractive() {
  document.body.classList.remove("dialog-open");
  S.restUntil = S.age + 1;   // 互动结束后次年为休整年，节奏放缓
  var bp = $("battle-panel");
  if (bp) bp.remove();
  $("choice-mask").classList.add("hidden");
  document.body.classList.remove("dialog-open");
  $("choice-minilog").classList.add("hidden");
  S.waitingChoice = false;
  S.pendingChoice = null;
}

/* ---------- 法术满 5 门：替换 / 放弃抉择 ---------- */
function showSpellReplace(sp) {
  S.waitingChoice = true;
  stopTimer();
  $("choice-text").textContent = S.age + " 年 · 你得到「" + sp.name + "」的传承，但五门法术已满，须择一门替换，或就此放弃。";
  var opts = S.spells.map(function (id) {
    var cur = null;
    D.spells.forEach(function (s) { if (s.id === id) cur = s; });
    return {
      text: "替换「" + cur.name + "」",
      sub: cur.type + " · 战力 " + cur.power + (cur.trait ? " · " + cur.trait : ""),
      oldId: id
    };
  });
  opts.push({ text: "放弃这部传承", sub: "五门已满，无缘「" + sp.name + "」", oldId: null });
  renderOpts(opts, function (o) {
    if (o.oldId) {
      var idx = S.spells.indexOf(o.oldId);
      if (idx < 0) { closeInteractive(); if (S.alive) resumeTimer(); return; }  // 防重复点击
      var oldName = "";
      D.spells.forEach(function (s) { if (s.id === o.oldId) oldName = s.name; });
      S.spells.splice(idx, 1, sp.id);
      log("你洗去「" + oldName + "」，改习法术「" + sp.name + "」。", "highlight");
    } else {
      log("你摇了摇头，放弃了「" + sp.name + "」的传承。", "choice-result");
    }
    closeInteractive();
    renderBackpack();
    if (S.alive) resumeTimer();
  });
}

/* =========================================================
 * 秘境副本：连续点选弹窗流
 * ========================================================= */
function enterDungeon(e) {
  S.lastChoiceAge = S.age;
  S.pendingDungeonEvent = e.id;   // used 在 exit 时才标，中途关页不吞次数
  S.waitingChoice = true;
  stopTimer();
  S.dg = { id: e.dungeon, depth: 0, usedNodes: {}, steps: 0 };
  log(e.text + "你决定进去一探。", "highlight");
  showDungeonNode();
}

function showDungeonNode() {
  var d = dungeonById(S.dg.id);
  var pool = (d.depths[S.dg.depth] || []).filter(function (n) { return !S.dg.usedNodes[n.id]; });
  if (!pool.length) pool = d.depths[S.dg.depth] || [];
  if (!pool.length) { exitDungeon("再往前已无路，你带着收获退了出来。"); return; }
  var node = pool[rand(0, pool.length - 1)];
  S.dg.usedNodes[node.id] = true;
  S.dg.node = node;
  var opts = node.choices.filter(function (c) { return condOk(c.cond, S.attrs, S.flags, S.inv); });
  if (!opts.length) { exitDungeon("你找不到可行的路，只得退了出来。"); return; }
  $("choice-text").textContent = "【" + d.name + " · 第" + (S.dg.depth + 1) + "层】" + npcT(node.text);
  // 卡顶迷你时间线：秘境连续选择时剧情不断线（新在上，与主日志一致）
  var ml = $("choice-minilog");
  ml.innerHTML = "";
  S.logs.slice(-3).reverse().forEach(function (l) {
    var li = document.createElement("div");
    li.className = "minilog-item" + (l.c ? " " + l.c : "");
    li.textContent = l.a + "岁 · " + l.t;
    ml.appendChild(li);
  });
  ml.classList.remove("hidden");
  showHints(node.text);
  renderOpts(opts, function (o) { resolveDgChoice(o); });
}

function resolveDgChoice(c) {
  var d = dungeonById(S.dg.id);
  var out = c;
  if (c.combat) {
    // 战斗判定：阈值带 ±10% 随机
    var need = c.combat * (0.9 + Math.random() * 0.2);
    out = (computeCombat() >= need) ? c.win : c.lose;
  } else if (c.outcomes && c.outcomes.length) {
    var tw = 0;
    c.outcomes.forEach(function (o2) { tw += (o2.weight || 1); });
    var rr = Math.random() * tw;
    out = c.outcomes[c.outcomes.length - 1];
    for (var i = 0; i < c.outcomes.length; i++) {
      rr -= (c.outcomes[i].weight || 1);
      if (rr <= 0) { out = c.outcomes[i]; break; }
    }
    if (out.go === undefined) out = { text: c.text, result: out.result, effect: out.effect, sanbao: out.sanbao, death: out.death, go: c.go };
  }
  log("你选择了「" + c.text + "」。" + (out.result || ""), "choice-result");
  // 三宝宝箱：未获得优先，全齐改灵石
  if (out.sanbao) grantSanbao();
  if (out.death) { S.dg = null; die(out.death); return; }
  applyEffect(out.effect);
  logDelta(out.effect);
  if (!S.alive) { S.dg = null; return; }
  // 深处保底：第 3 层起节点结算，50% 概率再得天材地宝（收集驱动探索）
  if (!out.sanbao && S.dg.depth >= 2 && Math.random() < 0.5) {
    if (d.spellTreasure) grantSpellTreasure(); else grantSanbao();
  }
  S.dg.steps++;
  var go = out.go || c.go || "deeper";
  if (go === "exit") { exitDungeon(); return; }
  if (go === "deeper") {
    if (S.dg.depth >= d.depths.length - 1) { exitDungeon("再往前已无路，你带着收获退了出来。"); return; }
    S.dg.depth++;
  }
  showDungeonNode();
}

function exitDungeon(note) {
  var d = dungeonById(S.dg.id);
  S.dgCd = S.dgCd || {};
  S.dgCd[d.id] = S.age;
  S.dgCd._last = S.age;
  if (S.pendingDungeonEvent) {
    S.used[S.pendingDungeonEvent] = true;
    S.cooldowns[S.pendingDungeonEvent] = S.age;
    S.pendingDungeonEvent = null;
  }
  closeInteractive();
  delete S.flags["传闻_" + d.id];
  log(note || ("你离开了「" + d.name + "」。这一趟探到第 " + Math.max(1, S.dg.steps) + " 层，收获都记在小本本上了。"), "choice-result");
  S.dg = null;
  saveGame();
  if (S.alive) resumeTimer();
}

/* 三宝发放：未获得优先，全齐改灵石 100 */
function grantSanbao() {
  var missing = MAT2_NAMES.filter(function (m) { return !S.flags[m]; });
  if (missing.length) {
    var m0 = missing[rand(0, missing.length - 1)];
    S.flags[m0] = true;
    log("你获得天材地宝「" + m0 + "」！", "choice-result");
  } else {
    S.inv["灵石"] = (S.inv["灵石"] || 0) + 100;
    log("三宝你早已集齐，这些灵材转手换了 100 块灵石。", "choice-result");
  }
}

/* =========================================================
 * 斗法 v2：意图预告 + 破绽打断 + 具名 boss 专属机制 + 背水
 * 敌意图：qianggong 抢攻 / xuli 蓄力杀招 / gushou 固守 / xiefa 邪法（魔道）
 * S.bt 为战时状态，不入存档（同秘境 S.dg 先例）
 * ========================================================= */
var INTENT_TXT = {
  qianggong: "敌势·抢攻（来势汹汹，硬碰硬）",
  xuli: "敌势·蓄力杀招（此击极重：攻可打断，守可硬吃）",
  gushou: "敌势·固守（不出手，在蓄势）",
  xiefa: "敌势·邪法（阴气缠身，要吸你的血气）"
};
function pickIntent(bt) {
  if (bt.pozhan) return "qianggong";                 // 破绽中，攻势散乱
  var pool = [["qianggong", 5], ["xuli", 3], ["gushou", 2]];
  if (bt.spec.demonic && !bt.noLeech) pool.push(["xiefa", 2]);
  if (bt.lastIntent === "xuli") pool = pool.filter(function (p) { return p[0] !== "xuli"; });  // 不连蓄
  var tot = 0, i;
  pool.forEach(function (p) { tot += p[1]; });
  var r = Math.random() * tot;
  for (i = 0; i < pool.length; i++) { r -= pool[i][1]; if (r <= 0) return pool[i][0]; }
  return "qianggong";
}
function enterBattle(e, b) {
  S.lastChoiceAge = S.age;
  S.waitingChoice = true;
  stopTimer();
  var combat = computeCombat();
  var mul = b.tier === 1 ? 0.95 + Math.random() * 0.2
          : b.tier === 2 ? 1.1 + Math.random() * 0.15
          : 1.5 + Math.random() * 0.25;
  var eBase = Math.round(combat * mul);
  S.bt = {
    spec: b, eventId: e ? e.id : null,
    pHpMax: 20 + Math.floor(combat / 5) + S.realmIdx * 10, pHp: 0,
    eHpMax: 15 + Math.floor(eBase / 6.5) + 20, eHp: 0,
    eBase: eBase, xuShi: false, round: 0, mingXi: false,
    intent: "qianggong", lastIntent: null, pozhan: false, eXuShi: false,
    poison: 0, danUsed: false, armorBroken: false, noLeech: false
  };
  // 具名 boss 专属机制挂接（spec.sig）
  if (b.sig === "jiebei") {
    if (!S.flags["斩大妖"]) { eBase = Math.round(eBase * 1.2); S.bt.eBase = eBase; S.bt.eHpMax = Math.round(S.bt.eHpMax * 1.25); }  // 护教老妖到场助战
    if (S.flags["布防在手"]) S.bt.pozhan = true;      // 布防被摸透，先手伏击
    if (S.flags["灵材截获"]) S.bt.noLeech = true;      // 破碑灵材被截，借不上碑力
    if (S.flags["教主邪涨"]) S.bt.eBase = Math.round(S.bt.eBase * 1.1);  // 碑门开过一线，魔气加持
  }
  if (b.sig === "yingjia" && S.flags["破甲先机"]) S.bt.armorBroken = true;  // 妖将甲缝试过剑
  S.bt.pHp = S.bt.pHpMax; S.bt.eHp = S.bt.eHpMax;
  // 自动择优佩戴：主攻取攻型最强（无则兼型最强），主守取守型最强（无则兼型次之）
  S.artifacts.forEach(function (a) {
    var t = artifactType(a);
    if (t === "攻" && (!S.bt.atkArt || a.power > S.bt.atkArt.power)) S.bt.atkArt = a;
    if (t === "守" && (!S.bt.defArt || a.power > S.bt.defArt.power)) S.bt.defArt = a;
  });
  if (!S.bt.atkArt) S.artifacts.forEach(function (a) {
    if (artifactType(a) === "兼" && (!S.bt.atkArt || a.power > S.bt.atkArt.power)) S.bt.atkArt = a;
  });
  if (!S.bt.defArt) S.artifacts.forEach(function (a) {
    if (a !== S.bt.atkArt && artifactType(a) === "兼" && (!S.bt.defArt || a.power > S.bt.defArt.power)) S.bt.defArt = a;
  });
  var intro = (e ? e.text + "——" : "") + "狭路相逢，" + b.name + "拦在面前。";
  if (S.bt.atkArt && S.bt.defArt) intro += "你祭出「" + S.bt.atkArt.name + "」，又以「" + S.bt.defArt.name + "」护身。";
  else if (S.bt.atkArt) intro += "你祭出「" + S.bt.atkArt.name + "」。";
  else if (S.bt.defArt) intro += "你撑起「" + S.bt.defArt.name + "」护住周身。";
  else intro += "你身无寸铁，全凭一身修为。";
  log(intro, "highlight");
  startBattleRound();
}

function startBattleRound() {
  var bt = S.bt;
  if (!bt.freeAction) bt.round++;   // 服药/掷符为自由动作，不占回合
  bt.freeAction = false;
  if (bt.round > 6) { endBattleJudge(); return; }   // 超时按气血比例判
  if (!bt.keepIntent) {
    bt.intent = pickIntent(bt);
    // 水毒（莫怀空「缠杀」）：回合开始结算
    if (bt.poison > 0) {
      bt.poison--;
      bt.pHp -= 3;
      btLog("水毒顺着经脉往上爬，气血 -3。");
      if (bt.pHp <= 0) { endBattleLose(); return; }
    }
  }
  bt.keepIntent = false;
  var lowHp = bt.pHp / bt.pHpMax < 0.2;
  var opts = [];
  var atks = D.spells.filter(function (s) { return S.spells.indexOf(s.id) >= 0 && s.type === "攻"; });
  if (atks.length) atks.slice(0, 2).forEach(function (s) {
    var ke = elemKe(s.elem, bt.spec.elem);
    var sub = s.elem + " · 威力 " + s.power
      + (ke > 0 ? " · 克" + bt.spec.elem + "!" : ke < 0 ? " · 被" + bt.spec.elem + "克" : "")
      + (s.trait === "破魔" && bt.spec.demonic ? " · 破魔" : "")
      + (lowHp ? " · 背水+25%" : "")
      + (bt.intent === "xuli" ? " · 可打断" : "");
    opts.push({ text: s.name, sub: sub, kind: "atk", spell: s });
  }); else opts.push({ text: "法术轰击", sub: "无属性 · 全凭修为" + (lowHp ? " · 背水+25%" : "") + (bt.intent === "xuli" ? " · 可打断" : ""), kind: "atk", spell: null });
  var defPow0 = bt.defArt ? Math.floor(bt.defArt.power / 5 * (artifactType(bt.defArt) === "守" ? 1.2 : 0.8)) : 0;
  opts.push({ text: bt.defArt ? "祭起「" + bt.defArt.name + "」固守" : "敛气固守", sub: "减伤 60%" + (defPow0 ? " + 法宝再减 " + defPow0 : "") + " · 次回合蓄势", kind: "def" });
  var bian = D.spells.filter(function (s) { return S.spells.indexOf(s.id) >= 0 && s.type === "变"; });
  if (bian.length) opts.push({ text: bian[0].name, sub: bian[0].elem + " · " + bian[0].desc, kind: "bian", spell: bian[0] });
  // 斗法消耗品（v4.3）：自由动作不占回合，灵石→战力的临场出口
  if ((S.inv["回春丹"] || 0) > 0) opts.push({ text: "服下回春丹", sub: "气血 +30%（剩 " + S.inv["回春丹"] + "）· 不占出手", kind: "item", item: "回春丹" });
  if ((S.inv["玉骨丹"] || 0) > 0) opts.push({ text: "服下玉骨丹", sub: "气血 +55%（剩 " + S.inv["玉骨丹"] + "）· 不占出手", kind: "item", item: "玉骨丹" });
  if ((S.inv["符咒"] || 0) >= 2) opts.push({ text: "掷符伤敌", sub: "符咒 -2 · 伤敌一截 · 不占出手", kind: "item", item: "符咒" });
  opts.push({ text: "遁走", sub: "逃出战局（神识判定），折损声望", kind: "flee" });   // 永远存在
  var eRatio = bt.eHp / bt.eHpMax;
  var eState = eRatio > 0.7 ? "气势正盛" : eRatio > 0.35 ? "已露疲态" : "摇摇欲坠";
  $("choice-text").textContent = "【斗法 · 第" + bt.round + "回合】你 " + bt.pHp + "/" + bt.pHpMax + " · " + bt.spec.name + " " + eState + (bt.pozhan ? " · 破绽" : "") + " ｜ " + INTENT_TXT[bt.intent];
  renderOpts(opts, function (o) { resolveBattleRound(o); });
  // 战斗面板：双方血条 + 战力对比 + 佩戴法宝 + 可用法术（成就感来源）
  var panel = $("battle-panel");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "battle-panel";
    var ct = $("choice-text");
    ct.parentNode.insertBefore(panel, ct);
  }
  panel.innerHTML = "";
  function mkBar(label, hp, max, cls) {
    var row = document.createElement("div");
    row.className = "bb-row";
    var lab = document.createElement("span");
    lab.className = "bb-label";
    lab.textContent = label;
    var bar = document.createElement("div");
    bar.className = "bb-bar";
    var fill = document.createElement("div");
    fill.className = "bb-fill " + cls;
    fill.style.width = Math.max(0, Math.round(hp / max * 100)) + "%";
    var num = document.createElement("span");
    num.className = "bb-num";
    num.textContent = hp + "/" + max;
    bar.appendChild(fill);
    row.appendChild(lab); row.appendChild(bar); row.appendChild(num);
    return row;
  }
  panel.appendChild(mkBar("你", bt.pHp, bt.pHpMax, "bb-you"));
  panel.appendChild(mkBar(bt.spec.name, bt.eHp, bt.eHpMax, "bb-foe"));
  var meta = document.createElement("div");
  meta.className = "bb-meta";
  meta.textContent = "战力 你 " + computeCombat() + " · 敌 ≈" + bt.eBase + (bt.spec.elem ? " · " + bt.spec.elem + "系" : "");
  panel.appendChild(meta);
  var chips = document.createElement("div");
  chips.className = "bb-chips";
  if (bt.atkArt) { var c1 = document.createElement("span"); c1.className = "bb-chip bb-art"; c1.textContent = bt.atkArt.name + " · 攻 +" + Math.round(bt.atkArt.power * (artifactType(bt.atkArt) === "攻" ? 1.2 : 0.8)); chips.appendChild(c1); }
  if (bt.defArt) { var c2 = document.createElement("span"); c2.className = "bb-chip bb-art"; c2.textContent = bt.defArt.name + " · 减伤 +" + Math.round(bt.defArt.power / 5 * (artifactType(bt.defArt) === "守" ? 1.2 : 0.8)); chips.appendChild(c2); }
  S.spells.forEach(function (sid) {
    D.spells.forEach(function (sp) {
      if (sp.id === sid) { var c = document.createElement("span"); c.className = "bb-chip bb-spell"; c.textContent = sp.name; chips.appendChild(c); }
    });
  });
  panel.appendChild(chips);
  // 卡顶迷你时间线：斗法回合叙事只进 roundLog（不刷主时间线）
  var ml = $("choice-minilog");
  ml.innerHTML = "";
  (bt.roundLog || []).slice(-3).reverse().forEach(function (t) {
    var li = document.createElement("div");
    li.className = "minilog-item choice-result";
    li.textContent = t;
    ml.appendChild(li);
  });
  ml.classList.remove("hidden");
}

/* 斗法回合叙事：只进弹卡迷你时间线，主时间线只留开场与结算 */
function btLog(t) {
  if (S.bt) (S.bt.roundLog = S.bt.roundLog || []).push(t);
}

function resolveBattleRound(o) {
  var bt = S.bt, b = bt.spec;
  if (o.kind === "item") {
    if (o.item === "符咒") {
      if ((S.inv["符咒"] || 0) < 2) { bt.freeAction = true; bt.keepIntent = true; startBattleRound(); return; }
      S.inv["符咒"] -= 2;
      var fd = Math.max(8, Math.round(bt.eHpMax * 0.08));
      bt.eHp -= fd;
      btLog("两张符咒凌空炸开，火光吞没敌身，" + b.name + "气血 -" + fd + "。");
      if (bt.eHp <= 0) { endBattleWin(); return; }
    } else {
      if ((S.inv[o.item] || 0) <= 0) { bt.freeAction = true; bt.keepIntent = true; startBattleRound(); return; }
      S.inv[o.item]--;
      var rate = o.item === "回春丹" ? 0.3 : 0.55;
      var heal = Math.max(1, Math.round(bt.pHpMax * rate));
      bt.pHp = Math.min(bt.pHpMax, bt.pHp + heal);
      btLog("你服下一枚" + o.item + "，气血 +" + heal + "。");
    }
    renderBackpack();
    bt.freeAction = true; bt.keepIntent = true;
    startBattleRound();
    return;
  }
  var atkPow = bt.atkArt ? bt.atkArt.power * (artifactType(bt.atkArt) === "攻" ? 1.2 : 0.8) : 0;
  var defPow = bt.defArt ? bt.defArt.power / 5 * (artifactType(bt.defArt) === "守" ? 1.2 : 0.8) : 0;
  if (o.kind === "flee") {
    var pFlee = Math.max(0.1, Math.min(0.9,
      S.attrs["神识"] / (S.attrs["神识"] + bt.eBase / 2) + (o.spell && o.spell.trait === "敛息" ? 0.2 : 0)));
    if (Math.random() < pFlee) { endBattleFlee(); return; }
    btLog("你抽身欲退，却被" + b.name + "死死缠住！");
  }
  var playerDef = false, eSkip = false;
  if (o.kind === "atk") {
    var sp = o.spell, base = computeCombat() + (sp ? sp.power : 0) + atkPow;
    if (sp && sp.trait === "破魔" && b.demonic) base *= 1.25;
    var ke = sp ? elemKe(sp.elem, b.elem) : 0;
    if (ke > 0) base *= 1.2;
    else if (ke < 0) base *= 0.85;
    if (bt.xuShi) { base *= 1.3; bt.xuShi = false; }
    if (bt.pozhan) { base *= 1.5; bt.pozhan = false; }            // 破绽受创
    if (bt.pHp / bt.pHpMax < 0.2) base *= 1.25;                   // 背水
    var dmg = Math.max(1, Math.round(base / 10 * (0.8 + Math.random() * 0.4)));
    // 打断蓄力：敌本回合空过，下回合破绽
    if (bt.intent === "xuli") {
      eSkip = true; bt.pozhan = true;
      btLog("你抢在杀招出手之前抢攻——" + b.name + "的蓄力被打断，门户大开！");
    }
    // 云梦老妖「硬甲」：未破甲前受创 -30%，打断即破甲（此击全额）
    if (b.sig === "yingjia" && !bt.armorBroken) {
      if (eSkip) { bt.armorBroken = true; btLog("这一击震在甲缝上——老妖的玄铁硬甲，破了！"); }
      else dmg = Math.max(1, Math.round(dmg * 0.7));
    }
    bt.eHp -= dmg;
    if (sp && sp.trait === "破魔" && b.demonic) bt.poMoThisRound = true;
    var sname = sp ? sp.name : "法术轰击";
    var keTag = ke > 0 ? "（五行相克！）" : ke < 0 ? "（属性受制）" : "";
    var hits = [
      "「" + sname + "」轰然落下，" + b.name + "硬吃了一记，气血 -" + dmg + "。" + keTag,
      "你抢上半步，「" + sname + "」正中破绽，气血 -" + dmg + "。" + keTag,
      b.name + "躲闪不及，被「" + sname + "」扫个正着，气血 -" + dmg + "。" + keTag,
      "「" + sname + "」去势如电，" + b.name + "招架不住，气血 -" + dmg + "。" + keTag
    ];
    btLog(hits[rand(0, hits.length - 1)]);
  } else if (o.kind === "def") {
    playerDef = true; bt.xuShi = true;
    btLog("你守中蓄势，只待破绽。");
  } else if (o.kind === "bian" && o.spell) {
    if (o.spell.trait === "敛息") {
      // 遁走判定同 flee，成功则 endBattleFlee
      var pFlee2 = Math.max(0.1, Math.min(0.9,
        S.attrs["神识"] / (S.attrs["神识"] + bt.eBase / 2) + 0.2));
      if (Math.random() < pFlee2) { endBattleFlee(); return; }
      btLog("你敛息欲遁，却被" + b.name + "识破了行迹！");
    }
    else if (o.spell.id === "xueran") { bt.pHp -= 5; bt.eHp -= Math.round(computeCombat() / 10 * 1.5); btLog("血燃术燃起你的精血，一击石破天惊。"); }
    else if (o.spell.id === "dingshen") { eSkip = Math.random() < 0.5; btLog("定身诀打出，" + b.name + "的身形顿时一滞。"); }
    else if (o.spell.trait === "续命") { bt.mingXi = true; btLog("你点起续命灯，灯芯微微发亮。"); }
    else btLog("你祭出「" + o.text + "」。");
  }
  if (bt.eHp <= 0) { endBattleWin(); return; }
  // 厉坤「吞丹」：半血一次，回血 30% 攻 +20%
  if (b.sig === "tundan" && !bt.danUsed && bt.eHp < bt.eHpMax / 2) {
    bt.danUsed = true;
    bt.eHp = Math.min(bt.eHpMax, bt.eHp + Math.round(bt.eHpMax * 0.3));
    bt.eBase = Math.round(bt.eBase * 1.2);
    btLog(b.name + "掏出一枚赤红丹药吞下，气色眼见着涨了回来！");
  }
  if (eSkip) {
    btLog(b.name + "身法一滞，这一回合没能出手。");
  } else if (bt.intent === "gushou") {
    bt.eXuShi = true;
    btLog(b.name + "稳守门户，周身气机越收越紧。");
  } else if (bt.intent === "xiefa") {
    var drain = Math.max(1, Math.round(bt.eBase / 9 * (0.8 + Math.random() * 0.4)));
    if (playerDef) drain = Math.max(0, Math.floor(drain * 0.4) - Math.floor(defPow));
    bt.pHp -= drain;
    var healAmt = bt.noLeech ? 0 : Math.round(drain * (bt.poMoThisRound ? 0.5 : 1));
    if (healAmt > 0) {
      bt.eHp = Math.min(bt.eHpMax, bt.eHp + healAmt);
      btLog("阴气缠上你的伤口，血气被一丝丝抽走，气血 -" + drain + "。" + b.name + "的气色反倒好了几分。");
    } else if (drain > 0) {
      btLog("邪法擦身而过，气血 -" + drain + "。" + (bt.noLeech ? "他的邪祭断了源头，没能从你身上借到半分力。" : "破魔之力荡开阴气，他没能吸走多少。"));
    } else {
      btLog("你守得密不透风，邪法没能沾身。");
    }
  } else {
    var eDmg = Math.max(1, Math.round(bt.eBase / 7.5 * (0.8 + Math.random() * 0.4)));
    if (bt.intent === "xuli") eDmg = Math.round(eDmg * 1.8);   // 蓄力杀招未被打断
    if (bt.eXuShi) { eDmg = Math.round(eDmg * 1.3); bt.eXuShi = false; }
    if (playerDef) {
      eDmg = Math.floor(eDmg * 0.4) - Math.floor(defPow);
      eDmg = Math.max(0, eDmg);
      if (bt.defArt && artifactType(bt.defArt) === "兼") bt.eHp -= Math.floor(eDmg * 0.3);  // 反震（减伤后净值为基）
    }
    eDmg = Math.max(0, eDmg);
    bt.pHp -= eDmg;
    if (eDmg > 0 && b.sig === "chansha") { bt.poison = 2; btLog("水汽顺着伤口渗进来，你中了水毒。"); }
    if (playerDef && eDmg === 0) {
      btLog("你稳守门户，" + b.name + "这一轮攻势尽数落空。");
    } else if (playerDef) {
      btLog(b.name + "攻势被守势卸去大半，仍擦中一记，气血 -" + eDmg + "。");
    } else {
      var eHits = bt.intent === "xuli" ? [
        b.name + "的杀招轰然砸落，你整个人被掌风掀了出去，气血 -" + eDmg + "。",
        "蓄足的一击排山倒海，你硬接下来，五脏都在翻腾，气血 -" + eDmg + "。"
      ] : [
        b.name + "一掌拍来，你横身硬接，气血 -" + eDmg + "。",
        b.name + "攻势如潮，你且战且退，气血 -" + eDmg + "。",
        b.name + "抓住破绽，一记重击砸下，气血 -" + eDmg + "。",
        b.name + "欺身抢攻，你回防不及，气血 -" + eDmg + "。"
      ];
      btLog(eHits[rand(0, eHits.length - 1)]);
    }
    if (bt.pHp <= 0 && bt.mingXi) { bt.pHp = 1; bt.mingXi = false; btLog("续命灯芯爆出一团暖光，把你从鬼门关前拽了回来。"); }
  }
  bt.poMoThisRound = false;
  bt.lastIntent = bt.intent;
  if (bt.pHp <= 0) { endBattleLose(); return; }
  startBattleRound();
}

function endBattleWin() {
  var b = S.bt.spec, nearMiss = S.bt.pHp / S.bt.pHpMax < 0.2;
  S.restUntil = S.age + 2;   // 大战之后，缓两年
  S.stats = S.stats || {};   // 新开局 S.stats 缺省，先兜底再记功
  var gain = b.wuxue ? rand(b.wuxue[0], b.wuxue[1]) : rand(20, 50);
  S.cult += gain;
  S.stats.battleWins = (S.stats.battleWins || 0) + 1;
  if (nearMiss) { S.daoXin = (S.daoXin || 0) + 1; log("生死一线间，你只觉灵台一片空明——道心 +1。", "highlight"); if (typeof grantAchievement === "function") grantAchievement("daoxin_chucheng"); }
  if (S.stats.battleWins === 1 && typeof grantAchievement === "function") grantAchievement("shousheng");
  if (S.stats.battleWins >= 5 && typeof grantAchievement === "function") grantAchievement("wanrendi");
  log(b.winText + "（修为感悟 +" + gain + "）", "choice-result");
  applyEffect(b.winEffect);
  logDelta(b.winEffect);
  // 战斗余韵：同年追加一两条后续，让战后的日子有点滋味
  var AFTER_WIN = [
    "这一战很快传开，坊间的说书人又多了段谈资。",
    "回到洞府，你把这一战的得失在识海里反复过了几遍。",
    "你清点战果，把用不上的零碎物件转手换了一把灵石。"
  ];
  log(AFTER_WIN[rand(0, AFTER_WIN.length - 1)], "");
  if (Math.random() < 0.3) {
    var bonus = rand(10, 40);
    S.inv["灵石"] = (S.inv["灵石"] || 0) + bonus;
    log("有慕名者送来薄礼 " + bonus + " 灵石，说是贺你此战得胜。", "");
  }
  var rm = D.realms[S.realmIdx];
  S.bt = null; closeInteractive();
  if (rm && rm.need > 0 && S.cult >= rm.need) { renderRealm(); showBreakthrough(); return; }
  renderLifeAttrs(); renderRealm();
  if (S.alive) resumeTimer();
}

function endBattleLose() {
  var b = S.bt.spec, w = b.loseWeights || (b.tier === 1 ? [55, 30, 15] : b.tier === 2 ? [35, 40, 25] : [20, 40, 40]);
  S.restUntil = S.age + 2;
  var rr = Math.random() * 100, kind = rr < w[0] ? "light" : rr < w[0] + w[1] ? "heavy" : "death";
  S.bt = null; closeInteractive();
  if (kind === "death") { die(b.deathText); return; }
  if (kind === "light") {
    S.cult = Math.max(0, S.cult - 50);
    log(b.lightText + "（修为 -50）", "death");
    applyEffect(b.lightEffect);
    logDelta(b.lightEffect);
  } else {
    S.cult = Math.max(0, S.cult - 150);
    S.sanShangUntil = S.age + rand(1, 3);
    log(b.heavyText + "你需静养数年方能复原。（修为 -150）", "death");
    applyEffect(b.heavyEffect);
    logDelta(b.heavyEffect);
    // 法宝受创：重伤有代价，一件随身法宝灵光折半（坊市可修）
    if (S.artifacts.length && Math.random() < 0.5) {
      var da = S.artifacts[rand(0, S.artifacts.length - 1)];
      if (!da.damaged) {
        da.damaged = true;
        da.power = Math.max(1, Math.floor(da.power / 2));
        log("「" + da.name + "」替你挡了一记，灵光黯了大半（受创，战力减半，坊市可修）。", "death");
      }
    }
  }
  renderLifeAttrs(); renderRealm();
  var AFTER_LOSE = [
    "你敷上伤药，对着镜子苦笑：还是轻敌了。",
    "这一败传了出去，有人来慰问，也有人来探底。",
    "夜里你翻来覆去，把那一战的每个回合都想了一遍。"
  ];
  log(AFTER_LOSE[rand(0, AFTER_LOSE.length - 1)], "");
  if (S.alive) resumeTimer();
}

function endBattleFlee() {
  if (S.faction) S.faction.rep = Math.max(0, (S.faction.rep || 0) - 1);
  S.bt = null; closeInteractive();
  log("你且战且退，总算脱了身。这一退，少不得要被人说几句闲话。", "choice-result");
  S.restUntil = S.age + 2;
  if (S.alive) resumeTimer();
}

function endBattleJudge() {
  var bt = S.bt;
  var pR = bt.pHp / bt.pHpMax, eR = bt.eHp / bt.eHpMax;
  if (pR >= eR) endBattleWin(); else endBattleLose();
}

/* 法术传承发放（金丹期秘境深处）：未习得优先，全齐改灵石 100 */
function grantSpellTreasure() {
  var missing = D.spells.filter(function (s) { return S.spells.indexOf(s.id) < 0; });
  if (missing.length) {
    var sp = missing[rand(0, missing.length - 1)];
    grantSpell(sp.id);
  } else {
    S.inv["灵石"] = (S.inv["灵石"] || 0) + 100;
    log("传承玉简上的法术你尽数已会，转手卖了 100 块灵石。", "choice-result");
  }
}

/* =========================================================
 * 突破：筑基雷劫 / 结丹（心魔劫 + 雷劫三途）
 * ========================================================= */
function artifactBonus() {
  return artifactCount("灵器") * 0.05 + artifactCount("法宝") * 0.1;
}

function showBreakthrough() {
  S.waitingChoice = true;
  stopTimer();
  if (S.realmIdx === 1) { showHeartDemon(); return; }   // 结丹先过心魔劫
  if (S.realmIdx === 2) { showYingxin(); return; }      // 结婴先过心魔清算
  if (S.realmIdx === 3) { showHuashenGate(); return; }  // 化神先过夺天机资格关
  showZhuji();
}

function showZhuji() {
  var hasPill = (S.inv[BREAK_PILL] || 0) > 0;
  var hasTreasure = S.flags["灵髓"] && S.flags["地火莲"] && S.flags["天雷竹"];
  var bonus = artifactBonus();
  var opts = [];
  if (hasPill) {
    var pPill = Math.min(0.95, 0.9 + bonus);
    opts.push({ text: "天道筑基 · 服下筑基丹", sub: "筑基丹 -1 · 成功率 " + Math.round(pPill * 100) + "%", p: pPill, usePill: "筑基丹" });
  }
  if (hasTreasure) {
    var pTre = Math.min(0.95, 0.75 + bonus);
    opts.push({ text: "地道筑基 · 天材地宝护身", sub: "灵髓·地火莲·天雷竹 · 成功率 " + Math.round(pTre * 100) + "%", p: pTre });
  }
  var pHard = Math.min(0.95, 0.45 + S.attrs["灵根"] / 400 + S.attrs["气运"] / 500 + bonus);
  opts.push({ text: "人道筑基 · 硬撼雷劫", sub: "成功率 " + Math.round(pHard * 100) + "% · 失败退回 11 层", p: pHard });
  opts.push({ text: "再积蓄几年", sub: "暂缓突破，修为继续沉淀", p: -1 });

  var text = S.age + " 年 · 炼气十三层圆满，筑基雷劫已至！天上乌云翻涌，隐有雷光游走。如何渡劫？";
  $("choice-text").textContent = text;
  log(text, "highlight");
  showHints("筑基丹 灵髓 地火莲 天雷竹 灵器 法宝");
  renderOpts(opts, function (o) { resolveBreakthrough(o); });
}

/* 心魔强度：魔修/走火未愈加重，神识压制；clamp 5%–80% */
function heartDemonP() {
  var p = 0.30 + (S.flags["魔修"] ? 0.20 : 0) + (S.flags["走火未愈"] ? 0.15 : 0) - (S.attrs["神识"] || 0) * 0.002;
  return Math.max(0.05, Math.min(0.80, p));
}

/* ---------- 心魔三问：翻旧账 → 难题 → 判定 ----------
 * 道心 delta 藏于文案：答得越稳爆发风险越低，心虚则风险更高。
 */
var HEART_QUESTIONS = [
  { q: "若大道需斩情绝爱，你斩吗？", a: [
    { text: "斩", result: "「斩。」你答得太快了。心魔冷笑：「斩得动吗？」", delta: 3 },
    { text: "不斩", result: "「不斩。」你想了很久才答，答完心就静了。", delta: 6 },
    { text: "不知道", result: "「不知道。」心魔等的就是这三个字，它笑出了声。", delta: -4 }
  ] },
  { q: "凡人一生几十年，你在山里一坐也是几十年，图什么？", a: [
    { text: "图长生", result: "「图长生。」心魔反问：「长生那天，你又图什么？」你一时语塞。", delta: -2 },
    { text: "图个明白", result: "「图个明白。」心魔愣了一下，竟没接上话。", delta: 6 },
    { text: "不图什么", result: "「不图什么。」你耸耸肩：「就是想走，一直走下去。」", delta: 4 }
  ] },
  { q: "你攒下的灵石法宝，坐化那天一样带不走，值吗？", a: [
    { text: "值", result: "「值。」你答得干脆：「带不走，也是我一箱一箱攒的。」", delta: 5 },
    { text: "不值", result: "「不值。」话一出口你就皱眉了——心魔等的就是你的动摇。", delta: -4 },
    { text: "没想过", result: "「没想过。」你挠挠头。心魔被这答案噎了一下。", delta: 3 }
  ] },
  { q: "若现在就让你回村种地，娶妻生子，你去吗？", a: [
    { text: "去", result: "「去。」你说完自己先笑了：「骗你的。」心魔被耍了，很是不痛快。", delta: 4 },
    { text: "不去", result: "「不去。」你望着洞府外的云海：「种地的日子，我早就过够了。」", delta: 6 },
    { text: "犹豫", result: "你没有答。那两息沉默，被心魔死死咬住。", delta: -5 }
  ] },
  { q: "这一山门的人，你有几个真心相待？", a: [
    { text: "三两个", result: "「三两个。」心魔追问是谁，你一个一个名字报了出来。", delta: 5 },
    { text: "没有", result: "「没有。」心魔笑你孤家寡人，你淡淡道：「清净。」", delta: 2 },
    { text: "都是", result: "「都是。」心魔嗤笑一句假话，你也知道是假话。", delta: -4 }
  ] },
  { q: "死在你剑下的妖兽，也是有幼崽的。你手抖过吗？", a: [
    { text: "抖过", result: "「抖过。」你承认了，心里那块石头反而落了地。", delta: 6 },
    { text: "没有", result: "「没有。」你答得硬气，心魔却钻进了一丝缝。", delta: -3 },
    { text: "不答", result: "你不答。有些账，说给天听，不说给心魔听。", delta: 3 }
  ] },
  { q: "若结丹必成假丹，你还成吗？", a: [
    { text: "成", result: "「成。」你说：「假丹也是丹，往后的路往后再说。」", delta: 6 },
    { text: "不成", result: "「不成。」心魔笑了：「那你这些年在忙什么？」", delta: -5 },
    { text: "听天由命", result: "「听天由命。」心魔撇嘴：「没劲。」", delta: 1 }
  ] },
  { q: "你最怕的，是道消身死，还是一辈子籍籍无名？", a: [
    { text: "道消身死", result: "「怕死。」你答得坦然：「怕死，才活得仔细。」", delta: 4 },
    { text: "籍籍无名", result: "「怕籍籍无名。」心魔眯起眼：「好大的执念，好肥的养料。」", delta: -3 },
    { text: "都不怕", result: "「都不怕。」心魔盯了你半晌：「有点意思。」", delta: 5 }
  ] }
];

function showHeartDemon() {
  var p = heartDemonP();
  var text = S.age + " 年 · 筑基既已圆满，结丹之日近在眼前。然而丹成之前，心魔先至——识海深处，无数声音质问你这一生的选择。";
  $("choice-text").textContent = text;
  log(text, "highlight");
  showHints("神识 心魔 走火入魔");
  renderOpts([
    { text: "直面心魔", sub: "接受心魔三问（爆发风险 " + Math.round(p * 100) + "% 起，问心越稳风险越低）", hd: "face" },
    { text: "强行压下", sub: "爆发风险减半，但雷劫成功率 -10%", hd: "suppress" }
  ], function (o) {
    if (o.hd === "suppress") resolveHeartDemon(o, p);
    else heartTrialStart(p);
  });
}

/* 从心魔视角翻旧账：取一条本局真实的历史抉择 */
function pickOldChoice() {
  var cands = [];
  for (var i = 0; i < S.logs.length; i++) {
    var l = S.logs[i];
    if (l.c !== "choice-result") continue;
    var m = l.t.match(/^你选择了「[^」]+」/);
    if (!m) continue;
    if (/筑基|结丹|心魔|渡劫|雷劫/.test(l.t)) continue;   // 只滤突破类（不构成抉择），情感抉择放行翻账
    cands.push({ a: l.a, t: m[0] });
  }
  if (!cands.length) return null;
  return cands[rand(0, cands.length - 1)];
}

function heartTrialStart(p) {
  S.hd = { p: p, delta: 0 };
  var old = pickOldChoice();
  var accuse = old
    ? "心魔翻出旧账：「" + old.a + "岁，" + old.t + "——那时选的，你可曾后悔过？」"
    : "心魔翻出旧账：「这些年你做的那些选择，桩桩件件都在我这儿——你可曾后悔过？」";
  $("choice-text").textContent = "心魔一问 · " + accuse;
  log("心魔一问 · " + accuse, "");
  renderOpts([
    { text: "问心无愧", sub: "我选的路，我认", outcomes: [
      { weight: 7, result: "你答得斩钉截铁。心魔的影子晃了晃，淡下去一分。", delta: 8 },
      { weight: 3, result: "话一出口，你自己先晃了神。心魔狞笑着逼近一步。", delta: -6 }
    ] },
    { text: "坦然认错", sub: "错过的，认；欠下的，还", result: "你点点头：「那时年轻，欠的账我认。」心魔竟一时语塞。", delta: 4 }
  ], function (o) { heartTrialBeat(o, 1); });
}

function heartTrialBeat(o, beat) {
  var out = o;
  if (o.outcomes && o.outcomes.length) {
    var tw = 0;
    o.outcomes.forEach(function (x) { tw += (x.weight || 1); });
    var rr = Math.random() * tw;
    out = o.outcomes[o.outcomes.length - 1];
    for (var i = 0; i < o.outcomes.length; i++) {
      rr -= (o.outcomes[i].weight || 1);
      if (rr <= 0) { out = o.outcomes[i]; break; }
    }
  }
  S.hd.delta += (out.delta || 0);
  log("你选择了「" + o.text + "」。" + out.result, "choice-result");
  if (beat === 1) {
    // 第二问：心魔难题
    var q = HEART_QUESTIONS[rand(0, HEART_QUESTIONS.length - 1)];
    $("choice-text").textContent = "心魔二问 · 「" + q.q + "」";
    log("心魔二问 · 「" + q.q + "」", "");
    renderOpts(q.a.map(function (a) {
      return { text: a.text, result: a.result, delta: a.delta };
    }), function (o2) { heartTrialBeat(o2, 2); });
    return;
  }
  heartTrialFinal();
}

function heartTrialFinal() {
  var delta = S.hd.delta;
  var risk = Math.max(0.02, Math.min(0.9, S.hd.p - delta * 0.01));
  var feel = delta >= 8 ? "稳如磐石" : delta >= 3 ? "尚算稳固" : delta >= 0 ? "微微晃动" : "已现裂痕";
  var text = "心魔凝聚成形，做最后一扑——你的道心" + feel + "。（爆发风险 " + Math.round(risk * 100) + "%）";
  $("choice-text").textContent = "心魔三问 · " + text;
  log("心魔三问 · " + text, "");
  renderOpts([{ text: "渡这一劫", sub: "了断心魔，迎接雷劫" }], function () {
    $("choice-mask").classList.add("hidden");
  document.body.classList.remove("dialog-open");
    S.waitingChoice = false;
    if (Math.random() < risk) {
      var bk = S.realmIdx === 3 ? 3200 : S.realmIdx === 2 ? 3800 : 900;
      var bkName = S.realmIdx === 3 ? "化神" : S.realmIdx === 2 ? "结婴" : "结丹";
      S.cult = bk;
      S.flags["走火入魔"] = true;
      S.attrs["神识"] = clampAttr(S.attrs["神识"] - 10);
      log("心魔爆了。识海翻江倒海，你一口血喷在蒲团上——" + bkName + "失败，走火入魔（神识 -10，修为退回后期）。", "death");
      renderLifeAttrs();
      renderRealm();
      resumeTimer();
      return;
    }
    log("你睁开眼，泪流满面，灵台却前所未有的清明。心魔，散了。", "choice-result");
    if (S.realmIdx === 3) showHuashen(0); else if (S.realmIdx === 2) showYingjie(0); else showJiedan(0);
  });
}

/* 强压心魔：不问，带着风险硬闯 */
function resolveHeartDemon(o, p) {
  var risk = p / 2;
  if (Math.random() < risk) {
    $("choice-mask").classList.add("hidden");
  document.body.classList.remove("dialog-open");
    S.waitingChoice = false;
    S.cult = 900;
    S.flags["走火入魔"] = true;
    S.attrs["神识"] = clampAttr(S.attrs["神识"] - 10);
    log("心魔爆了。识海翻江倒海，你一口血喷在蒲团上——结丹失败，走火入魔（神识 -10，修为退回后期）。", "death");
    renderLifeAttrs();
    renderRealm();
    startTimer();
    return;
  }
  log("你把心魔狠狠压回识海深处。它还在，但暂时奈何不了你。", "choice-result");
  showJiedan(0.10);
}

function showJiedan(penalty) {
  S.waitingChoice = true;
  var adj = penalty || 0;
  var hasPill = (S.inv["结金丹"] || 0) > 0;
  var hasTreasure = S.flags["玄冰魄"] && S.flags["炎髓晶"] && S.flags["雷灵枝"];
  var bonus = artifactBonus();
  var opts = [];
  if (hasPill) {
    var pP = Math.max(0.05, Math.min(0.95, 0.85 + bonus - adj));
    opts.push({ text: "天道结丹 · 服下结金丹", sub: "结金丹 -1 · 一品金丹 · 成功率 " + Math.round(pP * 100) + "%", p: pP, usePill: "结金丹", grade: 1 });
  }
  if (hasTreasure) {
    var pT = Math.max(0.05, Math.min(0.95, 0.70 + bonus - adj));
    opts.push({ text: "地道结丹 · 三宝护身", sub: "玄冰魄·炎髓晶·雷灵枝 · 二品真丹 · 成功率 " + Math.round(pT * 100) + "%", p: pT, grade: 2 });
  }
  var pH = Math.max(0.05, Math.min(0.95, 0.40 + S.attrs["灵根"] / 400 + S.attrs["气运"] / 500 + bonus - adj));
  opts.push({ text: "人道结丹 · 硬撼雷劫", sub: "三品假丹 · 成功率 " + Math.round(pH * 100) + "% · 失败退回后期", p: pH, grade: 3 });
  opts.push({ text: "再积蓄几年", sub: "暂缓突破，修为继续沉淀", p: -1 });

  var text = S.age + " 年 · 心魔已过，结丹雷劫携九天之威压落！如何凝丹？";
  $("choice-text").textContent = text;
  log(text, "highlight");
  showHints("结金丹 玄冰魄 炎髓晶 雷灵枝 灵器 法宝");
  renderOpts(opts, function (o) { resolveBreakthrough(o); });
}

function resolveBreakthrough(o) {
  $("choice-mask").classList.add("hidden");
  document.body.classList.remove("dialog-open");
  S.waitingChoice = false;

  if (o.p < 0) {
    S.cult = S.realmIdx === 0 ? 640 : 1490;
    log("你压下躁动的真元，决定再沉淀几年。", "choice-result");
    resumeTimer();
    return;
  }
  if (o.usePill) S.inv[o.usePill] = clampInv(S.inv[o.usePill] - 1);

  if (Math.random() < o.p) {
    if (S.realmIdx === 0) {
      S.realmIdx = 1;
      S.cult = 0;
      S.flags["筑基"] = true;
      S.lifespan += 130;
      log("雷劫落尽，灵台一片澄明。筑基成功！寿元 +130，从此你才算真正踏入仙途。", "highlight");
      S.highlights.push(S.age + " 年，渡劫成功，踏入筑基期！");
      settleQiItems();
    } else {
      S.realmIdx = 2;
      S.cult = 0;
      S.flags["结丹"] = true;
      S.lifespan += 250;
      applyJindan(o.grade);
      // 结丹后强制发开府建牙邀约（宗门为默认路线）
      (S.queue = S.queue || []).push(S.flags["散修"] ? "jd_kaifu_s" : "jd_kaifu_z");
    }
    saveGame();
  } else {
    S.cult = S.realmIdx === 0 ? 495 : 900;
    S.attrs["根骨"] = clampAttr(S.attrs["根骨"] - 10);
    log("雷劫失控！你修为退回" + (S.realmIdx === 0 ? " 11 层" : "筑基后期") + "，经脉受损（根骨 -10）。", "death");
    if (Math.random() < (S.realmIdx === 0 ? 0.2 : 0.25)) {
      S.flags["走火入魔"] = true;
      S.attrs["神识"] = clampAttr(S.attrs["神识"] - 10);
      log("更糟的是，心魔趁虚而入——你走火入魔了（神识 -10）。", "death");
    }
  }
  renderLifeAttrs();
  renderRealm();
  resumeTimer();
}

/* 筑基成功一次性折算：聚气丹失效换灵石，筑基三宝融入道基 */
function settleQiItems() {
  var notes = [];
  if ((S.inv["聚气丹"] || 0) > 0) {
    var n = S.inv["聚气丹"];
    S.inv["聚气丹"] = 0;
    S.inv["灵石"] = (S.inv["灵石"] || 0) + n * 5;
    notes.push("炼气期的丹药对你已如糖丸，" + n + " 枚聚气丹换了 " + n * 5 + " 块灵石");
  }
  var mats = [];
  MAT_NAMES.forEach(function (m) { if (S.flags[m]) { delete S.flags[m]; mats.push(m); } });
  if (mats.length) {
    S.inv["灵石"] = (S.inv["灵石"] || 0) + mats.length * 30;
    notes.push(mats.join("·") + "，灵气已融入你的道基（每件折算灵石 30）");
  }
  if (notes.length) log(notes.join("；") + "。", "choice-result");
}

/* 金丹三品：一品全属性+8 / 二品三项+5 / 假丹两项+3+flag */
function applyJindan(grade) {
  if (grade === 1) {
    S.flags["一品金丹"] = true;
    ATTRS.forEach(function (a) { S.attrs[a] = clampAttr(S.attrs[a] + 8); });
    log("雷劫落尽，一颗浑圆金丹悬于丹田——一品金丹！全属性 +8，寿元 +250。", "highlight");
    S.highlights.push(S.age + " 年，天道结丹，一品金丹！");
  } else if (grade === 2) {
    ["灵根", "悟性", "神识"].forEach(function (a) { S.attrs[a] = clampAttr(S.attrs[a] + 5); });
    log("雷劫落尽，真丹凝就，道基前所未有的稳固。寿元 +250。", "highlight");
    S.highlights.push(S.age + " 年，地道结丹，真丹就此凝成。");
  } else {
    S.flags["假丹"] = true;
    ["灵根", "根骨"].forEach(function (a) { S.attrs[a] = clampAttr(S.attrs[a] + 3); });
    log("雷劫落尽，丹成却黯淡无光——是一颗假丹。寿元 +250，但你心里清楚，往后的路难了。", "highlight");
    S.highlights.push(S.age + " 年，硬闯雷劫，丹成只是假丹。");
  }
}

/* =========================================================
 * 旧宝处置：置换退役的法宝——换钱 / 送弟子 / 送兄弟
 * ========================================================= */
function showDisposal() {
  if (!S._disposal || !S._disposal.length) { if (S.alive) resumeTimer(); return; }
  var d = S._disposal[0];
  S.waitingChoice = true;
  stopTimer();
  var price = ({ "法器": 30, "灵器": 80, "法宝": 200 })[d.grade] || 30;
  var opts = [];
  opts.push({
    text: "换钱", sub: "灵石 +" + price, kind: "sell",
    fn: function () {
      S.inv["灵石"] = (S.inv["灵石"] || 0) + price;
      log("旧宝「" + d.name + "」在坊市卖了 " + price + " 块灵石。", "choice-result");
    }
  });
  if (S.faction && S.faction.dizi && S.faction.dizi.length) {
    opts.push({
      text: "送给门下弟子", sub: "声望 +1 · 弟子感念", kind: "dizi",
      fn: function () {
        var who = S.faction.dizi[rand(0, S.faction.dizi.length - 1)];
        S.faction.rep = (S.faction.rep || 0) + 1;
        log("你把「" + d.name + "」赏给了「" + who.name + "」。他捧着法宝，眼眶都红了。", "choice-result");
      }
    });
  }
  opts.push({
    text: "送给故交兄弟", sub: (S.renqing || 0) > 0 ? "还一份人情" : "灵石 +" + Math.floor(price / 2), kind: "bro",
    fn: function () {
      if ((S.renqing || 0) > 0) {
        S.renqing = Math.max(0, S.renqing - 1);
        S.stats.renqingPaid = (S.stats.renqingPaid || 0) + 1;
        if (S.stats.renqingPaid >= 3) grantAchievement("yibo");
        log("你把「" + d.name + "」送给当年赠你法宝的故交。他摩挲着法宝，只说了一句：够意思。", "choice-result");
      } else {
        var half = Math.floor(price / 2);
        S.inv["灵石"] = (S.inv["灵石"] || 0) + half;
        log("故交把「" + d.name + "」转手卖了，分你 " + half + " 灵石。", "choice-result");
      }
    }
  });
  var dReason = d.reason === "age" ? "「" + d.name + "」（" + d.grade + "）跟了你多年，如今灵性渐失，到了退役的时候。如何处置？" : "置换下来的旧宝「" + d.name + "」（" + d.grade + "）还搁在匣子里。如何处置？";
  $("choice-text").textContent = S.age + " 年 · " + dReason;
  log(dReason, "");
  renderOpts(opts, function (o) {
    S._disposal.shift();
    o.fn();
    closeInteractive();
    renderLifeAttrs();
    saveGame();
    if (S._disposal.length) {   // 连续弹窗：延迟一拍再开下一个，给玩家读上一段
      stopTimer();
      S.timer = window.setTimeout(function () { S.timer = null; showDisposal(); }, readPause());
    }
    else if (S.alive) resumeTimer();
  });
}

/* =========================================================
 * 结婴：心魔清算 + 无外物雷劫 + 碎丹重结
 * ========================================================= */
/* 心魔清算：恶行/走火未愈/丹毒硬扛全是结婴的债，神识对冲。
 * B3 参与度对冲（校准 2026-08-02）：斗法胜场/开府/道心是行走人间的印记，参与越深心魔越稳；
 * 纯打坐（不斗法、不开府、无积累）无对冲 → 风险显著上升。
 * 校准记录（2026-08-02 二校，修复过度调优）：
 *  - 一校基准 0.65 过激：sim 实测满配结婴 1~5/60、化神 0/60（原 7~9/60、2~3/60），正常玩家被过度压制。
 *  - 三校基准回落至 0.40：满配（battleWins 6~11、daoXin 7、开府）经对冲后 p 几乎全部 clamp 0.05（与基线同档，实测满配结婴与基线公式持平）；
 *    对照组（battleWins=0、无开府）零对冲，p ≈ 0.18~0.23，心魔爆发风险显著抬升（实测 0~1/10）。
 *  - 权重：斗法胜场为主项（正常玩家 vs 对照组的干净分野）；道心/开府为陪衬，权重压小防止对照组靠白捡项对冲。
 *  - evil/神识/魔修三项既有项系数一律不动。 */
function yingxinP() {
  var participation = Math.min(0.15, (S.daoXin || 0) * 0.01)
                    + Math.min(0.30, ((S.stats && S.stats.battleWins) || 0) * 0.02)
                    + (S.faction ? 0.05 : 0);
  var p = 0.40 + (S.evil || 0) * 0.03 + (S.flags["走火未愈"] ? 0.10 : 0)
        + (S.flags["丹毒硬扛"] ? 0.05 : 0) + (S.flags["魔修"] ? 0.10 : 0)
        - (S.attrs["神识"] || 0) * 0.002 - participation;
  return Math.max(0.05, Math.min(0.80, p));
}
function showYingxin() {
  var p = yingxinP();
  var text = S.age + " 年 · 金丹圆满，元婴之门近在眼前。然而碎丹之前，修行至今的旧账一齐涌上识海——心魔清算，到了。";
  $("choice-text").textContent = text;
  log(text, "highlight");
  renderOpts([
    { text: "直面清算", sub: "心魔三问（爆发风险 " + Math.round(p * 100) + "% 起，问心越稳越低）", hd: "face" },
    { text: "强行压下", sub: "爆发风险减半，但结婴雷劫成功率 -10%", hd: "suppress" }
  ], function (o) {
    if (o.hd === "suppress") {
      if (Math.random() < p / 2) { yingxinFail(); return; }
      log("你把旧账狠狠压回识海。它还在，但今日奈何不了你。", "choice-result");
      showYingjie(0.10);
    } else {
      heartTrialStart(p);   // 复用心魔三问；heartTrialFinal 通过后改调 showYingjie(0)
    }
  });
}
function yingxinFail() {
  $("choice-mask").classList.add("hidden");
  document.body.classList.remove("dialog-open");
  S.waitingChoice = false;
  S.cult = S.realmIdx === 3 ? 3200 : 3800;
  S.flags["走火入魔"] = true;
  S.attrs["神识"] = clampAttr(S.attrs["神识"] - 10);
  log(S.realmIdx === 3
    ? "心魔爆了。千年旧账一并翻起，你一口血喷在蒲团上——化神失败，走火入魔（神识 -10，修为退回后期）。"
    : "心魔爆了。百年旧账一并翻起，你一口血喷在蒲团上——结婴失败，走火入魔（神识 -10，修为退回后期）。", "death");
  renderLifeAttrs(); renderRealm();
  resumeTimer();
}

function showYingjie(penalty) {
  S.waitingChoice = true;
  var base = S.flags["重凝中"] ? 0.40 : S.flags["一品金丹"] ? 0.55 : S.flags["假丹"] ? 0.15 : 0.40;
  var p = base + Math.min(0.12, (S.attrs["神识"] || 0) * 0.001)
        + Math.min(0.20, (S.daoXin || 0) * 0.02) - (penalty || 0);
  p = Math.max(0.05, Math.min(0.90, p));
  var opts = [];
  opts.push({ text: "碎丹成婴 · 独抗雷劫", sub: "成功率 " + Math.round(p * 100) + "% · 无任何外物可傍身", p: p });
  if (S.flags["假丹"] && !S.flags["重凝中"] && (S.pindan || 0) < 2) {
    opts.push({ text: "碎丹重结 · 兵解假丹重凝", sub: "修为清空、虚弱数年，搏一颗真丹（已碎 " + (S.pindan || 0) + " 次）", p: -2 });
  }
  opts.push({ text: "再积蓄几年", sub: "暂缓突破，修为继续沉淀", p: -1 });
  var text = S.age + " 年 · 心魔已了，结婴雷劫携灭世之威压落！这一劫，丹药无用、法宝无功，能靠的只有你自己。如何渡劫？";
  $("choice-text").textContent = text;
  log(text, "highlight");
  renderOpts(opts, function (o) { resolveYingjie(o, p); });
}

/* =========================================================
 * 化神资格关：夺天机（20 文档：材料齐 + 宗门规模 或 孤狼借势/硬撼）
 * 流程：元婴圆满 → 资格检查 → 夺天机事件（前夜结算→决战）→ 胜出 → showHuashenXin
 * 失败不锁死：修为回退后期，百年后（cooldown）可再争
 * ========================================================= */
var HUASHEN_MATS = ["材料_天元果", "材料_九转地髓", "材料_元阳石", "材料_天雷竹芯"];

function huashenGateInfo() {
  var info = { ok: false, lack: [], scale: 0, ally: 0, favor: 0, deter: 0, reason: "" };
  // 材料：宗门供奉/指派任务收集，集齐才有资格
  info.lack = HUASHEN_MATS.filter(function (m) { return !S.flags[m]; });
  // 话语权资源：盟约/判过/镇过 flag 计数（夺天机加成）
  for (var k in S.flags) {
    if (k.indexOf("盟约") === 0) info.ally++;
    if (k.indexOf("判过") === 0) info.favor++;
    if (k.indexOf("镇过") === 0) info.deter++;
  }
  // 孤狼硬撼成功者（独行化神 flag）：直接有资格
  if (S.flags["独行化神"]) { info.ok = true; return info; }
  // 宗门规模：灵脉/弟子/声望三档
  var f = S.faction;
  if (f) {
    if ((f.spiritVeins || 0) >= 3) info.scale++;
    if ((f.disciples || 0) >= 8) info.scale++;
    if ((f.rep || 0) >= 4) info.scale++;
  }
  // 孤狼借势：客卿/客卿自立（依附主家）算两档——主家之势，非你所有，但可借
  if (S.flags["客卿"] || S.flags["客卿自立"]) info.scale += 2;
  if (info.lack.length === 0 && info.scale >= 3) info.ok = true;
  else if (info.lack.length === 0 && info.scale >= 2 && (S.flags["客卿"] || S.flags["客卿自立"])) info.ok = true;   // 借势可降门槛
  if (!info.ok) {
    if (info.lack.length) info.reason = "化神要抽一方天地元气，缺「" + info.lack.join("、") + "」——宗门还没为你收集齐全。";
    else if (!f && !S.flags["客卿"] && !S.flags["客卿自立"]) info.reason = "你环顾四周，满座皆是携宗而来，独你孤身一人。无宗门护持，天地元气反噬起来，你一个人接不住。";
    else info.reason = "宗门规模不够——灵脉、弟子、声望，得养到一方之雄的份量，才争得过别人。";
  }
  return info;
}

function showHuashenGate() {
  var info = huashenGateInfo();
  if (!info.ok) {
    $("choice-mask").classList.add("hidden");
    document.body.classList.remove("dialog-open");
    S.waitingChoice = false;
    S.cult = 4400;
    log(info.reason + "\n你压下躁动的真元，天地元气散回四方。先去把宗门养起来，把材料收齐。", "death");
    renderLifeAttrs(); renderRealm();
    resumeTimer();
    return;
  }
  // 夺天机前夜：话语权结算
  var allyTxt = info.ally ? "，" + info.ally + "位盟友当众站队" : "";
  var favorTxt = info.favor ? "，" + info.favor + "份旧日公道人情作保" : "";
  var deterTxt = info.deter ? "，" + info.deter + "宗被你平过的势力退避三舍" : "";
  var text = S.age + " 年 · 天地元气百年才聚一次，此刻倾泻在即。各宗元婴老祖齐聚，满座皆携宗而来。\n你盘坐阵心" + (allyTxt || "，无盟友站队") + (favorTxt || "，无人情作保") + (deterTxt || "，无威慑可用") + "。宗门为你开阵，天机，就在眼前。";
  $("choice-text").textContent = text;
  log(text, "highlight");
  var base = 0.30 + info.scale * 0.10;
  var bonus = info.ally * 0.04 + info.favor * 0.03 + info.deter * 0.04;
  var p = Math.min(0.85, base + bonus);
  if (S.flags["独行化神"]) { p = 1; }   // 硬撼已在天劫中搏过，直接放行
  renderOpts([
    { text: "争天机", sub: "成功率 " + Math.round(p * 100) + "% · 宗门护阵 + 外援站台", hd: "fight", p: p },
    { text: "再等一甲子", sub: "天地元气未复，避其锋芒", hd: "wait" }
  ], function (o) {
    if (o.hd === "wait") {
      $("choice-mask").classList.add("hidden");
      document.body.classList.remove("dialog-open");
      S.waitingChoice = false;
      S.cult = 4400;
      log("你望着那团翻涌的天地元气，终究没有出手。天机落入别家老祖之手，满座道贺声里，你转身下山。天地元气未复，百年之后还有下一回可争。", "choice-result");
      renderLifeAttrs(); renderRealm();
      resumeTimer();
      return;
    }
    if (Math.random() < o.p) {
      log("宗门护阵齐开，外援站台，天地元气如天河倒灌，尽数没入你的丹田。天机，到手了！", "highlight");
      S.flags["天机临身"] = true;
      showHuashenXin();
    } else {
      $("choice-mask").classList.add("hidden");
      document.body.classList.remove("dialog-open");
      S.waitingChoice = false;
      S.cult = 4400;
      log("阵眼崩裂，天地元气与你擦肩而过，落入邻宗老祖之手。你看着满座道贺声里的另一张脸，修为退回后期——天地元气未复，要等百年之后再来争。", "death");
      renderLifeAttrs(); renderRealm();
      resumeTimer();
    }
  });
}

function showHuashenXin() {
  var p = yingxinP();
  var text = S.age + " 年 · 元婴圆满，化神之门只在传说里。然而飞升之前，这一世千年的旧账一齐涌上识海——最后的心魔清算，到了。";
  $("choice-text").textContent = text;
  log(text, "highlight");
  renderOpts([
    { text: "直面清算", sub: "心魔三问（爆发风险 " + Math.round(p * 100) + "% 起，问心越稳越低）", hd: "face" },
    { text: "强行压下", sub: "爆发风险减半，但飞升雷劫成功率 -10%", hd: "suppress" }
  ], function (o) {
    if (o.hd === "suppress") {
      if (Math.random() < p / 2) { yingxinFail(); return; }
      log("你把旧账狠狠压回识海。它还在，但今日奈何不了你。", "choice-result");
      showHuashen(0.10);
    } else {
      heartTrialStart(p);   // 复用心魔三问；heartTrialFinal 通过后改调 showHuashen(0)
    }
  });
}

function showHuashen(penalty) {
  S.waitingChoice = true;
  var p = 0.40 + Math.min(0.15, (S.attrs["神识"] || 0) * 0.001)
        + Math.min(0.25, (S.daoXin || 0) * 0.02) - (penalty || 0);
  p = Math.max(0.05, Math.min(0.85, p));
  var opts = [
    { text: "独抗飞升雷劫", sub: "成功率 " + Math.round(p * 100) + "% · 千年修行，在此一举", p: p },
    { text: "再积淀几年", sub: "暂缓突破，修为继续沉淀", p: -1 }
  ];
  var text = S.age + " 年 · 心魔已了，飞升雷劫自九天之外压落！此劫一成，人间界顶点；此劫一败，千年道行付诸东流。如何渡劫？";
  $("choice-text").textContent = text;
  log(text, "highlight");
  renderOpts(opts, function (o) { resolveHuashen(o, p); });
}

function resolveHuashen(o, p) {
  $("choice-mask").classList.add("hidden");
  document.body.classList.remove("dialog-open");
  S.waitingChoice = false;
  if (o.p === -1) { S.cult = 4400; log("你压下躁动的真元，决定再积淀几年。", "choice-result"); resumeTimer(); return; }
  if (Math.random() < p) {
    S.realmIdx = 4;
    S.cult = 0;
    S.flags["化神"] = true;
    S.lifespan += 1000;
    S.winAt = S.age + rand(30, 50);
    grantAchievement("huashen");
    log("雷劫落尽，天门一线在你头顶开合。你立于人间界的顶点——化神！寿元 +1000。飞升台的风，已经开始吹了。", "highlight");
    S.highlights.push(S.age + " 年，化神登临，人间界顶点。");
    saveGame();
  } else {
    var rr = Math.random();
    if (rr < 0.25) { die("飞升雷劫第九重落下，你的元婴寸寸崩解，连同法相一起化作流光。时年 " + (S.age + STORY_BASE) + " 岁，兵解。"); return; }
    if (rr < 0.45) {
      S.flags["走火入魔"] = true;
      S.attrs["神识"] = clampAttr(S.attrs["神识"] - 10);
      S.cult = 3200;
      log("雷劫走岔，真元逆行——你走火入魔了（神识 -10，修为退回后期）。", "death");
    } else {
      S.cult = 1500;
      S.attrs["根骨"] = clampAttr(S.attrs["根骨"] - 10);
      S.lifespan -= 50;
      log("飞升雷劫失控！你真元大损，修为退回中期（根骨 -10，寿元 -50）。", "death");
    }
  }
  renderLifeAttrs(); renderRealm();
  resumeTimer();
}

function resolveYingjie(o, p) {
  $("choice-mask").classList.add("hidden");
  document.body.classList.remove("dialog-open");
  S.waitingChoice = false;
  if (o.p === -1) { S.cult = 5100; log("你压下躁动的真元，决定再沉淀几年。", "choice-result"); resumeTimer(); return; }
  if (o.p === -2) {   // 碎丹重结
    S.pindan = (S.pindan || 0) + 1;
    S.cult = 500;
    S.weakUntil = S.age + rand(3, 4) + (S.pindan - 1);
    delete S.flags["假丹"];
    S.flags["重凝中"] = true;
    log("你狠心震碎假丹！丹田一空，境界虽未跌，修为却付诸东流。虚弱数年，从头再凝——这一次，要颗真丹。", "death");
    renderLifeAttrs(); renderRealm(); resumeTimer(); return;
  }
  if (Math.random() < p) {
    var wasSuidan = !!S.flags["重凝中"];
    S.realmIdx = 3;
    S.cult = 0;
    S.flags["元婴"] = true;
    delete S.flags["重凝中"];
    S.lifespan += 500;
    grantAchievement("yuanying");
    if (wasSuidan) grantAchievement("suidan");
    log("雷劫落尽，金丹碎处，一个眉眼如你的小小婴孩盘坐丹田——元婴大成！寿元 +500。" + (wasSuidan ? "假丹之耻，一朝洗清。" : ""), "highlight");
    S.highlights.push(S.age + " 年，碎丹成婴，从此寿元千载。");
    saveGame();
  } else {
    var rr = Math.random();
    if (rr < 0.25) { die("雷劫第九重落下，你的金丹寸寸碎裂，连同肉身一起化作飞灰。时年 " + (S.age + STORY_BASE) + " 岁，兵解。"); return; }
    if (rr < 0.45) {
      S.flags["走火入魔"] = true;
      S.attrs["神识"] = clampAttr(S.attrs["神识"] - 10);
      S.cult = 3800;
      log("雷劫走岔，真元逆行——你走火入魔了（神识 -10，修为退回后期）。", "death");
    } else {
      S.cult = 500;
      S.attrs["根骨"] = clampAttr(S.attrs["根骨"] - 15);
      S.lifespan -= 30;
      S.flags["散功中"] = true;   // 散功有下文：sg_1/sg_2 两条叙事卡
      log("雷劫失控！你真元散尽，修为退回初期，根基大损（根骨 -15，寿元 -30）。", "death");
    }
  }
  renderLifeAttrs(); renderRealm();
  resumeTimer();
}
