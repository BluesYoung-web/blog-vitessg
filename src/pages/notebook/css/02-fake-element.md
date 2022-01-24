---
title: CSS3-02伪元素
date: 2020-12-24 14:02:07
image: /img/css.jpg
description: CSS 伪元素
---

## 伪元素

```css
.fake::first-letter {
  /* 选择内部的第一个字符 */
  background-color: #efc;
  font-size: 50px;
  font-weight: bold;
}
.fake::first-line {
  /* 选择内部的第一行字符 */
  background-color: #efc;
  font-size: 50px;
  font-weight: bold;
}

.fake::before {
  /* 在内部元素之前加入以下内容，content可以为空但是必须写 */
  content: '来了老弟-----------';
}
.fake::after {
  /* 在内部元素之后加入以下内容，content可以为空但是必须写 */
  content: '来了老弟-----------';
}
```

