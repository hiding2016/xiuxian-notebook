#!/usr/bin/env python3
"""修仙记事本 · 发布打包脚本

把 index.html + assets/ 打包为 ../修仙记事本.zip，自动排除 tools/ 等开发目录。
用法: python tools/打包.py
"""
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent  # 仓库根目录
OUT = ROOT / "修仙记事本.zip"                  # 输出到仓库根（已 gitignore）
EXCLUDE = {"tools", "content_frag"}             # 开发目录，不纳入发布包

with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as zf:
    # index.html
    zf.write(ROOT / "index.html", "index.html")
    # assets/ 下所有文件，排除 EXCLUDE 目录
    assets = ROOT / "assets"
    for f in sorted(assets.rglob("*")):
        if f.is_dir():
            continue
        if any(p in EXCLUDE for p in f.parts):
            continue
        zf.write(f, str(f.relative_to(ROOT)))
    count = len(zf.namelist())

out_size = OUT.stat().st_size
print(f"✓ 打包完成: {OUT} ({out_size/1024:.0f} KB, {count} 个文件)")
