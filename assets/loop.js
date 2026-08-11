/* 修仙记事本 · loop.js —— 主循环与入口
 * 主循环 / 通关与死亡 / 结局卡 / 事件绑定 / 初始化。
 * 依赖 core.js、ui.js、pop.js。
 */

/* ---------- 通关收尾（v2 封顶结丹） ---------- */
function finishWin() {
  S.flags["功成名就"] = true;
  stopTimer();
  var hs = S.realmIdx >= 4;
  log(hs
    ? "化神功成，你站上了人间界的顶点。飞升台的风一年大过一年，天门开启的日子近了。这一程修行，就此功成名就。"
    : "结婴大典那日，八方修士来贺。你站在高台上，想起十二岁那年第一次引气入体。这一程修行，就此功成名就。", "highlight");
  S.highlights.push(S.age + (hs ? " 年，化神功成，人间界顶点。" : " 年，结婴大典，就此功成名就。"));
  saveGame(); // 保留存档：v3 可从结丹继续
  S.alive = false;
  $("end-bar").classList.remove("hidden");   // 不自动跳页，让用户先回看时间线
}

/* ---------- 死亡 ---------- */
function die(cause) {
  closeInteractive();
  S.alive = false;
  stopTimer();
  if (S.age < 30) S.flags["earlyEnd"] = true;
  if (S.flags["走火入魔"] && !S.flags["心魔已除"]) S.flags["走火未愈"] = true;
  log(cause, "death");
  // 战死档备份：首页可重玩（每局 10 次）
  try {
    var curSave = window.localStorage.getItem(SAVE_KEY);
    if (curSave) window.localStorage.setItem(DEAD_KEY, curSave);
  } catch (e) { /* ignore */ }
  clearSave();
  $("end-bar").classList.remove("hidden");   // 不自动跳页，让用户先回看时间线
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
    die("寿元已尽。你在洞府中安然坐化，走过了 " + (S.age + STORY_BASE) + " 载。这一程修行，到此也就落幕了。");
    return;
  }
  if (S.flags["走火入魔"] && !S.flags["心魔已除"] && Math.random() < (S.flags["魔修"] ? 0.008 : 0.005)) {
    die("心魔反噬，真元彻底暴走。你盘坐在蒲团上，再没有醒来。时年 " + (S.age + STORY_BASE) + " 岁，道消。");
    return;
  }
  if (S.age > 10 && S.attrs["根骨"] <= 10 && Math.random() < 0.015) {
    die("旧伤复发，你在一次闭关中没能再睁眼。时年 " + (S.age + STORY_BASE) + " 岁，身死道消。");
    return;
  }

  // 修为增长（按境界；元婴期 need=0 不再增长）
  var RM = (D.realms || [])[S.realmIdx];
  if (RM && RM.need > 0) {
    var growth;
    if (S.realmIdx === 0) {
      growth = 6 + Math.floor(S.attrs["灵根"] / 6) + Math.floor(S.attrs["悟性"] / 8) + S.gongfa * 2;
    } else if (S.realmIdx === 1) {
      growth = 5 + Math.floor(S.attrs["灵根"] / 8) + Math.floor(S.attrs["悟性"] / 10) + S.gongfa * 2;
    } else if (S.realmIdx === 3) {
      // 元婴期：更慢 + 阶段衰减（中期 ×0.8 / 后期 ×0.6，加成不衰减）
      growth = 5 + Math.floor(S.attrs["灵根"] / 28) + Math.floor(S.attrs["悟性"] / 35) + S.gongfa * 2;
      if (S.cult >= 3200) growth = Math.round(growth * 0.6);
      else if (S.cult >= 1500) growth = Math.round(growth * 0.8);
    } else {
      growth = 5 + Math.floor(S.attrs["灵根"] / 25) + Math.floor(S.attrs["悟性"] / 30) + S.gongfa * 2;
      if (S.cult >= 3800) growth = Math.round(growth * 0.6);
      else if (S.cult >= 1800) growth = Math.round(growth * 0.8);
    }
    if (S.flags["洞天"]) growth += 2;
    if (S.flags["古经"]) growth += 2;
    if (S.flags["灵眼"]) growth += 2;
    if (S.flags["丹毒硬扛"]) growth -= 3;
    if (S.faction) {
    var _vspd = 0;
    (S.faction.veins || []).forEach(function (v) { _vspd += VEIN_SPD[v.size] || 0; });
    growth += _vspd;   // 灵脉（不衰减）
  }
    if (S.age < (S.sanShangUntil || 0)) growth = Math.floor(growth / 2);  // 养伤
    growth = Math.max(0, growth);
    if (S.flags["魔修"]) growth = Math.round(growth * 1.25);   // 魔道功法：急功近利 ×1.25（代价在心魔骰）
    var prevCult = S.cult;
    S.cult += growth;
    // 金丹三段仪式卡：修为跨过 1800/3800，次年弹地位转变卡（milestone:-1 防随机池）
    if (S.realmIdx === 2) {
      if (prevCult < 1800 && S.cult >= 1800) (S.queue = S.queue || []).push("jd_stage2");
      if (prevCult < 3800 && S.cult >= 3800) (S.queue = S.queue || []).push("jd_stage3");
    }
    // 元婴三段仪式卡：跨过 1500/3200
    if (S.realmIdx === 3) {
      if (prevCult < 1500 && S.cult >= 1500) (S.queue = S.queue || []).push("yy_stage2");
      if (prevCult < 3200 && S.cult >= 3200) (S.queue = S.queue || []).push("yy_stage3");
    }
    // 聚气丹：炼气期每年自动服一枚（如有），+15 修为
    if (S.realmIdx === 0 && S.cult < RM.need && (S.inv["聚气丹"] || 0) > 0) {
      S.inv["聚气丹"]--;
      S.cult += 15;
      log("你服下一枚聚气丹，修为大涨一截。", "choice-result");
      renderLifeAttrs();
    }
    // 凝元丹：筑基期每年自动服一枚，耐药三档（+25 / +12 / +5）
    if (S.realmIdx === 1 && S.cult < RM.need && (S.inv["凝元丹"] || 0) > 0 && S.age >= (S.danStopUntil || 0)) {
      S.inv["凝元丹"]--;
      S.danUsed = (S.danUsed || 0) + 1;
      var dgain = S.danUsed <= 5 ? 25 : (S.danUsed <= 10 ? 12 : 5);
      S.cult += dgain;
      log(S.danUsed <= 5 ? "你服下一枚凝元丹，修为大涨一截。"
        : (S.danUsed <= 10 ? "你又服下一枚凝元丹——药效不如从前了。"
        : "凝元丹入腹，只泛起一丝涟漪。丹毒已在经脉里积下了。"), "choice-result");
      if (S.danUsed === 11 && !S.flags["丹毒硬扛"]) {
        (S.queue = S.queue || []).push("zb_dandu");
      }
      renderLifeAttrs();
    }
    renderRealm();
    if (S.cult >= RM.need) { showBreakthrough(); return; }
  }

  // 疗伤丹：养伤期间每年自动服一枚（如有），缩短养伤年数
  if (S.age < (S.sanShangUntil || 0)) {
    if ((S.inv["妖丹"] || 0) > 0) { S.inv["妖丹"]--; S.sanShangUntil = 0; log("你服下妖丹，磅礴生机化开，一身伤势尽数痊愈。", "choice-result"); }
    else if ((S.inv["玉骨丹"] || 0) > 0) { S.inv["玉骨丹"]--; S.sanShangUntil -= 2; log("你服下一枚玉骨丹，断骨续接，伤势大好。", "choice-result"); }
    else if ((S.inv["回春丹"] || 0) > 0) { S.inv["回春丹"]--; S.sanShangUntil -= 1; log("你服下一枚回春丹，伤势好了大半。", "choice-result"); }
    if (S.sanShangUntil < S.age) S.sanShangUntil = 0;
  }

  // 势力年度结算：供奉 + 情报 + 弟子专长 + 慕名来投（金丹期开府后）
  if (S.faction && S.realmIdx >= 2) {
    var fac = S.faction;
    migrateFaction();
    var veinPay = 0;
    fac.veins.forEach(function (v) { veinPay += VEIN_PAY[v.size] || 0; });
    var diziPay = 0;
    fac.dizi.forEach(function (d) {
      diziPay += 5;
      if (d.role === "商") diziPay += 12;
      if (d.role === "器") diziPay += 3;
      if (d.role === "剑") fac.intel = (fac.intel || 0) + 1;
    });
    var facIncome = 20 + diziPay + veinPay;
    S.inv["灵石"] = (S.inv["灵石"] || 0) + facIncome;
    fac.intel = (fac.intel || 0) + rand(1, 3);
    if (S.age % 4 === 0) {
      var dans = fac.dizi.filter(function (d) { return d.role === "丹"; }).length;
      if (dans) S.inv["回春丹"] = (S.inv["回春丹"] || 0) + Math.min(2, dans);
    }
    // 慕名来投：声望越高，弟子增得越快（上限 20）
    if (fac.dizi.length < 20 && Math.random() < 0.12 + (fac.rep || 0) * 0.02) {
      var nd = newDizi();
      fac.dizi.push(nd);
      fac.disciples = fac.dizi.length;
      log("年轻修士「" + nd.name + "」慕名来投，拜入你的门下（善" + nd.role + "）。", "");
    }
  }

  // 孤狼情报：老苗年递（金丹期无势力时，速度约为开府线一半）
  if (!S.faction && S.realmIdx >= 2 && S.flags["结丹"]) {
    S.intel = (S.intel || 0) + rand(1, 2);
  }

  // 富甲一方：灵石攒过两千（B1-2；tick 每年一检，覆盖势力供奉/事件/斗法一切灵石来源；grantAchievement 内部去重）
  if ((S.inv["灵石"] || 0) >= 2000) grantAchievement("fujia");

  checkArtifactAging();   // 法宝寿限年检：到期退役

  var ms = fireMilestone();
  if (ms) { fireEvent(ms); saveGame(); return; }
  // 强制事件队列（丹毒等系统钩子）
  if (S._disposal && S._disposal.length && !S.waitingChoice) { showDisposal(); saveGame(); return; }   // 处置链兑底（阅读停顿被暂停打断时接住）
  if (S.queue && S.queue.length) {
    var qid = S.queue.shift();
    if (qid === "sys_disposal") { showDisposal(); saveGame(); return; }
    var qe = eventById(qid);
    if (qe) { fireEvent(qe); saveGame(); return; }
  }
  // 休整年：上一场互动之后，留一年给玩家回看剧情
  if (S.age < (S.restUntil || 0)) {
    var REST_TEXTS = [
      "这一年你闭门静修，把前些日子的经历慢慢消化。",
      "山间无大事。你煮茶看云，难得安生了一年。",
      "你在洞府中整理这些年的所得所失，心里更亮堂了些。"
    ];
    if (Math.random() < 0.5) log(REST_TEXTS[rand(0, REST_TEXTS.length - 1)], "");
    saveGame();
    return;
  }
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
  var realmName = S.realmIdx >= 4 ? "化神期" : S.realmIdx >= 3 ? "元婴期" : S.realmIdx >= 2 ? "结丹期" : S.realmIdx === 1 ? "筑基期" : ("炼气·" + layerInfo().layer + "层");
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
  if (S.flags["一品金丹"]) {
    var g1 = document.createElement("span");
    g1.className = "end-attr bp-mat";
    g1.textContent = "一品金丹";
    attrBox.appendChild(g1);
  }
  if (S.flags["假丹"]) {
    var g3 = document.createElement("span");
    g3.className = "end-attr";
    g3.textContent = "三品假丹";
    attrBox.appendChild(g3);
  }
  ["灵石"].concat(PILL_SLOTS).forEach(function (n) {
    if (!(S.inv[n] > 0)) return;
    var chip = document.createElement("span");
    chip.className = "end-attr";
    chip.innerHTML = n + " <b>" + fmtNum(S.inv[n]) + "</b>";
    attrBox.appendChild(chip);
  });
  var gf = document.createElement("span");
  gf.className = "end-attr";
  gf.innerHTML = "功法 <b>" + gongfaLabel() + "</b>";
  attrBox.appendChild(gf);
  MAT_NAMES.concat(MAT2_NAMES).forEach(function (n) {
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

  var ac = $("end-achievements");
  ac.innerHTML = "";
  (D.achievements || []).forEach(function (a) {
    var li = document.createElement("li");
    if (S.achievements && S.achievements.indexOf(a.id) >= 0) {
      li.textContent = a.name + "——" + a.desc;
      if (a.gold) li.className = "ach-gold";
      ac.appendChild(li);
    } else if (a.gold) {
      li.textContent = "？？？";
      li.className = "ach-hidden";
      ac.appendChild(li);
    }
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

  // 结局快照：首页「查看总结」用
  try {
    window.localStorage.setItem(SNAP_KEY, JSON.stringify({
      title: ending.title, comment: ending.comment,
      ageText: $("end-age").textContent,
      achv: (S.achievements || []).slice(),
      highlights: S.highlights.slice(-6)
    }));
  } catch (e) { /* 存储不可用则跳过 */ }

  try {
    window.localStorage.setItem(LAST_KEY, JSON.stringify({
      age: S.age, title: ending.title, talent: talent ? talent.name : "无"
    }));
  } catch (e) { /* 存储不可用则跳过 */ }
}

/* ---------- 结局快照展示（首页「查看总结」） ---------- */
function showEndSnap(snap) {
  if (!snap) return;
  $("end-title").textContent = snap.title;
  $("end-age").textContent = snap.ageText;
  $("end-attrs").innerHTML = "";
  var ac = $("end-achievements");
  ac.innerHTML = "";
  (D.achievements || []).forEach(function (a) {
    var li = document.createElement("li");
    if (snap.achv && snap.achv.indexOf(a.id) >= 0) {
      li.textContent = a.name + "——" + a.desc;
      if (a.gold) li.className = "ach-gold";
      ac.appendChild(li);
    } else if (a.gold) {
      li.textContent = "？？？";
      li.className = "ach-hidden";
      ac.appendChild(li);
    }
  });
  var hl = $("end-highlights");
  hl.innerHTML = "";
  (snap.highlights || []).forEach(function (t) {
    var li = document.createElement("li");
    li.textContent = t;
    hl.appendChild(li);
  });
  $("end-comment").textContent = snap.comment;
  show("end");
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

  $("fab-bag").addEventListener("click", function () {
    $("bag-panel").classList.toggle("hidden");
  });
  document.querySelectorAll(".bag-tab-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll(".bag-tab-btn").forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
      ["attrs", "bag", "spell", "art", "shop", "faction"].forEach(function (t) {
        $("bag-pane-" + t).classList.toggle("hidden", t !== b.getAttribute("data-tab"));
      });
    });
  });
  $("bag-pane-faction").addEventListener("click", function (ev) {
    var idx = ev.target.getAttribute && ev.target.getAttribute("data-vein");
    if (idx === null || idx === undefined) return;
    var v = S.faction && S.faction.veins[parseInt(idx, 10)];
    if (!v || v.size >= 3) return;
    var cost = VEIN_UPGRADE[v.size];
    if ((S.inv["灵石"] || 0) < cost) return;
    S.inv["灵石"] -= cost;
    v.size++;
    log("你斥资 " + cost + " 灵石疏浚灵脉，「" + v.name + "」升为" + VEIN_SIZE[v.size] + "。", "choice-result");
    renderLifeAttrs();
    saveGame();
  });
  $("btn-retry").addEventListener("click", function () {
    try {
      var raw = window.localStorage.getItem(DEAD_KEY);
      var n = parseInt(window.localStorage.getItem(RETRY_KEY) || "10", 10);
      if (!raw || isNaN(n) || n <= 0) return;
      window.localStorage.setItem(RETRY_KEY, String(n - 1));
      window.localStorage.setItem(SAVE_KEY, raw);
      window.localStorage.removeItem(DEAD_KEY);
      continueGame(loadSave());
      enterLifeView();
    } catch (e) { /* ignore */ }
  });
  $("btn-snap").addEventListener("click", function () {
    try {
      showEndSnap(JSON.parse(window.localStorage.getItem(SNAP_KEY)));
    } catch (e) { /* ignore */ }
  });
  $("btn-speed").addEventListener("click", function () {
    speedIdx = (speedIdx + 1) % SPEEDS.length;
    $("btn-speed").textContent = "速度 ×" + SPEED_LABELS[speedIdx];
    if (S && !S.paused) startTimer();
  });

  $("btn-pause").addEventListener("click", function () {
    if (!S) return;
    S.paused = !S.paused;
    $("btn-pause").textContent = S.paused ? "继续" : "暂停";
  });

  $("btn-endcard").addEventListener("click", function () {
    $("end-bar").classList.add("hidden");
    showEnding();
  });

  $("btn-restart").addEventListener("click", function () {
    stopTimer();
    S = null;
    talent = null;
    rollsLeft = 3;
    $("end-bar").classList.add("hidden");
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
  renderLogWindow();
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
// 事件 realms 缺省推导：cond.flag:"筑基" → [1]，否则 → [0]（新事件请显式写 realms）
D.events.forEach(function (e) {
  if (!e.realms) e.realms = (e.cond && e.cond.flag === "筑基") ? [1] : [0];
});
ATTRS.forEach(function (n) { alloc[n] = 0; });
renderAlloc();
renderPastLife();
bind();
show("start");
