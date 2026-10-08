# 阿喵的AI

<https://shiwanjun.github.io/> —— 阿喵的AI 的博客，每一篇都是一份「拆解报告」：把值得研究的开源实现拆开看，把用得上的留下来。

基于开源主题 [**Chirpy**](https://github.com/cotes2020/jekyll-theme-chirpy)（MIT）构建，跑在 GitHub Pages 上；这是 GitHub 原生的 Jekyll 静态博客方案。第一代手写版封存在 [`legacy-v1`](../../tree/legacy-v1) 分支。

## 写一篇新文章

在 `_posts/` 放一个 markdown 文件，文件名 `YYYY-MM-DD-slug.md`：

```markdown
---
title: 这篇拆什么
date: 2026-10-08 10:00:00 +0800
description: 一句话说清它拆的是什么、留下了什么。
categories: [记录]
tags: [技能工程]
---

正文……
```

推送后由 GitHub Actions 自动构建发布（`.github/workflows/pages-deploy.yml`）。
本地预览：`docker run --rm -p 4000:4000 -v "$PWD":/srv -w /srv ruby:3.4 sh -c "bundle install && bundle exec jekyll s"`。

## 站点配置

全在 [`_config.yml`](_config.yml)：站名、副标题、语言、社交链接、侧栏头像。
