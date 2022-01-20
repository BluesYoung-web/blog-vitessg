<!--
 * @Author: zhangyang
 * @Date: 2022-01-10 16:16:14
 * @LastEditTime: 2022-01-20 15:46:31
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
    <MyCard class="my-card" />
  </main>
</template>

<style lang="scss" scoped>
#main-content {
  @apply w-full min-h-100vh flex justify-center relative;
  .my-card {
    @apply absolute top-10 <lg:hidden lg:right-2 xl:right-20 2xl:right-60;
  }
}
</style>

