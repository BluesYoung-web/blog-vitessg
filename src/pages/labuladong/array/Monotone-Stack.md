---
title: 单调栈
description: 单调栈
date: 2022-05-11 15:42:00
image: /img/algorithm.webp
---

[[toc]]

## 去除重复字母

### 题目描述

[<cib-leetcode /> 力扣原题-316. 去除重复字母](https://leetcode-cn.com/problems/remove-duplicate-letters/)
[<cib-leetcode /> 力扣原题-1081. 不同字符的最小子序列](https://leetcode-cn.com/problems/smallest-subsequence-of-distinct-characters/)

给定一个字符串 `s`，请去除字符串中重复的字母，使得每个字母只出现一次

在**不打乱字符顺序的情况下返回结果的字典序最小**

**提示：**
- s.length ∈ [1, 1e4]
- s 全部由小写字母组成


### TDD

<n-collapse>
  <n-collapse-item name="1">
    <template #header>
      <vscode-icons-file-type-testts />
      <span class="ml-1">测试代码</span>
    </template>

```ts
import { it, expect, describe } from 'vitest';

describe('demo', () => {
  it.each([
    ['baabc', 'abc'],
    ['cbacdcbc', 'acdb']
  ])('去除重复字母(%s) -> %s', (s, res) => {
    expect(removeDuplicateLetters(s)).toBe(res);
  });
});
```
  </n-collapse-item>
</n-collapse>

### 具体实现

核心思想——**单调栈**

```ts
function removeDuplicateLetters(str: string) {
  const len = str.length;
  // 单调栈
  const stack: string[] = [];

  for (let i = 0; i < len; i++) {
    // 栈中存在相同的元素，直接跳过
    if (stack.includes(str[i])) {
      continue;
    }
    while (
      // 要入栈的元素小于等于当前栈顶的元素
      str[i] < stack[stack.length - 1] &&
      // 字符串后面存在与栈顶元素相同的元素
      str.indexOf(stack[stack.length - 1], i) > -1
    ) {
      // 弹出当前的栈顶元素
      stack.pop();
    }
    stack.push(str[i]);
  }

  return stack.join('');
}

```