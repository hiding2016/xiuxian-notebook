/* 内容分片合并：把 content_frag/*.js（裸数组字面量）插入 data.js 标记处
 * 用法：node tools/merge_frag.js
 * 幂等：标记保留，可重复运行（片段内容会替换同名标记段——简单起见不重复插入：
 *       每个标记只允许插入一次，已插入过则报错，需先手工清理旧段）
 */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DATA = path.join(ROOT, "assets/data.js");
const JOBS = [
  { marker: "/* @@V2_DAILY@@ */", frag: "content_frag/daily.js", label: "筑基日常池" },
  { marker: "/* @@V2_CHAINS@@ */", frag: "content_frag/chains.js", label: "链续写" },
  { marker: "/* @@V2_JIEDAN@@ */", frag: "content_frag/jiedan.js", label: "结丹内容" },
  { marker: "/* @@V2_DUNGEONS@@ */", frag: "content_frag/dungeons.js", label: "秘境", wrap: ",\n" },
  { marker: "/* @@V2_DUNGEONS_ENTRIES@@ */", frag: "content_frag/dungeon_entries.js", label: "秘境入口" }
];

let src = fs.readFileSync(DATA, "utf8");
for (const job of JOBS) {
  const fp = path.join(ROOT, job.frag);
  if (!fs.existsSync(fp)) { console.log("跳过（无片段）: " + job.label); continue; }
  const text = fs.readFileSync(fp, "utf8").trim();
  // 语法校验：必须是裸数组字面量
  let arr;
  try { arr = eval(text); } catch (e) { console.error("✗ 片段语法错误 " + job.frag + ": " + e.message); process.exit(1); }
  if (!Array.isArray(arr) || !arr.length) { console.error("✗ 片段非数组或为空: " + job.frag); process.exit(1); }
  if (!src.includes(job.marker)) { console.error("✗ 标记不存在（已合并过？）: " + job.marker); process.exit(1); }
  // 数组文本转对象列表文本（去首尾 []）
  let body = text.replace(/^\s*\[/, "").replace(/\]\s*;?\s*$/, "").trim();
  let injection;
  if (job.wrap) {
    // 秘境数组中间插入：前方补逗号承接上一个元素
    injection = job.wrap + body;
  } else {
    // 事件列表区插入：尾部补逗号衔接后续事件
    injection = body + ",\n    " + job.marker;
  }
  src = src.replace(job.marker, injection);
  console.log("✓ 合并 " + job.label + "：" + arr.length + " 条");
}
fs.writeFileSync(DATA, src);
console.log("完成 → assets/data.js");
