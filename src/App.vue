<!--
 * @Author: zhangyang
 * @Date: 2022-01-10 16:16:14
 * @LastEditTime: 2022-04-04 18:17:56
 * @Description: 
-->
<script setup lang="ts">
import { isDark } from '~/composables';
import { darkTheme } from 'naive-ui';
</script>

<template>
  <NConfigProvider :theme="isDark ? darkTheme : undefined">
    <router-view />
    <Music />
  </NConfigProvider>
</template>
