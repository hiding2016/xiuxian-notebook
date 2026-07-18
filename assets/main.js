/* 修仙记事本 · 引擎 v1.1（炼气 13 层 → 筑基，财侣法地，慢节奏）
 * 存档：localStorage "xiuxian_save_v1"，字段只增不删，v2 可从本存档继续。
 */
(function () {
  "use strict";

  var D = window.GAME_DATA;
  var ATTRS = D.attrs;
  var TOTAL = D.totalPoints;
  var STEP = 10;
  var GONGFA_NAMES = ["黄阶", "玄阶", "地阶", "天阶"];
  var ART_NAMES = ["法器", "灵器", "法宝"];
  var ART_POOL = {
    "法器": ["青钢剑", "流云剑", "玄铁刀", "破煞枪", "寒铁鞭"],
    "灵器": ["玄龟盾", "雷光镜", "摄魂铃", "流萤扇"],
    "法宝": ["镇山印", "混元珠", "太虚镜"]
  };
  var ART_POWER = { "法器": 10, "灵器": 25, "法宝": 50 };
  var BP_CAP = 12;   // 背包格子上限
  var MAT_NAMES = ["灵髓", "地火莲", "天雷竹"];  // 地道筑基材料
  var CULT_FULL = 650;              // 炼气 13 层圆满修为
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
        talentId: talent ? talent.id : null
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

  /* ---------- 法宝与战力 ---------- */
  function artifactCount(grade) {
    var n = 0;
    S.artifacts.forEach(function (a) { if (a.grade === grade) n++; });
    return n;
  }

  function bpSlotsUsed() {
    var n = S.artifacts.length;
    ["聚气丹", "筑基丹", "符咒"].forEach(function (k) {
      if ((S.inv[k] || 0) > 0) n++;
    });
    MAT_NAMES.forEach(function (k) { if (S.flags[k]) n++; });
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
    if (sv && typeof sv.age === "number" && !(sv.flags && sv.flags["功成名就"])) {
      btn.classList.remove("hidden");
      btn.textContent = "继续修行（" + (sv.age + STORY_BASE) + " 岁 · " +
        (sv.realmIdx > 0 ? "筑基期" : "炼气期") + "）";
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
      timer: null, pendingChoice: null
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
      timer: null, pendingChoice: null
    };
  }

  /* =========================================================
   * 渲染
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
    ["灵石", "聚气丹", "筑基丹", "符咒"].forEach(function (n) {
      var chip = document.createElement("span");
      chip.className = "life-attr inv";
      chip.innerHTML = n + " <b>" + (S.inv[n] || 0) + "</b>";
      ibox.appendChild(chip);
    });
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
    ["聚气丹", "筑基丹", "符咒"].forEach(function (n) {
      if ((S.inv[n] || 0) <= 0) return;
      var chip = document.createElement("span");
      chip.className = "bp-slot";
      chip.textContent = n + "×" + S.inv[n];
      box.appendChild(chip);
    });
    MAT_NAMES.forEach(function (n) {
      if (!S.flags[n]) return;
      var chip = document.createElement("span");
      chip.className = "bp-slot bp-mat";
      chip.textContent = n;
      chip.title = "地道筑基材料";
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
    if (S.realmIdx > 0) {
      $("realm-name").textContent = "筑基期";
      $("cult-num").textContent = "圆满";
      $("cult-fill").style.width = "100%";
      return;
    }
    var li = layerInfo();
    $("realm-name").textContent = "炼气·" + li.layer + "层";
    $("cult-num").textContent = li.cur + "/" + li.need;
    $("cult-fill").style.width = Math.min(100, li.cur / li.need * 100) + "%";
  }

  function log(text, cls) {
    var box = $("life-log");
    var item = document.createElement("div");
    item.className = "log-item" + (cls ? " " + cls : "");
    var age = document.createElement("span");
    age.className = "log-age";
    age.textContent = (S.age + STORY_BASE) + "岁";
    item.appendChild(age);
    item.appendChild(document.createTextNode(text));
    box.appendChild(item);
    box.scrollTop = box.scrollHeight;
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
    var box = $("life-log");
    var item = document.createElement("div");
    item.className = "log-item delta";
    item.textContent = "↳ " + parts.join(" · ");
    box.appendChild(item);
    box.scrollTop = box.scrollHeight;
  }

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
   * 事件系统：年份槽位 + 分层 + 链式 + 冷却
   * ========================================================= */
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
    // 筑基后：仅触发标注筑基条件的事件
    if (S.flags["筑基"] && !(e.cond && e.cond.flag === "筑基")) return false;
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

  function fireEvent(e) {
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
    div.textContent = hints.join("\u3000");
    var btns = $("choice-btns");
    btns.parentNode.insertBefore(div, btns);
  }

  /* ---------- 抉择弹窗 ---------- */
  function showChoice(e, opts) {
    S.waitingChoice = true;
    S.pendingChoice = e;
    $("choice-text").textContent = S.age + " 年 · " + e.text;
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
    log(e.text, e.highlight ? "highlight" : "");
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
    $("choice-mask").classList.remove("hidden");
    showHints(e.text + " " + e.auction.item);
    renderAuction();
  }

  function renderAuction() {
    var e = S.pendingChoice, st = S.auction;
    var lead = st.top === "you" ? "你领先" : (st.top === "rival" ? "对手领先" : "底价待出");
    $("choice-text").textContent = S.age + " 年 · " + e.text +
      " 〔" + e.auction.item + "｜当前价 " + st.bid + " 灵石｜" + lead +
      "｜你有 " + (S.inv["灵石"] || 0) + " 灵石〕";
    var box = $("choice-btns");
    box.innerHTML = "";
    [10, 20].forEach(function (inc) {
      var btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.type = "button";
      btn.textContent = "加价 " + inc + " 灵石";
      var small = document.createElement("small");
      small.textContent = "出价到 " + (st.bid + inc) + " 灵石";
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
    log(e.text, "highlight");
    log("槌落！你以 " + st.bid + " 灵石拍得「" + e.auction.item + "」。" + e.auction.winText, "choice-result");
    applyEffect(e.auction.effect);
    logDelta(e.auction.effect);
    if (e.highlight) S.highlights.push(S.age + " 年，拍卖会上一掷千金，拍得「" + e.auction.item + "」。");
    if (S.alive) startTimer();
  }

  function auctionLose() {
    var e = S.pendingChoice;
    closeInteractive();
    log(e.text, "");
    log(e.auction.loseText, "choice-result");
    if (S.alive) startTimer();
  }

  /* ---------- 时机操作（炼丹火候等） ---------- */
  function showTiming(e) {
    S.waitingChoice = true;
    S.pendingChoice = e;
    stopTimer();
    $("choice-text").textContent = S.age + " 年 · " + e.text;
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
    log(e.text, "");
    log(o.result, "choice-result");
    applyEffect(o.effect);
    logDelta(o.effect);
    if (S.alive) startTimer();
  }

  function closeInteractive() {
    $("choice-mask").classList.add("hidden");
    S.waitingChoice = false;
    S.pendingChoice = null;
  }

  /* ---------- 筑基雷劫 ---------- */
  function artifactBonus() {
    return artifactCount("灵器") * 0.05 + artifactCount("法宝") * 0.1;
  }

  function showBreakthrough() {
    S.waitingChoice = true;
    stopTimer();
    var hasPill = (S.inv[BREAK_PILL] || 0) > 0;
    var hasTreasure = S.flags["灵髓"] && S.flags["地火莲"] && S.flags["天雷竹"];
    var bonus = artifactBonus();
    var pHard = Math.min(0.95, 0.45 + S.attrs["灵根"] / 400 + S.attrs["气运"] / 500 + bonus);
    var opts = [];
    if (hasPill) {
      opts.push({ text: "天道筑基 · 服下筑基丹", sub: "筑基丹 -1 · 成功率 " + Math.round(Math.min(0.95, 0.9 + bonus) * 100) + "%", p: Math.min(0.95, 0.9 + bonus), usePill: true });
    }
    if (hasTreasure) {
      opts.push({ text: "地道筑基 · 天材地宝护身", sub: "灵髓·地火莲·天雷竹 · 成功率 " + Math.round(Math.min(0.95, 0.75 + bonus) * 100) + "%", p: Math.min(0.95, 0.75 + bonus), usePill: false });
    }
    opts.push({ text: "人道筑基 · 硬撼雷劫", sub: "成功率 " + Math.round(pHard * 100) + "% · 失败退回 11 层", p: pHard, usePill: false });
    opts.push({ text: "再积蓄几年", sub: "暂缓突破，修为继续沉淀", p: -1, usePill: false });

    $("choice-text").textContent = S.age + " 年 · 炼气十三层圆满，筑基雷劫已至！天上乌云翻涌，雷光隐现。如何渡劫？";
    showHints("筑基丹 灵髓 地火莲 天雷竹 灵器 法宝");
    var box = $("choice-btns");
    box.innerHTML = "";
    opts.forEach(function (o) {
      var btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.type = "button";
      btn.textContent = o.text;
      var small = document.createElement("small");
      small.textContent = o.sub;
      btn.appendChild(small);
      btn.addEventListener("click", function () { resolveBreakthrough(o); });
      box.appendChild(btn);
    });
    $("choice-mask").classList.remove("hidden");
  }

  function resolveBreakthrough(o) {
    $("choice-mask").classList.add("hidden");
    S.waitingChoice = false;

    if (o.p < 0) {
      S.cult = 640;
      log("你压下躁动的真元，决定再沉淀几年。", "choice-result");
      startTimer();
      return;
    }
    if (o.usePill) S.inv[BREAK_PILL] = clampInv(S.inv[BREAK_PILL] - 1);

    if (Math.random() < o.p) {
      S.realmIdx = 1;
      S.cult = 0;
      S.flags["筑基"] = true;
      S.lifespan += 130;
      S.winAt = S.age + rand(2, 3);
      log("雷劫落尽，灵台生光。筑基成功！寿元 +130，从此你才算真正踏入仙途。", "highlight");
      S.highlights.push(S.age + " 年，渡劫成功，踏入筑基期！");
      saveGame();
    } else {
      S.cult = 495;
      S.attrs["根骨"] = clampAttr(S.attrs["根骨"] - 10);
      log("雷劫失控！你修为退回 11 层，经脉受损（根骨 -10）。", "death");
      if (Math.random() < 0.2) {
        S.flags["走火入魔"] = true;
        S.attrs["神识"] = clampAttr(S.attrs["神识"] - 10);
        log("更糟的是，心魔趁虚而入——你走火入魔了（神识 -10）。", "death");
      }
    }
    renderLifeAttrs();
    renderRealm();
    startTimer();
  }

  /* ---------- 通关收尾（v1 封顶筑基） ---------- */
  function finishWin() {
    S.flags["功成名就"] = true;
    stopTimer();
    log("宗门为你举办筑基大典，四方来贺。这一阶段的修行，功成名就。", "highlight");
    S.highlights.push(S.age + " 年，筑基大典，功成名就。");
    saveGame(); // 保留存档：v2 可从筑基继续
    S.alive = false;
    window.setTimeout(showEnding, 1600);
  }

  /* ---------- 死亡 ---------- */
  function die(cause) {
    S.alive = false;
    stopTimer();
    if (S.age < 30) S.flags["earlyEnd"] = true;
    if (S.flags["走火入魔"] && !S.flags["心魔已除"]) S.flags["走火未愈"] = true;
    log(cause, "death");
    clearSave();
    window.setTimeout(showEnding, 1600);
  }

  /* ---------- 主循环 ---------- */
  function tick() {
    if (!S || !S.alive || S.paused || S.waitingChoice) return;
    S.age++;
    $("age-num").textContent = S.age + STORY_BASE;

    if (S.winAt && S.age >= S.winAt) { finishWin(); return; }
    // 炼气期大限：60 岁仍未筑基，仙途止步
    if (S.realmIdx === 0 && S.age >= QI_AGE_LIMIT) {
      die("炼气期的大限到了。你的头发白得很快，身体一日不如一日。没能筑基，仙途到此为止。");
      return;
    }
    if (S.age >= S.lifespan) {
      die("寿元已尽。你在洞府中安然坐化，走过了 " + (S.age + STORY_BASE) + " 载。这一程修行，落幕。");
      return;
    }
    if (S.flags["走火入魔"] && !S.flags["心魔已除"] && Math.random() < 0.01) {
      die("心魔反噬，真元暴走。你盘坐在蒲团上，再未醒来。时年 " + (S.age + STORY_BASE) + " 岁，道消。");
      return;
    }
    if (S.age > 10 && S.attrs["根骨"] <= 10 && Math.random() < 0.015) {
      die("旧伤复发，你在一次闭关中没能再睁眼。时年 " + (S.age + STORY_BASE) + " 岁，身死道消。");
      return;
    }

    // 修为增长（炼气期）
    if (S.realmIdx === 0) {
      var growth = 6 + Math.floor(S.attrs["灵根"] / 6) + Math.floor(S.attrs["悟性"] / 8) + S.gongfa * 2;
      if (S.flags["洞天"]) growth += 2;
      if (S.flags["古经"]) growth += 2;
      if (S.flags["灵眼"]) growth += 2;
      S.cult += growth;
      // 聚气丹：每年自动服一枚（如有），+15 修为
      if (S.cult < CULT_FULL && (S.inv["聚气丹"] || 0) > 0) {
        S.inv["聚气丹"]--;
        S.cult += 15;
        log("你服下一枚聚气丹，修为大涨一截。", "choice-result");
        renderLifeAttrs();
      }
      renderRealm();
      if (S.cult >= CULT_FULL) { showBreakthrough(); return; }
    }

    var ms = fireMilestone();
    if (ms) { fireEvent(ms); saveGame(); return; }
    // 一年多件事：1 件 50% / 2 件 35% / 3 件 15%
    var roll = Math.random();
    var n = roll < 0.5 ? 1 : (roll < 0.85 ? 2 : 3);
    for (var ei = 0; ei < n; ei++) {
      if (!S.alive || S.waitingChoice) break;
      var e = rollYearEvent();
      if (e) fireEvent(e);
    }
    saveGame();
  }

  function startTimer() {
    stopTimer();
    S.timer = window.setInterval(tick, SPEEDS[speedIdx]);
  }
  function stopTimer() {
    if (S && S.timer) { window.clearInterval(S.timer); S.timer = null; }
  }

  /* =========================================================
   * 结局
   * ========================================================= */
  function pickEnding() {
    for (var i = 0; i < D.endings.length; i++) {
      if (condOk(D.endings[i].cond, S.attrs, S.flags, S.inv)) return D.endings[i];
    }
    return D.fallbackEnding;
  }

  function showEnding() {
    var ending = pickEnding();
    $("end-title").textContent = ending.title;
    var realmName = S.realmIdx > 0 ? "筑基期" : ("炼气·" + layerInfo().layer + "层");
    $("end-age").textContent = "走过 " + (S.age + STORY_BASE) + " 载 · 最终境界「" + realmName + "」· 机缘「" +
      (talent ? talent.name : "无") + "」";

    var attrBox = $("end-attrs");
    attrBox.innerHTML = "";
    ATTRS.forEach(function (n) {
      var chip = document.createElement("span");
      chip.className = "end-attr";
      chip.innerHTML = n + " <b>" + S.attrs[n] + "</b>";
      attrBox.appendChild(chip);
    });
    ["灵石", "聚气丹", "筑基丹", "符咒"].forEach(function (n) {
      if (!(S.inv[n] > 0)) return;
      var chip = document.createElement("span");
      chip.className = "end-attr";
      chip.innerHTML = n + " <b>" + S.inv[n] + "</b>";
      attrBox.appendChild(chip);
    });
    var gf = document.createElement("span");
    gf.className = "end-attr";
    gf.innerHTML = "功法 <b>" + GONGFA_NAMES[S.gongfa] + "</b>";
    attrBox.appendChild(gf);
    MAT_NAMES.forEach(function (n) {
      if (!S.flags[n]) return;
      var chip = document.createElement("span");
      chip.className = "end-attr bp-mat";
      chip.textContent = n;
      attrBox.appendChild(chip);
    });
    S.artifacts.forEach(function (a) {
      var chip = document.createElement("span");
      chip.className = "end-attr bp-art grade-" + a.grade;
      chip.textContent = a.name;
      attrBox.appendChild(chip);
    });

    var hl = $("end-highlights");
    hl.innerHTML = "";
    var list = S.highlights.slice(-6);
    if (!list.length) list.push("一生默默修行，没有惊天动地，但道心始终未改。");
    list.forEach(function (t) {
      var li = document.createElement("li");
      li.textContent = t;
      hl.appendChild(li);
    });

    $("end-comment").textContent = ending.comment;
    show("end");

    try {
      window.localStorage.setItem(LAST_KEY, JSON.stringify({
        age: S.age, title: ending.title, talent: talent ? talent.name : "无"
      }));
    } catch (e) { /* 存储不可用则跳过 */ }
  }

  /* =========================================================
   * 事件绑定
   * ========================================================= */
  function bind() {
    $("attr-list").addEventListener("click", function (ev) {
      var t = ev.target;
      if (t.classList.contains("attr-help")) {
        var descEl = $("desc-" + t.getAttribute("data-help"));
        if (descEl) descEl.classList.toggle("hidden");
        return;
      }
      if (!t.classList.contains("attr-btn")) return;
      var name = t.getAttribute("data-attr");
      var dir = parseInt(t.getAttribute("data-dir"), 10);
      if (dir > 0 && allocUsed() < TOTAL && alloc[name] < D.maxAttr) alloc[name] += STEP;
      if (dir < 0 && alloc[name] > 0) alloc[name] -= STEP;
      refreshAllocUI();
    });

    $("btn-roll-talent").addEventListener("click", rollTalent);
    $("btn-random-attrs").addEventListener("click", randomAlloc);

    $("btn-start").addEventListener("click", function () {
      newGame();
      enterLifeView();
    });

    $("btn-continue").addEventListener("click", function () {
      var sv = loadSave();
      if (!sv) return;
      continueGame(sv);
      enterLifeView();
    });

    $("btn-speed").addEventListener("click", function () {
      speedIdx = (speedIdx + 1) % SPEEDS.length;
      $("btn-speed").textContent = "速度 ×" + [1, 2, 4][speedIdx];
      if (S && !S.paused) startTimer();
    });

    $("btn-pause").addEventListener("click", function () {
      if (!S) return;
      S.paused = !S.paused;
      $("btn-pause").textContent = S.paused ? "继续" : "暂停";
    });

    $("btn-restart").addEventListener("click", function () {
      stopTimer();
      S = null;
      talent = null;
      rollsLeft = 3;
      ATTRS.forEach(function (n) { alloc[n] = 0; });
      $("talent-card").classList.add("empty");
      $("talent-name").textContent = "？？？";
      $("talent-desc").textContent = "点击下方按钮，测你的先天机缘";
      $("btn-roll-talent").textContent = "测机缘";
      $("btn-roll-talent").disabled = false;
      renderAlloc();
      renderPastLife();
      show("start");
    });
  }

  function enterLifeView() {
    $("age-num").textContent = Math.max(0, S.age + STORY_BASE);
    $("life-log").innerHTML = "";
    renderLifeAttrs();
    renderRealm();
    $("btn-speed").textContent = "速度 ×1";
    $("btn-pause").textContent = "暂停";
    speedIdx = 0;
    show("life");
    if (S.age >= 0) {
      log("你睁开眼睛，继续未完的修行。第 " + S.age + " 年。", "choice-result");
    }
    startTimer();
  }

  /* ---------- 初始化 ---------- */
  ATTRS.forEach(function (n) { alloc[n] = 0; });
  renderAlloc();
  renderPastLife();
  bind();
  show("start");
})();
