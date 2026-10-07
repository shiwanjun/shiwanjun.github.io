/**
 * 全部文章。
 *
 * ══════════════════════════════════════════════
 *  加一篇：两步——
 *   1. 新建 posts/<slug>.md（markdown 正文）
 *   2. 往下面数组最前面加一条（最新在最上，编号自动算）
 *  改完直接推，推完直接生效。别的文件都不用动。
 * ══════════════════════════════════════════════
 *
 *   slug    短名，进链接 #/post/<slug>
 *   file    正文 markdown 的路径
 *   date    YYYY-MM-DD，列表展示与排序依据
 *   title   标题（展示字体子集里没有的字会落到系统衬线，重跑 tools/subset.py 即可）
 *   summary 一句话，列表页用
 *   tags    两三个关键词
 */
window.POSTS = [
  {
    slug: "how-this-site",
    file: "posts/how-this-site.md",
    date: "2026-10-07",
    title: "这个站点是怎么搭的",
    summary: "无依赖、无构建、改完直接推——一个博客需要的最小基建。",
    tags: ["站点", "记录"],
  },
  {
    slug: "hello",
    file: "posts/hello.md",
    date: "2026-10-07",
    title: "开篇：为什么有这个博客",
    summary: "把值得研究的拆开看，把用得上的留下来——这份报告的说明书。",
    tags: ["记录", "开篇"],
  },
];
