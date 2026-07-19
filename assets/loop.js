/* 修仙记事本 · loop.js —— 主循环与入口
 * 主循环 / 通关与死亡 / 结局卡 / 事件绑定 / 初始化。
 * 依赖 core.js、ui.js、pop.js。
 */

/* ---------- 通关收尾（v2 封顶结丹） ---------- */
function finishWin() {
  S.flags["功成名就"] = true;
  stopTimer();
  log("结丹大典，八方来贺。你站在高台上，想起十二岁那年第一次引气入体。这一程修行，功成名就。", "highlight");
  S.highlights.push(S.age + " 年，结丹大典，功成名就。");
  saveGame(); // 保留存档：v3 可从结丹继续
  S.alive = false;
  window.setTimeout(showEnding, 1600);
}

/* ---------- 死亡 ---------- */
function die(cause) {
  closeInteractive();
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
  if (S.flags["走火入魔"] && !S.flags["心魔已除"] && Math.random() < 0.005) {
    die("心魔反噬，真元暴走。你盘坐在蒲团上，再未醒来。时年 " + (S.age + STORY_BASE) + " 岁，道消。");
    return;
  }
  if (S.age > 10 && S.attrs["根骨"] <= 10 && Math.random() < 0.015) {
    die("旧伤复发，你在一次闭关中没能再睁眼。时年 " + (S.age + STORY_BASE) + " 岁，身死道消。");
    return;
  }

  // 修为增长（按境界；结丹期 need=0 不再增长）
  var RM = (D.realms || [])[S.realmIdx];
  if (RM && RM.need > 0) {
    var growth;
    if (S.realmIdx === 0) {
      growth = 6 + Math.floor(S.attrs["灵根"] / 6) + Math.floor(S.attrs["悟性"] / 8) + S.gongfa * 2;
    } else {
      growth = 5 + Math.floor(S.attrs["灵根"] / 8) + Math.floor(S.attrs["悟性"] / 10) + S.gongfa * 2;
    }
    if (S.flags["洞天"]) growth += 2;
    if (S.flags["古经"]) growth += 2;
    if (S.flags["灵眼"]) growth += 2;
    if (S.flags["丹毒硬扛"]) growth -= 3;
    S.cult += growth;
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

  var ms = fireMilestone();
  if (ms) { fireEvent(ms); saveGame(); return; }
  // 强制事件队列（丹毒等系统钩子）
  if (S.queue && S.queue.length) {
    var qid = S.queue.shift();
    var qe = eventById(qid);
    if (qe) { fireEvent(qe); saveGame(); return; }
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
  var realmName = S.realmIdx >= 2 ? "结丹期" : S.realmIdx === 1 ? "筑基期" : ("炼气·" + layerInfo().layer + "层");
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
  gf.innerHTML = "功法 <b>" + GONGFA_NAMES[S.gongfa] + "</b>";
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
