#!/usr/bin/env python3
"""把展示字体（Noto Serif SC 900）切成 woff2 子集。

扫三处出现的字：index.html（界面文案）、posts.js（标题与摘要）、posts/*.md
（正文标题）。新增文章出现新字后重跑一次即可；没跑也不会坏——新字落回
系统衬线（Songti SC / SimSun），只是不那么一致。

    python3 tools/subset.py
"""
import base64
import io
import os
import re
import string
import sys

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "NotoSerifSC-var.ttf")
OUT = os.path.join(ROOT, "assets", "fonts", "display-900.woff2")
WEIGHT = 900


def texts():
    parts = []
    for name in ("index.html", "posts.js", "404.html"):
        p = os.path.join(ROOT, name)
        if os.path.exists(p):
            parts.append(open(p, encoding="utf8").read())
    posts = os.path.join(ROOT, "posts")
    if os.path.isdir(posts):
        for f in sorted(os.listdir(posts)):
            if f.endswith(".md"):
                parts.append(open(os.path.join(posts, f), encoding="utf8").read())
    # 只保留标题层会用到的：去掉 markdown 语法噪音不影响（多切几个字无害）
    return "".join(parts)


def main():
    text = texts()
    codes = sorted({ord(c) for c in text} | {ord(c) for c in string.printable})
    f = TTFont(SRC)
    instancer.instantiateVariableFont(f, {"wght": WEIGHT}, inplace=True)
    buf = io.BytesIO()
    f.save(buf)
    buf.seek(0)
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = ["*"]
    ss = subset.Subsetter(opts)
    ss.populate(unicodes=codes)
    font = TTFont(buf)
    ss.subset(font)
    out = io.BytesIO()
    font.save(out)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "wb") as fh:
        fh.write(out.getvalue())
    n = len([c for c in set(text) if ord(c) > 127])
    print(f"display-900.woff2: {len(out.getvalue())//1024} KB, {len(codes)} codepoints（含 {n} 个非 ASCII 字）")


if __name__ == "__main__":
    sys.exit(main())
