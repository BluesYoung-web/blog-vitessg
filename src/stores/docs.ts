/*
 * @Author: zhangyang
 * @Date: 2022-01-10 16:16:14
 * @LastEditTime: 2022-01-21 15:26:46
 * @Description: 
 */
import { cloneDeep } from 'lodash';
import { acceptHMRUpdate, defineStore } from 'pinia';
import type { DocItem } from '~/types';
export const useDocsStore = defineStore('docs', () => {
  /**
   * 所有的文章列表
   */
  const allDocs = ref<DocItem[]>([]);
  /**
   * 所有目录
   */
  const allDirs = ref<Array<string>>([]);

  const totalDocs = new Array<DocItem>();
  const totalDirs = new Set<string>();
  const docs = import.meta.globEager('../pages/**/*.md');
  for (const [key, value] of Object.entries(docs)) {
    console.log(key);
    console.log(value);
    // 文章收集
    totalDocs.push({
      ...value,
      path: key.slice(8, -3),
      // 修复时间 bug
      date: value.date.slice(0, -1)
    } as DocItem);
    // 目录收集
    let dir = key.slice(9);
    dir = dir.slice(0, dir.lastIndexOf('/'));
    totalDirs.add(dir);
  }
  // 按时间倒序
  totalDocs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  allDocs.value = cloneDeep(totalDocs);
  allDirs.value = [...totalDirs];
  /**
   * 首页显示的文章，默认展示最新的 10 条
   */
  const homeDocs = computed(() => allDocs.value.slice(0, 10));

  return {
    allDocs,
    homeDocs,
    allDirs
  };
});

// 热更新
import.meta.hot && import.meta.hot.accept(acceptHMRUpdate(useDocsStore, import.meta.hot));
