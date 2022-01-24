<!--
 * @Author: zhangyang
 * @Date: 2022-01-10 16:16:14
 * @LastEditTime: 2022-01-24 10:57:16
 * @Description: 
-->
<route lang="yaml">
meta:
  layout: home
</route>

<script lang="ts" setup>
import { useDocsStore } from '~/stores/docs';
const { homeDocs } = useDocsStore();
</script>

<template>
  <main id="main-content">
    <DocList :data="homeDocs" />
    <MyCard class="card my-card" />
    <MyDoc class="card my-doc" />
  </main>
</template>

<style lang="scss" scoped>
#main-content {
  @apply w-full min-h-100vh flex justify-center relative;

  .card {
    @apply absolute <lg:hidden lg:right-2 xl:right-20 2xl:right-60;
  }
  .my-card {
    @apply top-10;
  }
  .my-doc {
    @apply top-110;
  }
}
</style>

