<!--
 * @Author: zhangyang
 * @Date: 2022-01-17 11:24:16
 * @LastEditTime: 2022-01-21 10:47:31
 * @Description: 头部导航栏组件
-->
<script lang="ts" setup>
import { isClient } from '@vueuse/core';
import { isDark, toggleDark } from '~/composables'
const { t, availableLocales, locale } = useI18n();
const toggleLocales = () => {
  const locales = availableLocales;
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
};

const { directions, y } = useScroll(isClient ? window : null);
const { top, bottom } = toRefs(directions);
const isScrollUp = ref(false);
watchEffect(() => {
  if (top.value) {
    isScrollUp.value = true;
  } else if (bottom.value || y.value === 0) {
    isScrollUp.value = false;
  }
});
</script>

<template>
  <nav class="nav" :class="[isScrollUp ? 'up' : '']">
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
      <a class="item" target="_blank" :title="t('nav.gitee')" :href="t('nav.gitee_addr')">
        <simple-icons-gitee class="text-sm" />
        <span>Gitee</span>
      </a>
      <a class="item" target="_blank" :title="t('nav.github')" :href="t('nav.github_addr')">
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
.up {
  position: fixed !important;
  @apply bg-white opacity-90 top-0 @light:text-gray-900 dark:bg-gray-500 @dark:text-purple-500;
}
.nav {
  @apply flex w-full font-bold text-sm lg:text-lg py-5 px-8 absolute z-1 transition duration-100 ease-linear;


  .left {
    @apply w-3/5;
  }
  .right {
    @apply w-2/5 flex justify-end text-base font-normal;
    .item {
      @apply flex justify-center items-center ml-3 lg:ml-5 hover:cursor-pointer;
      span {
        @apply <lg:hidden <xl:transform <xl:text-xs inline-block;
      }
    }
  }
}
</style>