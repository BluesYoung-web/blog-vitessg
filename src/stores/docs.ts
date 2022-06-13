/*
 * @Author: zhangyang
 * @Date: 2022-01-10 16:16:14
 * @LastEditTime: 2022-06-13 10:01:13
 * @Description: 
 */
import { acceptHMRUpdate, defineStore } from 'pinia';
import type { DocItem, DocIndexItem } from '~/types';

export const useDocsStore = defineStore('docs', () => {
  /**
   * 所有的文章列表
   */
  const allDocs = new Array<DocItem>();
  /**
   * 目录树
   */
  const docTree = new Array<DocIndexItem>();

  const docs = import.meta.globEager('../pages/**/*.md');

  const occuredObj: Record<string, DocIndexItem> = {};
  const generateTree = (target: DocIndexItem[], arr: string[], v: any) => {
    if (arr.length < 2) {
      return;
    } else if (arr.length === 2) {
      const [l1, l2] = arr;
      if (occuredObj[l1]) {
        occuredObj[l1].children?.push({
          ...v,
          key: l2,
          label: v.title
        });
      } else {
        occuredObj[l1] = {
          key: l1,
          label: l1,
          children: [{
            ...v,
            key: l2,
            label: v.title
          }]
        };
        target.push(occuredObj[l1]);
      }
    } else {
      const f = arr.shift() as string;
      if (!occuredObj[f]) {
        occuredObj[f] = {
          key: f,
          label: f,
          children: []
        };
        target.push(occuredObj[f]);
      }
      generateTree(occuredObj[f]?.children ?? [], arr, v);
    }
  };

  for (const [key, value] of Object.entries(docs)) {
    const doc = {
      ...value.frontmatter,
      path: key.slice(8, -3),
      // 修复时间 bug
      date: value.frontmatter.date.slice(0, -1),
    } as DocItem
    // 文章收集
    allDocs.push(doc);

    const tree_arr = key.slice(9, -3).split('/');
    // 生成目录树
    generateTree(docTree, tree_arr, doc);
  }
  // 按时间倒序
  allDocs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  /**
   * 首页显示的文章，默认展示最新的 10 条
   */
  const homeDocs = computed(() => allDocs.slice(0, 10));

  return {
    allDocs,
    homeDocs,
    docTree
  };
});

// 热更新
import.meta.hot && import.meta.hot.accept(acceptHMRUpdate(useDocsStore, import.meta.hot));
