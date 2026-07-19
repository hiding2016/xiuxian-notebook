/* 修仙记事本 · pop.js —— 互动弹窗层
 * 事件触发 / 抉择 / 拍卖 / 火候 / 突破（筑基·结丹两阶段）/ 秘境副本。
 * 依赖 core.js、ui.js。
 */

function fireEvent(e) {
  if (e.dungeon) { enterDungeon(e); return; }   // 秘境入口：完成时才标 used
  S.used[e.id] = true;
  S.cooldowns[e.id] = S.age;
  if (e.chain) S.chains[e.chain] = S.age;
  if (e.auction) { S.lastChoiceAge = S.age; showAuction(e); return; }
  if (e.timing) { S.lastChoiceAge = S.age; showTiming(e); return; }
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
  if (e.highlight) S.highlights.push(S.age + " 年，" + e.text);
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
    btn.textContent = o.text;
    if (o.sub) {
      var small = document.createElement("small");
      small.textContent = o.sub;
      btn.appendChild(small);
    }
    btn.addEventListener("click", function () { onPick(o); });
    box.appendChild(btn);
  });
  $("choice-mask").classList.remove("hidden");
}

/* ---------- 抉择弹窗 ---------- */
function showChoice(e, opts) {
  S.waitingChoice = true;
  S.pendingChoice = e;
  $("choice-text").textContent = S.age + " 年 · " + e.text;
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
  $("choice-mask").classList.remove("hidden");
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
  $("choice-mask").classList.add("hidden");
  S.waitingChoice = false;
  S.pendingChoice = null;
  log("你选择了「" + c.text + "」。" + c.result, "choice-result");
  applyEffect(c.effect);
  logDelta(c.effect);
  if (e.highlight) S.highlights.push(S.age + " 年，" + e.text + "——你选择了「" + c.text + "」");
  if (S.alive) startTimer();
}

/* ---------- 拍卖会 ---------- */
function showAuction(e) {
  S.waitingChoice = true;
  S.pendingChoice = e;
  stopTimer();
  S.auction = { bid: e.auction.base, top: "none", rounds: 0 };
  log(e.text, "");
  $("choice-mask").classList.remove("hidden");
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
  if (S.alive) startTimer();
}

function auctionLose() {
  var e = S.pendingChoice;
  closeInteractive();
  log(e.auction.loseText, "choice-result");
  if (S.alive) startTimer();
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
  $("choice-mask").classList.remove("hidden");
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
  if (S.alive) startTimer();
}

function closeInteractive() {
  $("choice-mask").classList.add("hidden");
  $("choice-minilog").classList.add("hidden");
  S.waitingChoice = false;
  S.pendingChoice = null;
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
  $("choice-text").textContent = "【" + d.name + " · 第" + (S.dg.depth + 1) + "层】" + node.text;
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
  if (!out.sanbao && S.dg.depth >= 2 && Math.random() < 0.5) grantSanbao();
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
  if (S.alive) startTimer();
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
 * 突破：筑基雷劫 / 结丹（心魔劫 + 雷劫三途）
 * ========================================================= */
function artifactBonus() {
  return artifactCount("灵器") * 0.05 + artifactCount("法宝") * 0.1;
}

function showBreakthrough() {
  S.waitingChoice = true;
  stopTimer();
  if (S.realmIdx === 1) { showHeartDemon(); return; }  // 结丹先过心魔劫
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
    if (/筑基|结丹|心魔|渡劫|雷劫|秘境|停药|硬扛|竞价|加价/.test(l.t)) continue;
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
    S.waitingChoice = false;
    if (Math.random() < risk) {
      S.cult = 900;
      S.flags["走火入魔"] = true;
      S.attrs["神识"] = clampAttr(S.attrs["神识"] - 10);
      log("心魔爆了。识海翻江倒海，你一口血喷在蒲团上——结丹失败，走火入魔（神识 -10，修为退回后期）。", "death");
      renderLifeAttrs();
      renderRealm();
      startTimer();
      return;
    }
    log("你睁开眼，泪流满面，灵台却前所未有的清明。心魔，散了。", "choice-result");
    showJiedan(0);
  });
}

/* 强压心魔：不问，带着风险硬闯 */
function resolveHeartDemon(o, p) {
  var risk = p / 2;
  if (Math.random() < risk) {
    $("choice-mask").classList.add("hidden");
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
  S.waitingChoice = false;

  if (o.p < 0) {
    S.cult = S.realmIdx === 0 ? 640 : 1490;
    log("你压下躁动的真元，决定再沉淀几年。", "choice-result");
    startTimer();
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
      S.winAt = S.age + rand(2, 4);
      applyJindan(o.grade);
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
  startTimer();
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
