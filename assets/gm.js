/* 修仙记事本 · gm.js —— 测试后门（仅 ?gm=1 时挂载）
 * 指定境界 / 随机物资 / 快速跳转，供作者自测，普通玩家不可见。
 */

var GM_REALM_PRESETS = [
  { label: "炼气 · 10 层", realmIdx: 0, cult: 425, flags: {}, lifespanAdd: 0, age: 40 },
  { label: "筑基 · 初期", realmIdx: 1, cult: 0, flags: { "筑基": 1 }, lifespanAdd: 130, age: 60 },
  { label: "筑基 · 后期", realmIdx: 1, cult: 900, flags: { "筑基": 1 }, lifespanAdd: 130, age: 90 },
  { label: "结丹 · 初期", realmIdx: 2, cult: 0, flags: { "筑基": 1, "结丹": 1 }, lifespanAdd: 380, age: 140 },
  { label: "结丹 · 中期", realmIdx: 2, cult: 1800, flags: { "筑基": 1, "结丹": 1 }, lifespanAdd: 380, age: 200 },
  { label: "结丹 · 后期", realmIdx: 2, cult: 3800, flags: { "筑基": 1, "结丹": 1 }, lifespanAdd: 380, age: 260 },
  { label: "结丹 · 圆满（下年触发清算）", realmIdx: 2, cult: 5199, flags: { "筑基": 1, "结丹": 1, "一品金丹": 1 }, lifespanAdd: 380, age: 280 },
  { label: "元婴", realmIdx: 3, cult: 0, flags: { "筑基": 1, "结丹": 1, "元婴": 1 }, lifespanAdd: 880, age: 320 },
  { label: "元婴 · 圆满（下年触发终算）", realmIdx: 3, cult: 4499, flags: { "筑基": 1, "结丹": 1, "元婴": 1 }, lifespanAdd: 880, age: 600 },
  { label: "化神", realmIdx: 4, cult: 0, flags: { "筑基": 1, "结丹": 1, "元婴": 1, "化神": 1 }, lifespanAdd: 1880, age: 700 }
];

function gmApplyRealm(preset) {
  S.realmIdx = preset.realmIdx;
  S.cult = preset.cult;
  S.age = preset.age;
  S.lifespan = D.lifespanBase + preset.lifespanAdd + 20;
  if (!preset.flags["筑基"]) delete S.flags["筑基"]; else S.flags["筑基"] = true;
  ["结丹", "元婴", "化神", "一品金丹", "假丹"].forEach(function (f) {
    if (preset.flags[f]) S.flags[f] = true; else delete S.flags[f];
  });
  S.winAt = 0;
  renderLifeAttrs();
  renderRealm();
  log("【GM】已跳转：" + preset.label + "（" + (S.age + STORY_BASE) + " 岁）", "highlight");
  saveGame();
}

function gmRandomLoot() {
  var notes = [];
  var ls = rand(200, 2000);
  S.inv["灵石"] = (S.inv["灵石"] || 0) + ls;
  notes.push("灵石 +" + ls);
  ["回春丹", "玉骨丹", "符咒", "妖丹"].forEach(function (k) {
    var n = rand(0, 4);
    if (n) { S.inv[k] = (S.inv[k] || 0) + n; notes.push(k + " +" + n); }
  });
  var grades = ["法器", "灵器", "法宝"];
  var na = rand(1, 3);
  for (var i = 0; i < na; i++) {
    grantArtifact(grades[rand(0, 2)], true);
  }
  var ns = rand(1, 3);
  var pool = D.spells.slice();
  for (var j = 0; j < ns && pool.length; j++) {
    var sp = pool.splice(rand(0, pool.length - 1), 1)[0];
    grantSpell(sp.id);
  }
  renderLifeAttrs();
  log("【GM】随机物资：" + notes.join(" · ") + "（法宝/法术见背包）", "highlight");
  saveGame();
}

function gmPanel() {
  var old = $("gm-panel");
  if (old) { old.remove(); return; }
  var p = document.createElement("div");
  p.id = "gm-panel";

  var mkRow = function (text) {
    var d = document.createElement("div");
    d.className = "gm-row";
    d.textContent = text;
    p.appendChild(d);
    return d;
  };
  mkRow("— 境界跳转 —");
  GM_REALM_PRESETS.forEach(function (preset) {
    var b = document.createElement("button");
    b.className = "gm-btn";
    b.type = "button";
    b.textContent = preset.label;
    b.addEventListener("click", function () { gmApplyRealm(preset); });
    p.appendChild(b);
  });
  mkRow("— 物资与状态 —");
  var acts = [
    ["随机物资", function () { gmRandomLoot(); }],
    ["灵石 +1000", function () { S.inv["灵石"] = (S.inv["灵石"] || 0) + 1000; renderLifeAttrs(); saveGame(); }],
    ["修为圆满（下年触发突破）", function () { var rm = D.realms[S.realmIdx]; if (rm && rm.need > 0) { S.cult = rm.need - 1; renderRealm(); saveGame(); } }],
    ["寿元 +100", function () { S.lifespan += 100; saveGame(); }],
    ["道心 +5", function () { S.daoXin = (S.daoXin || 0) + 5; saveGame(); }],
    ["开府（宗门）", function () { applyEffect({ factionInit: { route: "zong" } }); saveGame(); }],
    ["开府（散修）", function () { applyEffect({ factionInit: { route: "san" } }); saveGame(); }],
    ["情报 +100", function () { addIntel(100); renderLifeAttrs(); saveGame(); }],
    ["触发一场同阶斗法", function () {
      enterBattle(null, {
        name: "GM 试刀客", tier: 1, demonic: true, elem: "木",
        winText: "试刀客拱手认输。", winEffect: { inv: { "灵石": 50 } }, wuxue: [40, 80],
        lightText: "试刀客留了一手。", lightEffect: {},
        heavyText: "试刀客下了重手。", heavyEffect: { sanShang: 1 },
        deathText: "试刀也能死人，GM 也救不了你。兵解。"
      });
    }],
    ["清空存档", function () { clearSave(); window.location.reload(); }]
  ];
  acts.forEach(function (a) {
    var b = document.createElement("button");
    b.className = "gm-btn";
    b.type = "button";
    b.textContent = a[0];
    b.addEventListener("click", a[1]);
    p.appendChild(b);
  });
  mkRow("— 关闭面板再点 GM 即可 —");
  document.body.appendChild(p);
}

/* 入口：仅 ?gm=1 且进入修行视图后可用 */
if (/[?&]gm=1/.test(window.location.search)) {
  var gmBtn = document.createElement("button");
  gmBtn.id = "gm-fab";
  gmBtn.type = "button";
  gmBtn.textContent = "GM";
  gmBtn.addEventListener("click", gmPanel);
  document.body.appendChild(gmBtn);
}
