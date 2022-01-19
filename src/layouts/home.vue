<!--
 * @Author: zhangyang
 * @Date: 2022-01-16 14:16:48
 * @LastEditTime: 2022-01-19 15:33:01
 * @Description: 
-->
<script lang="ts" setup>
// 只有在浏览器端才存在 window
import { isClient } from '@vueuse/core';

const { t } = useI18n();
const scorll = (top?: number) => {
  const { offsetTop } = document.querySelector('#main-content') as HTMLElement;
  isClient && window.scrollTo({
    top: top ?? offsetTop,
    behavior: 'smooth'
  });
};
const { y } = useScroll(isClient ? window : null);
</script>
<template>
  <div class="main">
    <header class="header">
      <Header />
      <div class="h-full flex flex-col justify-center items-center">
        <p class="text-2xl font-bold mb-1 lg:text-4xl">{{ t('nav.title') }}</p>
        <OneSay class="text-xl lg:text-2xl text-center" />
      </div>
      <Music />
      <div class="down">
        <ri-arrow-down-s-line class="icon" @click="() => scorll()" />
      </div>
    </header>
    <router-view />
    <Footer />
    <div v-show="y > 720" class="top-btn" :title="t('button.back_to_top')" @click="() => scorll(0)">
      <bi-arrow-up-circle />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  @apply text-gray-50 dark:text-purple-500;
  .top-btn {
    @apply fixed right-2 bottom-2 lg:right-10 lg:bottom-10 text-2xl text-gray-400 dark:text-purple-500 hover:cursor-pointer;
  }
}
.header {
  background-image: url('/img/poster-filter.png'), linear-gradient(60deg, rgba(255, 165, 150, 0.5) -6%, rgba(0, 228, 255, 0.35)), url('/img/goldenmeili.png');
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #49b1f5;
  background-position: center;
  @apply w-full h-100vh transition-all duration-500;
  .down {
    @apply absolute bottom-2 w-full text-center z-1 font-bold text-4xl;
    
    @keyframes icon-jump {
      0% {
        opacity: 0.4;
        transform: scale(0.8);
      }
      50% {
        opacity: 1;
        transform: scale(1.2);
      }
      100% {
        opacity: 0.4;
        transform: scale(0.8)
      }
    }
    .icon {
      animation: icon-jump 2s infinite ease-in-out;
      @apply hover:cursor-pointer;
    }
  }
}
</style>
