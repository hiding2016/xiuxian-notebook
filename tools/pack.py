#!/usr/bin/env python3
"""修仙记事本 · 发布打包脚本

把 index.html + assets/ 打包为 ../修仙记事本.zip，自动排除 tools/ 等开发目录。
用法: python tools/pack.py
"""
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT.parent / "修仙记事本.zip"
EXCLUDE = {"tools", "content_frag"}

with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as zf:
    zf.write(ROOT / "index.html", "index.html")
    assets = ROOT / "assets"
    for f in sorted(assets.rglob("*")):
        if f.is_dir():
            continue
        if any(p in EXCLUDE for p in f.parts):
            continue
        zf.write(f, str(f.relative_to(ROOT)))
    count = len(zf.namelist())

out_size = OUT.stat().st_size
print(f"打包完成: {OUT.name} ({out_size/1024:.0f} KB, {count} 个文件)")
