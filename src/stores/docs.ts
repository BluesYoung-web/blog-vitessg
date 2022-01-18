/*
 * @Author: zhangyang
 * @Date: 2022-01-10 16:16:14
 * @LastEditTime: 2022-01-18 16:27:21
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

  const totalDocs = new Array<DocItem>();
  const docs = import.meta.globEager('../pages/**/*.md');
  for (const [key, value] of Object.entries(docs)) {
    console.log(key);
    console.log(value);
    totalDocs.push({
      ...value,
      path: key.slice(8, -3),
      // 修复时间 bug
      date: value.date.slice(0, -1)
    } as DocItem);
  }
  // 按时间倒序
  totalDocs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  allDocs.value = cloneDeep(totalDocs);
  /**
   * 首页显示的文章，默认展示最新的 10 条
   */
  const homeDocs = computed(() => allDocs.value.slice(0, 10));

  return {
    allDocs,
    homeDocs
  };
});

// 热更新
import.meta.hot?.accept(acceptHMRUpdate(useDocsStore, import.meta.hot));
