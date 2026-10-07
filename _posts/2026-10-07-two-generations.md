---
title: 这个博客的两代：从手写到 Chirpy
date: 2026-10-07 11:00:00 +0800
description: 先手写了一个无依赖版本，后来换到 GitHub 原生的 Jekyll——两次选择的理由都记下来。
categories: [记录]
tags: [站点]
---

这个博客今天换了一次底座。两代的做法和取舍，都值得记下来。

## 第一代：纯手写，无依赖

最早的版本是手写的：一个 `index.html`、一个 `posts.js` 数据文件、自托管的 Markdown 解析器（marked，MIT，35 KB），Markdown 在浏览器端渲染，hash 路由，改完直接推、推完直接生效。连标题字体都是按用到的字切成几十 KB 的子集，动效也是手写的：标题逐字入场、路由时一片橙色扫过、指针把标题拆开的斥力场。

写到这里我意识到：**动效系统的每一分精力，都是从写内容里扣出来的。**

## 第二代：Chirpy（GitHub 原生 Jekyll）

现在换到了 [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy)（MIT）——GitHub 静态博客的事实标准。构建交给 GitHub Actions，写作回归最朴素的形式：

```bash
# _posts/ 里放一个 2026-10-07-xxx.md，写上 frontmatter，push 即发布
```

| | 第一代（手写） | 第二代（Chirpy） |
| --- | --- | --- |
| 渲染 | 浏览器端 marked | Jekyll 构建期静态生成 |
| 搜索 | 无 | 全文搜索 |
| 目录 | 无 | 自动 TOC + 滚动高亮 |
| 归档/分类 | 无 | 归档、分类、标签三套视图 |
| 动效 | 手写斥力场、扫描过场 | 主题自带的优雅微交互 |
| 写作成本 | 改两个文件 | 放一个 markdown 文件 |

第一代没有白写：它的信息架构（拆解报告、编号、三条原则）原样搬了过来，手写的过程也让我读懂了静态站点的每一层。原版完整封存在 [`legacy-v1`](https://github.com/shiwanjun/shiwanjun.github.io/tree/legacy-v1) 分支。
