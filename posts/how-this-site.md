这个站点没有框架、没有打包器、没有依赖安装，整个仓库里唯一的第三方代码是一份自托管的 Markdown 解析器（marked，MIT，35 KB）。改完直接推，推完直接生效 —— GitHub Pages 托管的是仓库根目录本身。

## 为什么不做构建

博客是写作用品，不是工程项目。构建链（框架 → 打包 → 部署）换来的是组件化和热更新，但一篇几百行的文章用不上这些，付出的却是「写一篇字要先装 300 个包」。这里的取舍：

- **渲染在浏览器端完成**：Markdown 由 [marked](https://github.com/markedjs/marked) 在打开页面时解析，正文是 `posts/*.md` 原文件，Pages 原样伺服；
- **数据只有一个文件**：文章清单在 `posts.js`，加一篇就是「放一个 md + 加一条记录」，别的什么都不用动；
- **路由用 hash**：`#/post/<slug>` 直接是可分享的深链接，不依赖服务端 404 兜底。

## 加一篇文章

```js
// posts.js —— 数组最前面加一条（最新在最上，编号自动算）
window.POSTS = [
  {
    slug: "my-first-teardown",        // 进链接 #/post/my-first-teardown
    file: "posts/my-first-teardown.md",
    date: "2026-10-08",
    title: "拆解：某个 Skill 的设计",
    summary: "一句话说清这篇拆的是什么、留下了什么。",
    tags: ["技能工程"],
  },
  // …原有条目
];
```

正文就是普通 Markdown，代码块、表格、引用都支持。

## 字体

标题用 **Noto Serif SC Black**（SIL OFL），按当前出现的字切成 woff2 子集 —— 现在只有几十 KB。写了新文章出现新字后，跑一次 `python3 tools/subset.py` 重切；没跑也不会坏，新字落回系统衬线（宋体一系，观感接近）。

正文不加载任何 Web 字体：苹方 / 雅黑本来就是好字体，为动态文本切子集不划算。

## 结构

```
index.html    界面、样式、路由、渲染，全在这一个文件
posts.js      文章清单 —— 加一篇只改它
posts/*.md    正文，原样 markdown
vendor/       marked.min.js（唯一的第三方代码）
assets/fonts/ 展示字体子集（tools/subset.py 生成）
tools/        subset.py 切字
```

一个刻意的省略：没有 RSS、没有评论、没有统计。等真的有人要看了再加，加的时候每一样都该有明确的理由。
