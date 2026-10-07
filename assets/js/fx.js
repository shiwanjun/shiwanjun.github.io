/* 阿喵的AI · 动效脚本：标题逐字入场 + 首页关键词跑马灯
   尊重 prefers-reduced-motion；其余动效在 SCSS 层（纯 CSS）。 */
(function () {
  'use strict';
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* —— 文章标题逐字入场（Chirpy 的标题是 main h1[data-toc-skip]） —— */
  var title = document.querySelector('main h1[data-toc-skip]');
  if (title && title.textContent.trim() && !title.querySelector('.fx-ch')) {
    var text = title.textContent;
    title.setAttribute('aria-label', text);
    title.textContent = '';
    Array.from(text).forEach(function (c, i) {
      var s = document.createElement('span');
      s.className = 'fx-ch';
      s.style.setProperty('--i', i);
      s.textContent = c;
      title.appendChild(s);
    });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { title.classList.add('fx-in'); });
    });
  }

  /* —— 首页关键词跑马灯（插在文章列表上方） —— */
  var list = document.getElementById('post-list');
  if (list && !document.querySelector('.fx-ticker')) {
    var el = document.createElement('div');
    el.className = 'fx-ticker';
    el.setAttribute('aria-hidden', 'true');
    var kw = 'AGENT SKILLS \u{1F43E} AI IMAGE \u{1F43E} AI VIDEO \u{1F43E} LOCAL-FIRST DATA \u{1F43E} TRAVEL ATLAS \u{1F43E} 阿喵的AI \u{1F43E} ';
    el.innerHTML =
      '<div class="fx-ticker-track"><span>' + kw + kw + '</span><span>' + kw + kw + '</span></div>';
    list.parentNode.insertBefore(el, list);
  }
})();
