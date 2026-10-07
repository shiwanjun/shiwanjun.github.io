# 拆开看

<https://shiwanjun.github.io/> —— summer 的博客。每一篇都是一份「拆解报告」：把值得研究的开源实现拆开看，把用得上的留下来。

**无依赖、无构建。** 改完直接推，推完直接生效 —— GitHub Pages 托管的就是仓库根目录。唯一的第三方代码是自托管的 [marked](https://github.com/markedjs/marked)（MIT，35 KB），在浏览器端把 Markdown 渲染出来。

## 加一篇文章

两步：

1. 新建 `posts/<slug>.md`，写 Markdown 正文；
2. 在 [`posts.js`](posts.js) 数组**最前面**加一条（最新在最上，编号 `No.XX` 自动算）：

```js
{
  slug: "my-first-teardown",          // 进链接 #/post/my-first-teardown
  file: "posts/my-first-teardown.md",
  date: "2026-10-08",
  title: "这篇拆什么",
  summary: "一句话说清它拆的是什么、留下了什么。",
  tags: ["技能工程"],
}
```

推上去之前想本地看一眼：`python3 -m http.server`，开 `http://localhost:8000`（浏览器不允许 `file://` 下取回 `.md`，必须走 http）。

## 写作原则

- **只写拆过的** —— 没有动手拆开的实现，不写成文章。
- **结论要能复现** —— 能跑的给配置，能抄的给代码，出处链回原作者。
- **留下的才算数** —— 能复用的部分要变成自己的工具，文章记录的是「留下来」的那部分。

## 动效

全部手写 vanilla（无动画库）：标题逐字入场 + 指针斥力「拆开」效果、路由橙色扫描过场、滚动显现、无限关键词带、自定义十字光标、磁性按钮、纸张噪点。只动 transform/opacity；`prefers-reduced-motion` 下整体退化为静态。

## 字体

标题用 Noto Serif SC Black（SIL OFL），按当前出现的字切成子集（`assets/fonts/display-900.woff2`）。写了新文章出现新字后跑一次：

```sh
python3 tools/subset.py
```

没跑也不会坏：新字落回系统衬线（宋体一系），观感接近，只是不那么一致。正文不加载 Web 字体 —— 苹方 / 雅黑本来就是好字体。

## 结构

```
index.html    界面、样式、hash 路由、渲染 —— 全在这一个文件
posts.js      文章清单 —— 加一篇只改它
posts/*.md    正文（原样 Markdown）
vendor/       marked.min.js —— 唯一的第三方代码
assets/fonts/ 展示字体子集（tools/subset.py 生成）
tools/        subset.py 切字
favicon.svg   橙底「拆」字
404.html      站点级 404（hash 路由下极少触发，兜底用）
.nojekyll     跳过 Jekyll 处理，文件原样伺服
```

## 设计

- 一个概念贯穿：**拆解报告**。编号（No.01…）、档案感的衬线大标题、拆解清单式的分隔线。
- 两种颜色各管一件事：墨色是叙述，柑橘橙是我的判断 —— 强调、编号、链接、进度条。
- 明暗双主题：默认跟随系统，手动切换后记住；`?theme=dark` 可强制（分享/验收用）。
- 一页只做一件事：首页只负责把人分发到报告去，没有搜索、没有评论、没有统计。
