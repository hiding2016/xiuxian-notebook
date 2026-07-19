/* 修仙记事本 · ui.js —— 视图层
 * 开局视图 / 修行页渲染 / 日志系统（全量存档 + DOM 窗口 + 渐进加载）。
 * 依赖 core.js；被 pop.js、loop.js 调用。
 */

/* =========================================================
 * 开局视图
 * ========================================================= */
var ATTR_HELP = {
  "灵根": "灵根：修仙的根基，直接决定修炼速度。灵根越高，每年修为增长越快，筑基雷劫的胜率也越高。",
  "悟性": "悟性：影响修炼速度与功法领悟。高悟性更容易顿悟、读懂高阶功法，还能加快修为增长。",
  "根骨": "根骨：体魄与寿元之本。根骨高则寿元更长、战斗历练更耐打；根骨过低可能道途早夭。",
  "气运": "气运：机缘之本。影响捡漏、赌石、坊市淘宝的运气，气运高的人常有意外之喜。",
  "神识": "神识：感知与心神。神识高能更好抵御心魔、降低走火入魔的风险。"
};

function renderAlloc() {
  var list = $("attr-list");
  list.innerHTML = "";
  ATTRS.forEach(function (name) {
    var row = document.createElement("div");
    row.className = "attr-row";
    var label = document.createElement("span");
    label.className = "attr-name";
    label.textContent = name;
    var help = document.createElement("button");
    help.className = "attr-help";
    help.type = "button";
    help.textContent = "?";
    help.setAttribute("data-help", name);
    var minus = document.createElement("button");
    minus.className = "attr-btn";
    minus.type = "button";
    minus.textContent = "−";
    minus.setAttribute("data-attr", name);
    minus.setAttribute("data-dir", "-1");
    var bar = document.createElement("div");
    bar.className = "attr-bar";
    var fill = document.createElement("div");
    fill.className = "attr-bar-fill";
    fill.id = "bar-" + name;
    bar.appendChild(fill);
    var val = document.createElement("span");
    val.className = "attr-val";
    val.id = "val-" + name;
    val.textContent = alloc[name];
    var plus = document.createElement("button");
    plus.className = "attr-btn";
    plus.type = "button";
    plus.textContent = "+";
    plus.setAttribute("data-attr", name);
    plus.setAttribute("data-dir", "1");
    row.appendChild(label);
    row.appendChild(help);
    row.appendChild(minus);
    row.appendChild(bar);
    row.appendChild(val);
    row.appendChild(plus);
    var desc = document.createElement("div");
    desc.className = "attr-desc hidden";
    desc.id = "desc-" + name;
    desc.textContent = ATTR_HELP[name];
    list.appendChild(row);
    list.appendChild(desc);
  });
  refreshAllocUI();
}

function allocUsed() {
  var sum = 0;
  ATTRS.forEach(function (n) { sum += alloc[n]; });
  return sum;
}

function refreshAllocUI() {
  var left = TOTAL - allocUsed();
  $("points-left").textContent = left;
  ATTRS.forEach(function (n) {
    $("val-" + n).textContent = alloc[n];
    $("bar-" + n).style.width = (alloc[n] / D.maxAttr * 100) + "%";
  });
  $("btn-start").disabled = !(left === 0 && talent);
}

function rollTalent() {
  if (rollsLeft <= 0) return;
  talent = D.talents[rand(0, D.talents.length - 1)];
  rollsLeft--;
  $("talent-card").classList.remove("empty");
  $("talent-name").textContent = talent.name;
  $("talent-desc").textContent = talent.desc;
  $("btn-roll-talent").textContent = rollsLeft > 0 ? "重测（剩 " + rollsLeft + " 次）" : "机缘已定";
  $("btn-roll-talent").disabled = rollsLeft <= 0;
  refreshAllocUI();
}

function randomAlloc() {
  ATTRS.forEach(function (n) { alloc[n] = 0; });
  var left = TOTAL;
  while (left >= STEP) {
    var n = ATTRS[rand(0, ATTRS.length - 1)];
    if (alloc[n] < D.maxAttr) { alloc[n] += STEP; left -= STEP; }
  }
  refreshAllocUI();
}

function renderPastLife() {
  try {
    var raw = window.localStorage.getItem(LAST_KEY);
    if (raw) {
      var p = JSON.parse(raw);
      $("past-life").classList.remove("hidden");
      $("past-life-body").textContent =
        "走过 " + (p.age + STORY_BASE) + " 载 ·「" + p.title + "」· 机缘 " + p.talent;
    }
  } catch (e) { /* 数据损坏则忽略 */ }
  var sv = loadSave();
  var btn = $("btn-continue");
  // v1 通关档（筑基·功成名就）v2 可从筑基期继续；结丹通关档暂封顶
  var canContinue = sv && typeof sv.age === "number" &&
    (!(sv.flags && sv.flags["功成名就"]) || sv.realmIdx === 1);
  if (canContinue) {
    btn.classList.remove("hidden");
    btn.textContent = "继续修行（" + (sv.age + STORY_BASE) + " 岁 · " +
      (sv.realmIdx >= 2 ? "结丹期" : sv.realmIdx === 1 ? "筑基期" : "炼气期") + "）";
  } else {
    btn.classList.add("hidden");
  }
}

/* =========================================================
 * 开局 / 读档
 * ========================================================= */
function newGame() {
  var attrs = {};
  ATTRS.forEach(function (n) { attrs[n] = clampAttr(alloc[n]); });
  if (talent.effect && talent.effect.attrs) {
    for (var k in talent.effect.attrs) {
      attrs[k] = clampAttr((attrs[k] || 0) + talent.effect.attrs[k]);
    }
  }
  var flags = {};
  if (talent.effect && talent.effect.flag) flags[talent.effect.flag] = true;
  var inv = { "灵石": 10, "聚气丹": 0, "筑基丹": 0 };
  if (talent.effect && talent.effect.inv) {
    for (var m in talent.effect.inv) inv[m] = clampInv((inv[m] || 0) + talent.effect.inv[m]);
  }
  S = {
    attrs: attrs, flags: flags, inv: inv,
    gongfa: 0, artifacts: [],
    age: -1, cult: 0, realmIdx: 0, winAt: 0,
    lifespan: Math.round(D.lifespanBase + attrs["根骨"] * 0.2 + rand(0, 10)),
    alive: true, used: {}, cooldowns: {}, chains: {}, lastChoiceAge: -99,
    highlights: [], paused: false, waitingChoice: false,
    timer: null, pendingChoice: null,
    danUsed: 0, danStopUntil: 0, dgCd: {},
    logs: [], domIdx: {}
  };
  if (talent.effect && talent.effect.artifact) {
    for (var g in talent.effect.artifact) {
      for (var ai = 0; ai < talent.effect.artifact[g]; ai++) grantArtifact(g);
    }
    S._lastArts = null;
  }
  clearSave();
}

function continueGame(sv) {
  talent = null;
  for (var i = 0; i < D.talents.length; i++) {
    if (D.talents[i].id === sv.talentId) { talent = D.talents[i]; break; }
  }
  var used = {};
  (sv.used || []).forEach(function (id) { used[id] = true; });
  S = {
    attrs: sv.attrs || {}, flags: sv.flags || {},
    inv: sv.inv || { "灵石": 0, "聚气丹": 0, "筑基丹": 0 },
    gongfa: sv.gongfa || 0,
    artifacts: sv.artifacts || [],
    age: sv.age, cult: sv.cult || 0, realmIdx: sv.realmIdx || 0, winAt: sv.winAt || 0,
    lifespan: sv.lifespan || 120,
    alive: true, used: used,
    cooldowns: sv.cooldowns || {}, chains: sv.chains || {},
    lastChoiceAge: sv.lastChoiceAge !== undefined ? sv.lastChoiceAge : -99,
    highlights: sv.highlights || [], paused: false, waitingChoice: false,
    timer: null, pendingChoice: null,
    danUsed: sv.danUsed || 0, danStopUntil: sv.danStopUntil || 0, dgCd: sv.dgCd || {},
    logs: sv.logs || [], domIdx: {}
  };
  // v1 通关档：清「功成名就」与 winAt，从筑基期继续修行
  if (S.flags["功成名就"] && S.realmIdx === 1) {
    delete S.flags["功成名就"];
    S.winAt = 0;
  }
}

/* =========================================================
 * 修行页渲染
 * ========================================================= */
var SPEEDS = [1400, 700, 350];
var speedIdx = 0;

function renderLifeAttrs() {
  var box = $("life-attrs");
  box.innerHTML = "";
  ATTRS.forEach(function (n) {
    var chip = document.createElement("span");
    chip.className = "life-attr";
    chip.innerHTML = n + " <b>" + S.attrs[n] + "</b>";
    box.appendChild(chip);
  });
  var ibox = $("life-inv");
  ibox.innerHTML = "";
  var combat = document.createElement("span");
  combat.className = "life-attr combat";
  combat.innerHTML = "战力 <b>" + computeCombat() + "</b>";
  ibox.appendChild(combat);
  var money = document.createElement("span");
  money.className = "life-attr inv";
  money.innerHTML = "灵石 <b>" + fmtNum(S.inv["灵石"] || 0) + "</b>";
  ibox.appendChild(money);
  var gf = document.createElement("span");
  gf.className = "life-attr inv";
  gf.innerHTML = "功法 <b>" + GONGFA_NAMES[S.gongfa] + "</b>";
  ibox.appendChild(gf);
  renderBackpack();
}

function renderBackpack() {
  var box = $("life-bp");
  box.innerHTML = "";
  var used = bpSlotsUsed();
  var label = document.createElement("span");
  label.className = "bp-label";
  label.textContent = "背包 " + used + "/" + BP_CAP;
  box.appendChild(label);
  PILL_SLOTS.forEach(function (n) {
    if ((S.inv[n] || 0) <= 0) return;
    var chip = document.createElement("span");
    chip.className = "bp-slot";
    chip.textContent = n + "×" + fmtNum(S.inv[n]);
    box.appendChild(chip);
  });
  MAT_NAMES.concat(MAT2_NAMES).forEach(function (n) {
    if (!S.flags[n]) return;
    var chip = document.createElement("span");
    chip.className = "bp-slot bp-mat";
    chip.textContent = n;
    chip.title = "天材地宝（不占背包格）";
    box.appendChild(chip);
  });
  S.artifacts.forEach(function (a) {
    var chip = document.createElement("span");
    chip.className = "bp-slot bp-art grade-" + a.grade;
    chip.textContent = a.name;
    chip.title = a.grade + " · 战力 +" + a.power;
    box.appendChild(chip);
  });
  var empty = BP_CAP - used;
  for (var i = 0; i < empty && i < 6; i++) {
    var slot = document.createElement("span");
    slot.className = "bp-slot empty";
    slot.textContent = "空";
    box.appendChild(slot);
  }
}

function renderRealm() {
  var R = (D.realms || [])[S.realmIdx];
  if (!R || R.need <= 0) {
    $("realm-name").textContent = (R ? R.name : "筑基") + "期";
    $("cult-num").textContent = "圆满";
    $("cult-fill").style.width = "100%";
    return;
  }
  if (S.realmIdx === 0) {
    var li = layerInfo();
    $("realm-name").textContent = "炼气·" + li.layer + "层";
    $("cult-num").textContent = li.cur + "/" + li.need;
    $("cult-fill").style.width = Math.min(100, li.cur / li.need * 100) + "%";
    return;
  }
  // 筑基期：初/中/后三段
  var st = R.stages, cur = st[0], next = R.need;
  for (var i = 0; i < st.length; i++) {
    if (S.cult >= st[i][1]) {
      cur = st[i];
      next = (i + 1 < st.length) ? st[i + 1][1] : R.need;
    }
  }
  $("realm-name").textContent = R.name + "·" + cur[0];
  $("cult-num").textContent = (S.cult - cur[1]) + "/" + (next - cur[1]);
  $("cult-fill").style.width = Math.min(100, (S.cult - cur[1]) / (next - cur[1]) * 100) + "%";
}

/* =========================================================
 * 日志系统：全量入库存档 + 倒序 DOM 窗口 + 渐进加载
 * S.logs 全量持久化（存档字段）；DOM 中**新条目置顶**——底部弹卡遮挡的
 * 永远是最旧的条目，最新剧情始终可见；highlight/death 重要节点截断时优先保留；
 * 底部「查看更早」渐进加载旧条目。
 * ========================================================= */
var LOG_DOM_KEEP = 300;
var LOG_LOAD_STEP = 100;
var LOG_WINDOW = 150;   // 进视图时首次渲染条数

function buildLogItem(entry, li) {
  var item = document.createElement("div");
  item.className = "log-item" + (entry.c ? " " + entry.c : "");
  item.setAttribute("data-li", li);
  if (entry.p) item.setAttribute("data-pin", "1");
  var age = document.createElement("span");
  age.className = "log-age";
  age.textContent = entry.a + "岁";
  item.appendChild(age);
  item.appendChild(document.createTextNode(entry.t));
  return item;
}

function trimLogDom() {
  var box = $("life-log");
  for (var pass = 0; pass < 2; pass++) {
    var kids = box.querySelectorAll(".log-item");
    var excess = kids.length - LOG_DOM_KEEP;
    if (excess <= 0) return;
    for (var i = kids.length - 1; i >= 0 && excess > 0; i--) {   // 从底部（最旧）清起
      var el = kids[i];
      if (pass === 0 && el.getAttribute("data-pin") === "1") continue;  // 先清普通条目
      box.removeChild(el);
      delete S.domIdx[el.getAttribute("data-li")];
      excess--;
    }
  }
}

function updateLoadMoreBtn() {
  var btn = $("log-more");
  if (btn) btn.classList.toggle("hidden", !!S.domIdx[0]);
}

function loadOlderLogs() {
  var box = $("life-log");
  var min = -1;
  for (var k in S.domIdx) { var ki = +k; if (min === -1 || ki < min) min = ki; }
  if (min <= 0) { updateLoadMoreBtn(); return; }
  var btn = $("log-more");
  var from = Math.max(0, min - LOG_LOAD_STEP);
  for (var i = min - 1; i >= from; i--) {   // 旧条目向底部追加，保持新在上
    if (S.domIdx[i]) continue;
    box.insertBefore(buildLogItem(S.logs[i], i), btn);
    S.domIdx[i] = 1;
  }
  updateLoadMoreBtn();
}

function renderLogWindow() {
  var box = $("life-log");
  box.innerHTML = "";
  S.domIdx = {};
  var from = Math.max(0, S.logs.length - LOG_WINDOW);
  for (var i = S.logs.length - 1; i >= from; i--) {   // 新的在前
    box.appendChild(buildLogItem(S.logs[i], i));
    S.domIdx[i] = 1;
  }
  var btn = document.createElement("button");
  btn.id = "log-more";
  btn.className = "log-more hidden";
  btn.type = "button";
  btn.textContent = "查看更早的修行";
  btn.addEventListener("click", loadOlderLogs);
  box.appendChild(btn);   // 按钮沉底：更早的条目在下方
  updateLoadMoreBtn();
  box.scrollTop = 0;   // 顶部即最新
}

function appendLog(item) {
  var box = $("life-log");
  box.insertBefore(item, box.firstChild);   // 新条目置顶
  trimLogDom();
}

function log(text, cls) {
  var li = S.logs.length;
  S.logs.push({ t: text, c: cls || "", a: S.age + STORY_BASE, p: (cls === "highlight" || cls === "death") ? 1 : 0 });
  S.domIdx[li] = 1;
  appendLog(buildLogItem(S.logs[li], li));
  updateLoadMoreBtn();
}

function logDelta(effect) {
  if (!effect) return;
  var parts = [];
  var k;
  if (effect.attrs) for (k in effect.attrs) {
    var v = effect.attrs[k];
    parts.push(k + (v > 0 ? " +" + v : " " + v));
  }
  if (effect.inv) for (k in effect.inv) {
    var w = effect.inv[k];
    if (w !== 0) parts.push(k + (w > 0 ? " +" + w : " " + w));
  }
  if (effect.gongfa) parts.push("功法 +" + effect.gongfa + " 阶");
  if (effect.artifact) for (k in effect.artifact) {
    parts.push(k + " +" + effect.artifact[k]);
  }
  if (S._lastArts && S._lastArts.length) {
    parts.push("获得「" + S._lastArts.join("」「") + "」");
    S._lastArts = null;
  }
  if (!parts.length) return;
  var li = S.logs.length;
  S.logs.push({ t: "↳ " + parts.join(" · "), c: "delta", a: S.age + STORY_BASE, p: 0 });
  S.domIdx[li] = 1;
  appendLog(buildLogItem(S.logs[li], li));
}
