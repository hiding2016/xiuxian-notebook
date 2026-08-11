/* data.js 事件按境界拆分（一次性工具，保留备用）
 * 规则：eff = e.realms || (cond.flag==="筑基" ? [1] : [0])
 *   eff.length>1 → events-cross.js；否则按 eff[0] 分入 events-lianqi/zhuji/jindan/yuanying.js
 * 输出：assets/data/events-*.js（window.GAME_EVENTS_R0/R1/R2/R3/RX），保留原文与缩进
 */
"use strict";
const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "..", "assets", "data.js");
const src = fs.readFileSync(FILE, "utf8");

const startMarker = "  events: [";
const start = src.indexOf(startMarker);
if (start < 0) throw new Error("events array not found");
const arrStart = start + startMarker.length;

/* 括号匹配找数组尾（跳过字符串与行注释） */
let depth = 1, i = arrStart, end = -1;
while (i < src.length) {
  const ch = src[i];
  if (ch === '"') { i++; while (i < src.length && src[i] !== '"') { if (src[i] === "\\") i++; i++; } }
  else if (ch === "/" && src[i + 1] === "/") { while (i < src.length && src[i] !== "\n") i++; }
  else if (ch === "/" && src[i + 1] === "*") { i += 2; while (i < src.length && !(src[i] === "*" && src[i + 1] === "/")) i++; i++; }
  else if (ch === "[") depth++;
  else if (ch === "]") { depth--; if (depth === 0) { end = i; break; } }
  i++;
}
if (end < 0) throw new Error("events array end not found");
const body = src.slice(arrStart, end);

/* 切分为顶层条目（按 { 深度 1→0） */
const items = [];
let d = 0, cur = -1;
for (let j = 0; j < body.length; j++) {
  const ch = body[j];
  if (ch === '"') { j++; while (j < body.length && body[j] !== '"') { if (body[j] === "\\") j++; j++; } continue; }
  if (ch === "/" && body[j + 1] === "/") { while (j < body.length && body[j] !== "\n") j++; continue; }
  if (ch === "/" && body[j + 1] === "*") { j += 2; while (j < body.length && !(body[j] === "*" && body[j + 1] === "/")) j++; j++; continue; }
  if (ch === "{") { d++; if (d === 1) cur = j; }
  else if (ch === "}") { d--; if (d === 0 && cur >= 0) { items.push(body.slice(cur, j + 1)); cur = -1; } }
}

/* 分类 */
const groups = { R0: [], R1: [], R2: [], R3: [], RX: [] };
for (const it of items) {
  const mRealms = it.match(/realms:\s*\[([0-9,\s]*)\]/);
  let eff;
  if (mRealms) eff = mRealms[1].split(",").map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
  else eff = /cond:\s*\{[^}]*flag:\s*"筑基"/.test(it) ? [1] : [0];
  if (!eff.length) eff = [0];
  const key = eff.length > 1 ? "RX" : "R" + eff[0];
  (groups[key] || groups.RX).push(it);
}

/* 写文件 */
const outDir = path.join(__dirname, "..", "assets", "data");
fs.mkdirSync(outDir, { recursive: true });
const names = { R0: "events-lianqi.js", R1: "events-zhuji.js", R2: "events-jindan.js", R3: "events-yuanying.js", RX: "events-cross.js" };
const titles = { R0: "炼气期", R1: "筑基期", R2: "金丹期", R3: "元婴期", RX: "跨境界" };
for (const k of Object.keys(names)) {
  const header = "/* 修仙记事本 · " + titles[k] + "事件（自 data.js 拆分，引擎加载顺序在本文件之后合并） */\n" +
    "window.GAME_EVENTS_" + k + " = [\n";
  const content = header + groups[k].map(it => "    " + it).join(",\n") + "\n];\n";
  fs.writeFileSync(path.join(outDir, names[k]), content);
  console.log(names[k], groups[k].length + " 条");
}

/* 回写 data.js：events 改为合并 */
const merged = startMarker + "\n    // 事件已按境界拆分至 assets/data/events-*.js，此处合并\n" +
  "  ].concat(window.GAME_EVENTS_R0 || [], window.GAME_EVENTS_R1 || [], window.GAME_EVENTS_R2 || [], window.GAME_EVENTS_R3 || [], window.GAME_EVENTS_RX || [])";
fs.writeFileSync(FILE, src.slice(0, start) + merged + src.slice(end + 1));
console.log("data.js events 段已改为 concat 合并");
