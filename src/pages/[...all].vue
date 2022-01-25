<!--
 * @Author: zhangyang
 * @Date: 2022-01-10 16:16:14
 * @LastEditTime: 2022-01-25 10:29:22
 * @Description: 404
-->
<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div class="dark:text-gray-100">
    {{ t('not-found') }}
  </div>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>
