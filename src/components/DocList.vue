<!--
 * @Author: zhangyang
 * @Date: 2022-01-18 14:28:36
 * @LastEditTime: 2022-01-18 16:04:24
 * @Description: 文章列表
-->
<script lang="ts" setup>
import type { DocItem } from '~/types';

defineProps<{
  data: DocItem[];
}>();
</script>

<template>
  <div class="list">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="item"
    >
      <NCard class="my-4 rounded" :title="item.title" hoverable @click="$router.push(item.path)">
        <template #cover>
          <NImage :src="item.image ?? '/img/default.jpg'" fallback-src="/img/default.jpg" />
        </template>
        {{ item.description }}
        <template #action>
          <NTime :time="new Date(item.date)" format="yyyy年MM月dd日 kk:mm:ss" />
        </template>
      </NCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  @apply w-49/50 lg:w-1/3;

  .item {
    @apply first:mt-10 hover:cursor-pointer;
  }
}
</style>