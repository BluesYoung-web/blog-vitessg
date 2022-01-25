<!--
 * @Author: zhangyang
 * @Date: 2022-01-24 10:33:34
 * @LastEditTime: 2022-01-25 17:04:42
 * @Description: 关于
-->
<script lang="ts" setup>
const { locale } = useI18n();
</script>

<template>
  <AboutMe v-if="locale === 'zh-CN'" />
  <AboutMeEN v-else />
</template>
