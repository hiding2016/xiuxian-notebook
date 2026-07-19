/* 秘境诊断：直接驱动秘境 N 次，统计到达深度/三宝发放/选项点击
 * 用法：node tools/dgtest.js [N=200] [秘境id=mj_dongfu]
 */
"use strict";
const { makeEnv } = require("./sim.js");

const N = parseInt(process.argv[2] || "200", 10);
const DGID = process.argv[3] || "mj_dongfu";

const ctx = makeEnv();
ctx.ATTRS.forEach((n) => { ctx.alloc[n] = 50; });
for (const t of ctx.D.talents) if (t.id === "wuxing") ctx.talent = t;
ctx.newGame();
ctx.S.realmIdx = 1;
ctx.S.flags["筑基"] = true;
ctx.S.age = 60;
ctx.S.inv["灵石"] = 500;
ctx.S.inv["符咒"] = 5;

let depthHist = {}, sanbaoTotal = 0, clicks = 0, sanbaoClicks = 0;
for (let run = 0; run < N; run++) {
  ctx.S.dg = null;
  ctx.S.waitingChoice = false;
  ctx.enterDungeon({ id: "test_entry_" + run, dungeon: DGID, text: "测试入口。" });
  let guard = 0, maxDepth = 0;
  while (ctx.S && ctx.S.dg && guard < 30) {
    guard++;
    maxDepth = Math.max(maxDepth, ctx.S.dg.depth);
    if (!ctx.S.waitingChoice) break;
    const box = ctx.__els["choice-btns"];
    const btns = [];
    const walk = (n) => { n.children.forEach((c) => { if (c._listeners.click && c._listeners.click.length) btns.push(c); walk(c); }); };
    walk(box);
    if (!btns.length) break;
    clicks++;
    // 模拟人类：优先点疑似宝箱选项
    const sb = btns.find((b) => /玉盒|储物袋|开核|星核|宝匣|取/.test(b.textContent));
    (sb || btns[Math.floor(Math.random() * btns.length)]).click();
    if (sb) sanbaoClicks++;
  }
  depthHist[maxDepth] = (depthHist[maxDepth] || 0) + 1;
  sanbaoTotal += ["玄冰魄", "炎髓晶", "雷灵枝"].filter((m) => ctx.S.flags[m]).length;
  ["玄冰魄", "炎髓晶", "雷灵枝"].forEach((m) => delete ctx.S.flags[m]);
  if (ctx.S) ctx.S.pendingDungeonEvent = null;
}
console.log("秘境 " + DGID + " × " + N + " 次");
console.log("最深到达层分布(0起):", depthHist);
console.log("三宝获得总数: " + sanbaoTotal + "（宝箱类选项点击 " + sanbaoClicks + "/" + clicks + "）");
