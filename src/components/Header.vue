<!--
 * @Author: zhangyang
 * @Date: 2022-01-17 11:24:16
 * @LastEditTime: 2022-01-17 15:08:06
 * @Description: 头部导航栏组件
-->
<script lang="ts" setup>
import { isDark, toggleDark } from '~/composables'
const { t, availableLocales, locale } = useI18n();
const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales;
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
};
</script>

<template>
  <nav class="nav">
    <div class="left">
      <a href="/">{{ t('nav.title') }}</a>
    </div>
    <div class="right">
      <a class="item" href="/readme" :title="t('nav.doc')">
        <ic-round-menu-book />
        <span>文章</span>
      </a>
      <a class="item" href="/readme" :title="t('nav.love')">
        <noto-heart-suit class="text-sm" />
        <span>拥抱开源</span>
      </a>
      <a class="item" target="_blank" :title="t('nav.gitee')" href="https://gitee.com/BluesYoung-web">
        <simple-icons-gitee class="text-sm" />
        <span>Gitee</span>
      </a>
      <a class="item" target="_blank" :title="t('nav.github')" href="https://github.com/BluesYoung-web">
        <ci-github />
        <span>Github</span>
      </a>
      <button class="item" :title="t('button.toggle_dark')" @click="toggleDark()">
        <carbon-moon v-if="isDark" />
        <carbon-sun v-else />
      </button>
      <a class="item" :title="t('button.toggle_langs')" @click="toggleLocales()">
        <carbon-language />
      </a>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  @apply flex w-full font-bold text-sm lg:text-lg py-5 px-8 absolute z-1;
  .left {
    @apply w-3/5;
  }
  .right {
    @apply w-2/5 flex justify-end text-base font-normal;
    .item {
      @apply flex justify-center items-center ml-3 lg:ml-5 hover:cursor-pointer;
      span {
        @apply lg:inline-block hidden;
      }
    }
  }
}
</style>