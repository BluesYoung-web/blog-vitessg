<!--
 * @Author: zhangyang
 * @Date: 2022-01-24 10:33:34
 * @LastEditTime: 2022-01-25 09:42:41
 * @Description: 所有文章
-->
<route lang="yaml">
meta:
  layout: blog
</route>


<script lang="ts" setup>
import { useDocsStore } from '~/stores/docs';
const { allDocs } = useDocsStore();
</script>

<template>
  <main id="main-content">
    <DocList class="w-full" :data="allDocs" :show-image="false" />
    <MyDoc class="card my-doc" />
  </main>
</template>

<style lang="scss" scoped>
#main-content {
  @apply min-h-100vh flex justify-center;

  .card {
    @apply absolute <lg:hidden lg:right-2 xl:right-20 2xl:right-20;
  }
  .my-doc {
    @apply top-30;
  }
}
</style>