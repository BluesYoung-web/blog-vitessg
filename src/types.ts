/*
 * @Author: zhangyang
 * @Date: 2022-01-10 16:16:14
 * @LastEditTime: 2022-01-18 11:08:28
 * @Description: 
 */
import type { ViteSSGContext } from 'vite-ssg';

export type UserModule = (ctx: ViteSSGContext) => void;

export type DocItem = {
  title: string;
  date: string;
  image: string;
  description: string;
  path: string;
};

export type BaseQuery = {
  page: number;
  limit: number;
  total: number;
}