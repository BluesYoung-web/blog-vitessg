<!--
 * @Author: zhangyang
 * @Date: 2022-01-10 16:16:14
 * @LastEditTime: 2022-01-18 15:42:32
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
    <div class="side"></div>
  </main>
</template>

<style lang="scss" scoped>
#main-content {
  @apply w-full min-h-100vh flex justify-center;
}
</style>

