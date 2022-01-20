<!--
 * @Author: zhangyang
 * @Date: 2022-01-10 16:16:14
 * @LastEditTime: 2022-01-20 19:11:47
 * @Description: 
-->
<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <footer class="footer">
    &copy;2022 - Current &nbsp;&nbsp; By <a :href="t('nav.gitee_addr')" target="_blank">BluesYoung-web</a>
    <br />
    Powerd By <a href="https://github.com/antfu/vitesse" target="_blank">Vitesse</a>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  @apply w-full text-center text-gray-600 py-6;
}
</style>