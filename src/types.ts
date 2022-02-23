/*
 * @Author: zhangyang
 * @Date: 2022-01-10 16:16:14
 * @LastEditTime: 2022-02-23 14:15:33
 * @Description: 
 */
import type { ViteSSGContext } from 'vite-ssg';

export type UserModule = (ctx: ViteSSGContext, ...args: any[]) => void;

export type DocItem = {
  title: string;
  date: string;
  image: string;
  description: string;
  path: string;
  [prop: string]: any;
};

export type DocIndexItem = {
  key: string;
  label: string;
  children?: DocIndexItem[];
} & Partial<DocItem>;

export type BaseQuery = {
  page: number;
  limit: number;
  total: number;
}