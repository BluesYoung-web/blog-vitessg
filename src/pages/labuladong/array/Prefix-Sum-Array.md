---
title: 前缀和数组
description: 前缀和数组
date: 2022-04-24 15:30:00
image: /img/algorithm.webp
---

[[toc]]

## 区域和检索-数组不可变

### 题目描述

[<cib-leetcode /> 力扣原题-303. 区域和检索 - 数组不可变](https://leetcode-cn.com/problems/range-sum-query-immutable/)

给定一个整数数组 `nums`，处理以下类型的多个查询：
1. 计算索引 `left` 和 `right` 闭区间内所有元素的和，`left <= right`

**提示：**
- nums.length ∈ [1, 1e4]
- nums[i] ∈ [-1e5, 1e5]
- 0 <= left <= right <= nums.length>
- **最多调用 `1e4` 次 `sumRange` 方法**

### TDD

<n-collapse>
  <n-collapse-item name="1">
    <template #header>
      <vscode-icons-file-type-testts />
      <span class="ml-1">测试代码</span>
    </template>

```ts
import { describe, expect, it } from 'vitest'

describe('区域和搜索', () => {
  const numArray = new NumArray([-2, 0, 3, -5, 2, -1]);

  it('1', () => {
    expect(numArray.sumRange(0, 2)).toEqual(1);
  });

  it('2', () => {
    expect(numArray.sumRange(2, 5)).toEqual(-1);
  });

  it('3', () => {
    expect(numArray.sumRange(0, 5)).toEqual(-3);
  });
});
```
  </n-collapse-item>
</n-collapse>

### 具体实现

```ts
class NumArray {
  // 存储所有元素顺序累加和的数组
  public sumArr: number[] = [0];
  constructor(
    public nums: number[]
  ) {
    const len = this.nums.length + 1;
    // 遍历元素，计算累加和
    for (let i = 1; i < len; i++) {
      this.sumArr[i] = this.sumArr[i - 1] + nums[i - 1];
    }
  }
  // [1, 4] 内的所有元素之和 => sumArr[5] - sumArr[1]
  sumRange(left: number, right: number): number {
    return this.sumArr[right + 1] - this.sumArr[left];
  }
}
```

## 二维区域和检索

## 和为 k 的子数组