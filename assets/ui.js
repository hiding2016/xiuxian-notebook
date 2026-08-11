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
  // v1/v2 通关档（筑基/结丹·功成名就）可继续修行；元婴通关档封顶
  var capped = sv && sv.flags && sv.flags["功成名就"] && sv.realmIdx >= 3;
  var canContinue = sv && typeof sv.age === "number" &&
    (!(sv.flags && sv.flags["功成名就"]) || sv.realmIdx === 1 || sv.realmIdx === 2);
  if (canContinue) {
    btn.classList.remove("hidden");
    btn.textContent = "继续修行（" + (sv.age + STORY_BASE) + " 岁 · " +
      (sv.realmIdx >= 2 ? "结丹期" : sv.realmIdx === 1 ? "筑基期" : "炼气期") + "）";
  } else {
    btn.classList.add("hidden");
  }
  // 封顶提示：写在「上一次修行」框里，小字，不抢眼
  var cap = $("past-life-cap");
  if (cap) cap.classList.toggle("hidden", !capped);

  // 重玩（战死档，每局 10 次）与查看总结
  var deadRaw = null, snapRaw = null, retries = 10;
  try {
    deadRaw = window.localStorage.getItem(DEAD_KEY);
    snapRaw = window.localStorage.getItem(SNAP_KEY);
    retries = parseInt(window.localStorage.getItem(RETRY_KEY) || "10", 10);
    if (isNaN(retries)) retries = 10;
  } catch (e) { /* ignore */ }
  var rbtn = $("btn-retry");
  if (deadRaw && retries > 0) {
    rbtn.classList.remove("hidden");
    rbtn.textContent = "重玩（剩 " + retries + " 次）";
  } else {
    rbtn.classList.add("hidden");
  }
  $("btn-snap").classList.toggle("hidden", !snapRaw);
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
    gongfa: 0, artifacts: [], spells: [],
    age: -1, cult: 0, realmIdx: 0, winAt: 0,
    lifespan: Math.round(D.lifespanBase + attrs["根骨"] * 0.2 + rand(0, 10)),
    alive: true, used: {}, cooldowns: {}, chains: {}, lastChoiceAge: -99,
    highlights: [], paused: false, waitingChoice: false,
    timer: null, pendingChoice: null,
    danUsed: 0, danStopUntil: 0, dgCd: {},
    daoXin: 0, faction: null, renqing: 0, achievements: [],
    sanShangUntil: 0, weakUntil: 0, pindan: 0, evil: 0, stats: {}, restUntil: 0,
    chainFocus: null,
    shop: { yr: {} },
    npc: { friend: NPC_FRIEND_NAMES[rand(0, NPC_FRIEND_NAMES.length - 1)], lover: NPC_LOVER_NAMES[rand(0, NPC_LOVER_NAMES.length - 1)] },
    logs: [], domIdx: {}
  };
  if (talent.effect && talent.effect.artifact) {
    for (var g in talent.effect.artifact) {
      for (var ai = 0; ai < talent.effect.artifact[g]; ai++) grantArtifact(g);
    }
    S._lastArts = null;
  }
  if (talent.effect && talent.effect.spell) {
    S.spells.push(talent.effect.spell);   // 机缘赠法：开局自带一门法术
  }
  clearSave();
  try {
    window.localStorage.setItem(RETRY_KEY, "10");
    window.localStorage.removeItem(DEAD_KEY);
  } catch (e) { /* ignore */ }
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
  // v3 新字段：旧档缺失一律默认值读取
  S.spells = sv.spells || [];
  S.daoXin = sv.daoXin || 0;
  S.faction = sv.faction || null;
  S.renqing = sv.renqing || 0;
  S.achievements = sv.achievements || [];
  S.sanShangUntil = sv.sanShangUntil || 0;
  S.weakUntil = sv.weakUntil || 0;
  S.pindan = sv.pindan || 0;
  S.evil = sv.evil || 0;
  S.stats = sv.stats || {};
  S.restUntil = sv.restUntil || 0;
  S.chainFocus = sv.chainFocus || null;
  S.npc = sv.npc || { friend: NPC_FRIEND_NAMES[rand(0, NPC_FRIEND_NAMES.length - 1)], lover: NPC_LOVER_NAMES[rand(0, NPC_LOVER_NAMES.length - 1)] };
  S.shop = sv.shop || { yr: {} };
  // 法宝生命周期迁移：旧存档补入手年份
  (S.artifacts || []).forEach(function (a) { if (a.gotAt === undefined) a.gotAt = S.age; });
  // v3/v2/v1 通关档续玩：筑基档→筑基继续；结丹档→金丹继续；元婴档→v4 元婴期继续
  if (S.flags["功成名就"] && (S.realmIdx === 1 || S.realmIdx === 2 || S.realmIdx === 3)) {
    delete S.flags["功成名就"];
    S.winAt = 0;
  }
}

/* =========================================================
 * 修行页渲染
 * ========================================================= */
var SPEEDS = [2000, 1000, 500, 180, 90];   // ×1 ×2 ×4 ×8 ×16（×1 放慢，高倍档跳过平淡年）
var SPEED_LABELS = [1, 2, 4, 8, 16];
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
  gf.innerHTML = "功法 <b>" + gongfaLabel() + "</b>";
  ibox.appendChild(gf);
  if (S.faction) {
    var fc = document.createElement("span");
    fc.className = "life-attr bp-faction";
    fc.textContent = (S.faction.route === "zong" ? "青梧峰" : "散修盟") + " 弟子" + fmtNum(S.faction.disciples || 0) + " · 灵脉" + fmtNum(S.faction.spiritVeins || 0) + " · 情报" + fmtNum(S.faction.intel || 0);
    ibox.appendChild(fc);
  }
  renderBackpack();
}

/* 势力页签：弟子名册 / 灵脉 / 情报征伐板 */
var CAMPAIGN_LINES = [
  { prefix: "mx_", name: "玄阴教", endFlag: "灭总坛" },
  { prefix: "yx_", name: "云梦泽老妖", endFlag: "斩大妖" },
  { prefix: "cz_", name: "上古战场", endFlag: "古战场事了" }
];

/* 坊市页签：灵石→战力的常驻通道（v4.3）
 * 法宝/法术玉简每年限购一次，丹药符咒不限（背包格限兜底）。 */
var SHOP_STOCK = [
  { pill: "聚气丹", price: 15, maxRealm: 0, desc: "炼气修为丹，每年自动服一枚" },
  { pill: "凝元丹", price: 30, minRealm: 1, maxRealm: 1, desc: "筑基修为丹，每年自动服一枚" },
  { pill: "回春丹", price: 60, minRealm: 1, desc: "养伤缩短一年；斗法中回血 30%" },
  { pill: "玉骨丹", price: 150, minRealm: 2, desc: "养伤缩短两年；斗法中回血 55%" },
  { pill: "符咒", price: 25, minRealm: 0, desc: "斗法中两张一掷，伤敌一截" },
  { art: "法器", price: 120, minRealm: 1 },
  { art: "灵器", price: 450, minRealm: 2 },
  { art: "法宝", price: 1000, minRealm: 2 },
  { spellType: "攻", price: 600, minRealm: 2 },
  { spellType: "守", price: 600, minRealm: 2 },
  { spellType: "变", price: 600, minRealm: 2 }
];

function renderBagShop() {
  var pane = $("bag-pane-shop");
  if (!pane) return;
  pane.innerHTML = "";
  S.shop = S.shop || { yr: {} };
  var head = document.createElement("div");
  head.className = "bag-sec-title";
  head.textContent = "坊市常设 · 灵石 " + fmtNum(S.inv["灵石"] || 0);
  pane.appendChild(head);
  // 法宝生命周期：受创修复行（有受创法宝时出现，一键全修）
  var damagedArts = S.artifacts.filter(function (a) { return a.damaged; });
  if (damagedArts.length) {
    var REP_PRICE = { "法器": 60, "灵器": 225, "法宝": 500 };
    var repCost = 0;
    damagedArts.forEach(function (a) { repCost += REP_PRICE[a.grade] || 60; });
    var rrow = document.createElement("div");
    rrow.className = "bag-row";
    var rdesc = document.createElement("span");
    rdesc.className = "bag-desc";
    rdesc.textContent = "修复受创法宝 " + damagedArts.length + " 件 · 共 " + repCost + " 灵石";
    rrow.appendChild(rdesc);
    var rbtn = document.createElement("button");
    rbtn.className = "bag-up-btn";
    rbtn.type = "button";
    rbtn.textContent = "修";
    rbtn.disabled = (S.inv["灵石"] || 0) < repCost;
    rbtn.addEventListener("click", function () {
      if ((S.inv["灵石"] || 0) < repCost) return;
      S.inv["灵石"] -= repCost;
      damagedArts.forEach(function (a) { a.damaged = false; a.power = ART_POWER[a.grade] || a.power; });
      log("坊市炼器炉开了一夜，" + damagedArts.length + " 件受创法宝灵光复明。（-" + repCost + " 灵石）", "choice-result");
      renderLifeAttrs();
      renderBagShop();
      saveGame();
    });
    rrow.appendChild(rbtn);
    pane.appendChild(rrow);
  }
  SHOP_STOCK.forEach(function (it) {
    if (it.minRealm !== undefined && S.realmIdx < it.minRealm) return;
    if (it.maxRealm !== undefined && S.realmIdx > it.maxRealm) return;
    var row = document.createElement("div");
    row.className = "bag-row";
    var desc = document.createElement("span");
    desc.className = "bag-desc";
    var label, sub = "";
    if (it.pill) { label = it.pill; sub = it.desc; }
    else if (it.art) { label = it.art + "一件（随机）"; sub = "今年限购一件" + (S.shop.yr[it.art] === S.age ? " · 已购" : ""); }
    else {
      var owned = 0;
      D.spells.forEach(function (sp) { if (sp.type === it.spellType && S.spells.indexOf(sp.id) >= 0) owned++; });
      var total = 0;
      D.spells.forEach(function (sp) { if (sp.type === it.spellType) total++; });
      label = it.spellType + "系法术玉简";
      sub = owned >= total ? "该系已学齐" : (S.shop.yr["sp" + it.spellType] === S.age ? "今年限购一门 · 已购" : "今年限购一门");
    }
    desc.textContent = label + " · " + it.price + " 灵石" + (sub ? "（" + sub + "）" : "");
    row.appendChild(desc);
    var btn = document.createElement("button");
    btn.className = "bag-up-btn";
    btn.type = "button";
    btn.textContent = "买";
    var disabled = (S.inv["灵石"] || 0) < it.price;
    if (it.art && S.shop.yr[it.art] === S.age) disabled = true;
    if (it.spellType) {
      var left = D.spells.some(function (sp) { return sp.type === it.spellType && S.spells.indexOf(sp.id) < 0; });
      if (!left || S.shop.yr["sp" + it.spellType] === S.age) disabled = true;
    }
    btn.disabled = disabled;
    btn.addEventListener("click", function () { buyShopItem(it); });
    row.appendChild(btn);
    pane.appendChild(row);
  });
}

function buyShopItem(it) {
  S.shop = S.shop || { yr: {} };
  if ((S.inv["灵石"] || 0) < it.price) return;
  if (it.pill) {
    S.inv["灵石"] -= it.price;
    S.inv[it.pill] = clampInv((S.inv[it.pill] || 0) + 1);
    log("坊市采买：" + it.pill + "一枚，" + it.price + " 灵石。", "");
  } else if (it.art) {
    if (S.shop.yr[it.art] === S.age) return;
    S.inv["灵石"] -= it.price;
    S.shop.yr[it.art] = S.age;
    grantArtifact(it.art, true);
    var a = S.artifacts[S.artifacts.length - 1];
    log("坊市采买：重金 " + it.price + " 灵石，购得「" + (a ? a.name : it.art) + "」。", "choice-result");
  } else if (it.spellType) {
    if (S.shop.yr["sp" + it.spellType] === S.age) return;
    var pool = D.spells.filter(function (sp) { return sp.type === it.spellType && S.spells.indexOf(sp.id) < 0; });
    if (!pool.length) return;
    S.inv["灵石"] -= it.price;
    S.shop.yr["sp" + it.spellType] = S.age;
    var sp = pool[rand(0, pool.length - 1)];
    log("坊市采买：" + it.price + " 灵石购得「" + sp.name + "」玉简。", "choice-result");
    applyEffect({ spell: sp.id });
  }
  renderLifeAttrs();
  renderBagShop();
  saveGame();
}

function renderBagFaction() {
  var pane = $("bag-pane-faction");
  if (!pane) return;
  pane.innerHTML = "";
  // 孤狼：金丹后无势力，仍显示老苗的情报征伐板（隐藏弟子/灵脉两节）
  if (!S.faction && !(S.realmIdx >= 2 && S.flags["结丹"])) {
    var none = document.createElement("div");
    none.className = "bag-none";
    none.textContent = "尚未开府。金丹之后，宗门与散修各有开府的门路。";
    pane.appendChild(none);
    return;
  }
  if (S.faction) migrateFaction();
  var f = S.faction;
  var mkTitle = function (t) {
    var d = document.createElement("div");
    d.className = "bag-sec-title";
    d.textContent = t;
    pane.appendChild(d);
  };
  var mkRow = function (left, right) {
    var row = document.createElement("div");
    row.className = "bag-row";
    var l = document.createElement("span");
    l.className = "bp-slot";
    l.textContent = left;
    row.appendChild(l);
    if (right) {
      var r = document.createElement("span");
      r.className = "bag-desc";
      r.textContent = right;
      row.appendChild(r);
    }
    pane.appendChild(row);
    return row;
  };

  // 弟子名册：有谁，善什么，顶什么用
  if (f) {
  mkTitle("弟子 " + f.dizi.length + " 人");
  var ROLE_DESC = { "剑": "情报 +1/年", "丹": "每四年献丹", "器": "供奉 +8/年", "商": "供奉 +17/年" };
  f.dizi.forEach(function (d) {
    mkRow(d.name + " · 善" + d.role, ROLE_DESC[d.role] || "");
  });

  // 灵脉：有什么用，多大，能升级（块式布局，窄屏友好）
  mkTitle("灵脉 " + f.veins.length + " 座");
  f.veins.forEach(function (v, idx) {
    var block = document.createElement("div");
    block.className = "bag-block";
    var top = document.createElement("div");
    top.className = "bag-block-top";
    var nm = document.createElement("span");
    nm.className = "bp-slot";
    nm.textContent = v.name + " · " + VEIN_SIZE[v.size];
    top.appendChild(nm);
    if (v.size < 3) {
      var btn = document.createElement("button");
      btn.className = "bag-up-btn";
      btn.type = "button";
      var cost = VEIN_UPGRADE[v.size];
      btn.textContent = "升" + VEIN_SIZE[v.size + 1] + "（" + cost + "）";
      btn.setAttribute("data-vein", String(idx));
      if ((S.inv["灵石"] || 0) < cost) btn.disabled = true;
      top.appendChild(btn);
    }
    var sub = document.createElement("div");
    sub.className = "bag-desc";
    sub.textContent = "修炼 +" + VEIN_SPD[v.size] + "/年 · 供奉 " + VEIN_PAY[v.size] + " 灵石/年";
    block.appendChild(top);
    block.appendChild(sub);
    pane.appendChild(block);
  });
  }

  // 情报征伐板：三条主线，各显示当前一环（数据驱动，读事件 board 字段）
  mkTitle("情报 " + getIntel() + " · 征伐");
  CAMPAIGN_LINES.forEach(function (line) {
    var status, desc = "";
    if (S.flags[line.endFlag]) { status = "已了断"; }
    else {
      var rings = D.events.filter(function (e) { return e.id && e.id.indexOf(line.prefix) === 0 && e.board; });
      var cur = null;
      for (var ri = 0; ri < rings.length; ri++) {
        var e = rings[ri];
        var done = (e.boardFlag && S.flags[e.boardFlag]) || (S.used[e.id] && !e.cooldown);
        if (!done) { cur = e; break; }
      }
      if (!cur) { status = "已了断"; }
      else {
        var need = cur.cond && cur.cond.intel;
        if (need && getIntel() < need) { status = "情报 " + getIntel() + "/" + need; desc = cur.board; }
        else if (!condOk(cur.cond, S.attrs, S.flags, S.inv)) { status = "待机缘"; desc = cur.board; }
        else { status = "可行动"; desc = cur.board; }
      }
    }
    var block = document.createElement("div");
    block.className = "bag-block";
    var top = document.createElement("div");
    top.className = "bag-block-top";
    var nm = document.createElement("span");
    nm.className = "bp-slot";
    nm.textContent = line.name;
    var st = document.createElement("span");
    st.className = "bag-status" + (status === "已了断" ? " done" : status === "可行动" ? " go" : "");
    st.textContent = status;
    top.appendChild(nm);
    top.appendChild(st);
    block.appendChild(top);
    if (desc) {
      var sub = document.createElement("div");
      sub.className = "bag-desc";
      sub.textContent = desc;
      block.appendChild(sub);
    }
    pane.appendChild(block);
  });
}

function renderBackpack() {
  // 背包页签：背包格数 + 丹药 + 天材地宝
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

  // 法术页签：具名 + 描述
  var spPane = $("bag-pane-spell");
  spPane.innerHTML = "";
  var spells = S.spells || [];
  var spLabel = document.createElement("span");
  spLabel.className = "bp-label";
  spLabel.textContent = "法术 " + spells.length + "/5";
  spPane.appendChild(spLabel);
  if (!spells.length) {
    var spNone = document.createElement("div");
    spNone.className = "bag-none";
    spNone.textContent = "尚未习得法术。藏经阁、战役缴获、秘境传承、人情赠予皆有门路。";
    spPane.appendChild(spNone);
  }
  spells.forEach(function (id) {
    D.spells.forEach(function (s) {
      if (s.id !== id) return;
      var row = document.createElement("div");
      row.className = "bag-row";
      var nm = document.createElement("span");
      nm.className = "bp-slot bp-spell";
      nm.textContent = s.name + " · " + s.type;
      var ds = document.createElement("span");
      ds.className = "bag-desc";
      ds.textContent = "战力 " + s.power + (s.trait ? " · " + s.trait : "") + "。" + s.desc;
      row.appendChild(nm);
      row.appendChild(ds);
      spPane.appendChild(row);
    });
  });

  // 法宝页签：具名列表（品级配色 + 攻/守/兼 + 战力）
  var artPane = $("bag-pane-art");
  artPane.innerHTML = "";
  if (!S.artifacts.length) {
    var artNone = document.createElement("div");
    artNone.className = "bag-none";
    artNone.textContent = "身无长物。坊市、炼器、秘境、人情，都是来路。";
    artPane.appendChild(artNone);
  }
  S.artifacts.forEach(function (a) {
    var row = document.createElement("div");
    row.className = "bag-row";
    var chip = document.createElement("span");
    chip.className = "bp-slot bp-art grade-" + a.grade;
    chip.textContent = a.name;
    var ds = document.createElement("span");
    ds.className = "bag-desc";
    var t = artifactType(a);
    var dmgTag = a.damaged ? " · 受创" : "";
    if (t === "攻") {
      ds.textContent = a.grade + " · 攻击型 · 法宝攻 +" + Math.round(a.power * 1.2) + " · 战力 +" + a.power + dmgTag;
    } else if (t === "守") {
      ds.textContent = a.grade + " · 防御型 · 斗法减伤 +" + Math.round(a.power / 5 * 1.2) + " · 战力 +" + a.power + dmgTag;
    } else {
      ds.textContent = a.grade + " · 攻守兼备 · 法宝攻 +" + Math.round(a.power * 0.8) + " · 减伤 +" + Math.round(a.power / 5 * 0.8) + " · 战力 +" + a.power + dmgTag;
    }
    row.appendChild(chip);
    row.appendChild(ds);
    artPane.appendChild(row);
  });

  // 属性页签补充：道心/状态/势力详情
  var ex = $("bag-extra");
  ex.innerHTML = "";
  var lines = [];
  if (S.daoXin) lines.push("道心 " + S.daoXin);
  if (S.renqing) lines.push("人情债 " + S.renqing);
  if (S.age < (S.sanShangUntil || 0)) lines.push("养伤中（还剩 " + (S.sanShangUntil - S.age) + " 年）");
  if (S.age < (S.weakUntil || 0)) lines.push("虚弱中（还剩 " + (S.weakUntil - S.age) + " 年）");
  if (S.faction) {
    var f = S.faction;
    lines.push((f.route === "zong" ? "青梧峰" : "散修盟") + "：弟子 " + (f.disciples || 0) + " · 灵脉 " + (f.spiritVeins || 0) + " · 情报 " + (f.intel || 0) + " · 声望 " + (f.rep || 0));
  }
  lines.forEach(function (t) {
    var d = document.createElement("div");
    d.className = "bag-extra-line";
    d.textContent = t;
    ex.appendChild(d);
  });
  renderBagFaction();
  renderBagShop();
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
  text = npcT(text);   // 人物主线占位符：【挚友】【道侣名】→ 本局名字
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
  if (effect.artifactForce) for (k in effect.artifactForce) {
    parts.push(k + " +" + effect.artifactForce[k]);
  }
  if (effect.artifactType) for (k in effect.artifactType) {
    parts.push(effect.artifactType[k] + "·" + k + "型 +1");
  }
  if (effect.spell) parts.push("法术 +1");
  if (effect.daoXin) parts.push("道心 +" + effect.daoXin);
  if (effect.sanShang) parts.push("养伤 " + effect.sanShang + " 年");
  if (effect.weak) parts.push("虚弱 " + effect.weak + " 年");
  if (effect.renqing) parts.push(effect.renqing > 0 ? "人情 +" + effect.renqing : "人情 " + effect.renqing);
  if (effect.factionDelta) for (k in effect.factionDelta) {
    var fd = effect.factionDelta[k];
    var fdNames = { disciples: "弟子", spiritVeins: "灵脉", intel: "情报", rep: "声望", rank: "职级" };
    if (fd !== 0) parts.push((fdNames[k] || k) + (fd > 0 ? " +" + fd : " " + fd));
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
